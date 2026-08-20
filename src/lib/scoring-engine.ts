import type {
  AttemptAnswer,
  QuestionAnswerKey,
  AttemptQuestion,
  QuestionDifficulty,
} from './types/database';

export interface ScoreCategoryBreakdown {
  name: string;
  correct: number;
  total: number;
  percentage: number;
  points_earned?: number;
}

export interface ExamScoringResult {
  score_total: number;
  score_max: number;
  score_percentage: number;
  correct_count: number;
  partially_correct_count?: number;
  incorrect_count: number;
  unanswered_count: number;
  chapter_breakdown: ScoreCategoryBreakdown[];
  topic_breakdown: ScoreCategoryBreakdown[];
  difficulty_breakdown: Record<QuestionDifficulty, { correct: number; total: number; percentage: number; points_earned?: number }>;
  graded_answers: Array<{
    question_id: string;
    selected_choice_key?: string;
    fill_blank_answers?: Record<string, string> | null;
    matching_answers?: Record<string, string> | null;
    correct_choice_key?: string;
    correct_blank_answers?: Record<string, string>;
    correct_matching?: Record<string, string>;
    is_correct: boolean;
    is_partially_correct?: boolean;
    points_earned: number;
    points_possible: number;
    correct_sub_count: number;
    total_sub_count: number;
    explanation: string;
    source_citation?: {
      file_name: string;
      pages: number[];
      evidence: string;
    };
  }>;
}

/**
 * Server-side Exam Grading Engine
 */
export function gradeExamAttempt(
  questions: AttemptQuestion[],
  answers: AttemptAnswer[],
  answerKeys: Record<string, QuestionAnswerKey>,
  sources: Record<string, { file_name: string; pages: number[]; evidence: string }> = {}
): ExamScoringResult {
  const answerMap = new Map<string, AttemptAnswer>();
  for (const ans of answers) {
    answerMap.set(ans.question_id, ans);
  }

  let totalPointsEarned = 0;
  let correctCount = 0;
  let partiallyCorrectCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  const chapterStats = new Map<string, { correct: number; total: number; points_earned: number }>();
  const topicStats = new Map<string, { correct: number; total: number; points_earned: number }>();
  const difficultyStats: Record<QuestionDifficulty, { correct: number; total: number; points_earned: number }> = {
    easy: { correct: 0, total: 0, points_earned: 0 },
    medium: { correct: 0, total: 0, points_earned: 0 },
    hard: { correct: 0, total: 0, points_earned: 0 },
  };

  const gradedAnswers: ExamScoringResult['graded_answers'] = [];

  for (const q of questions) {
    const qId = q.question_id;
    const userAns = answerMap.get(qId);
    const keyRecord = answerKeys[qId];
    const qType = q.question_snapshot?.question_type || q.question_type || 'single_choice';
    const explanation = keyRecord?.explanation || 'ไม่มีคำอธิบายเพิ่มเติม';
    const sourceCitation = sources[qId] || q.source_citation;

    const diff = (q.question_snapshot?.difficulty || q.difficulty || 'medium') as QuestionDifficulty;
    const chapterName = q.question_snapshot?.chapter_title || q.chapter_title || 'General';
    const topicName = q.question_snapshot?.topic_title || q.topic_title || 'General';

    // Update difficulty total
    if (difficultyStats[diff]) {
      difficultyStats[diff].total += 1;
    }

    // Update chapter total
    const ch = chapterStats.get(chapterName) || { correct: 0, total: 0, points_earned: 0 };
    ch.total += 1;
    chapterStats.set(chapterName, ch);

    // Update topic total
    const top = topicStats.get(topicName) || { correct: 0, total: 0, points_earned: 0 };
    top.total += 1;
    topicStats.set(topicName, top);

    let isAttempted = false;
    let isCorrect = false;
    let isPartiallyCorrect = false;
    let pointsEarned = 0;
    const pointsPossible = 1;
    let correctSubCount = 0;
    let totalSubCount = 1;

    if (qType === 'fill_in_the_blank') {
      const userBlanks = userAns?.fill_blank_answers || {};
      const correctBlanks = keyRecord?.correct_blank_answers || {};
      const blankKeys = Object.keys(correctBlanks);
      totalSubCount = blankKeys.length || 1;

      isAttempted = Object.values(userBlanks).some(v => Boolean(v && v.trim()));

      if (isAttempted && blankKeys.length > 0) {
        for (const k of blankKeys) {
          const userVal = (userBlanks[k] || '').trim().toLowerCase();
          const targetVal = (correctBlanks[k] || '').trim().toLowerCase();
          if (userVal && userVal === targetVal) {
            correctSubCount += 1;
          }
        }
        pointsEarned = Number((correctSubCount / totalSubCount).toFixed(2));
        isCorrect = correctSubCount === totalSubCount;
        isPartiallyCorrect = correctSubCount > 0 && correctSubCount < totalSubCount;
      }

      gradedAnswers.push({
        question_id: qId,
        fill_blank_answers: userBlanks,
        correct_blank_answers: correctBlanks,
        is_correct: isCorrect,
        is_partially_correct: isPartiallyCorrect,
        points_earned: pointsEarned,
        points_possible: pointsPossible,
        correct_sub_count: correctSubCount,
        total_sub_count: totalSubCount,
        explanation,
        source_citation: sourceCitation,
      });
    } else if (qType === 'matching') {
      const userMatching = userAns?.matching_answers || {};
      const correctMatching = keyRecord?.correct_matching || {};
      const matchKeys = Object.keys(correctMatching);
      totalSubCount = matchKeys.length || 1;

      isAttempted = Object.values(userMatching).some(v => Boolean(v && v.trim()));

      if (isAttempted && matchKeys.length > 0) {
        for (const k of matchKeys) {
          const userVal = userMatching[k];
          const targetVal = correctMatching[k];
          if (userVal && userVal === targetVal) {
            correctSubCount += 1;
          }
        }
        pointsEarned = Number((correctSubCount / totalSubCount).toFixed(2));
        isCorrect = correctSubCount === totalSubCount;
        isPartiallyCorrect = correctSubCount > 0 && correctSubCount < totalSubCount;
      }

      gradedAnswers.push({
        question_id: qId,
        matching_answers: userMatching,
        correct_matching: correctMatching,
        is_correct: isCorrect,
        is_partially_correct: isPartiallyCorrect,
        points_earned: pointsEarned,
        points_possible: pointsPossible,
        correct_sub_count: correctSubCount,
        total_sub_count: totalSubCount,
        explanation,
        source_citation: sourceCitation,
      });
    } else {
      // Default: single_choice or numeric
      const selectedKey = userAns?.selected_choice_key;
      const correctKey = q.correct_choice_key || keyRecord?.correct_choice_key || 'A';
      totalSubCount = 1;

      isAttempted = Boolean(selectedKey);
      isCorrect = isAttempted && selectedKey === correctKey;
      correctSubCount = isCorrect ? 1 : 0;
      pointsEarned = isCorrect ? 1 : 0;
      isPartiallyCorrect = false;

      gradedAnswers.push({
        question_id: qId,
        selected_choice_key: selectedKey || undefined,
        correct_choice_key: correctKey,
        is_correct: isCorrect,
        is_partially_correct: false,
        points_earned: pointsEarned,
        points_possible: pointsPossible,
        correct_sub_count: correctSubCount,
        total_sub_count: totalSubCount,
        explanation,
        source_citation: sourceCitation,
      });
    }

    totalPointsEarned += pointsEarned;

    if (!isAttempted) {
      unansweredCount += 1;
    } else if (isCorrect) {
      correctCount += 1;
      if (difficultyStats[diff]) {
        difficultyStats[diff].correct += 1;
        difficultyStats[diff].points_earned += pointsEarned;
      }
      ch.correct += 1;
      ch.points_earned += pointsEarned;
      top.correct += 1;
      top.points_earned += pointsEarned;
    } else if (isPartiallyCorrect) {
      partiallyCorrectCount += 1;
      if (difficultyStats[diff]) {
        difficultyStats[diff].points_earned += pointsEarned;
      }
      ch.points_earned += pointsEarned;
      top.points_earned += pointsEarned;
    } else {
      incorrectCount += 1;
    }
  }

  const scoreMax = questions.length;
  // Round score_total to 2 decimals if not integer
  const finalScoreTotal = Number(totalPointsEarned.toFixed(2));
  const scorePercentage = scoreMax > 0 ? Number(((finalScoreTotal / scoreMax) * 100).toFixed(2)) : 0;

  const chapterBreakdown: ScoreCategoryBreakdown[] = Array.from(chapterStats.entries()).map(([name, s]) => ({
    name,
    correct: s.correct,
    total: s.total,
    points_earned: Number(s.points_earned.toFixed(2)),
    percentage: s.total > 0 ? Number(((s.points_earned / s.total) * 100).toFixed(1)) : 0,
  }));

  const topicBreakdown: ScoreCategoryBreakdown[] = Array.from(topicStats.entries()).map(([name, s]) => ({
    name,
    correct: s.correct,
    total: s.total,
    points_earned: Number(s.points_earned.toFixed(2)),
    percentage: s.total > 0 ? Number(((s.points_earned / s.total) * 100).toFixed(1)) : 0,
  }));

  const diffBreakdown: ExamScoringResult['difficulty_breakdown'] = {
    easy: {
      correct: difficultyStats.easy.correct,
      total: difficultyStats.easy.total,
      points_earned: Number(difficultyStats.easy.points_earned.toFixed(2)),
      percentage: difficultyStats.easy.total > 0 ? Number(((difficultyStats.easy.points_earned / difficultyStats.easy.total) * 100).toFixed(1)) : 0,
    },
    medium: {
      correct: difficultyStats.medium.correct,
      total: difficultyStats.medium.total,
      points_earned: Number(difficultyStats.medium.points_earned.toFixed(2)),
      percentage: difficultyStats.medium.total > 0 ? Number(((difficultyStats.medium.points_earned / difficultyStats.medium.total) * 100).toFixed(1)) : 0,
    },
    hard: {
      correct: difficultyStats.hard.correct,
      total: difficultyStats.hard.total,
      points_earned: Number(difficultyStats.hard.points_earned.toFixed(2)),
      percentage: difficultyStats.hard.total > 0 ? Number(((difficultyStats.hard.points_earned / difficultyStats.hard.total) * 100).toFixed(1)) : 0,
    },
  };

  return {
    score_total: finalScoreTotal,
    score_max: scoreMax,
    score_percentage: scorePercentage,
    correct_count: correctCount,
    partially_correct_count: partiallyCorrectCount,
    incorrect_count: incorrectCount,
    unanswered_count: unansweredCount,
    chapter_breakdown: chapterBreakdown,
    topic_breakdown: topicBreakdown,
    difficulty_breakdown: diffBreakdown,
    graded_answers: gradedAnswers,
  };
}
