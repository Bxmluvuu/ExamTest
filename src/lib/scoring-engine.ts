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
}

export interface ExamScoringResult {
  score_total: number;
  score_max: number;
  score_percentage: number;
  correct_count: number;
  incorrect_count: number;
  unanswered_count: number;
  chapter_breakdown: ScoreCategoryBreakdown[];
  topic_breakdown: ScoreCategoryBreakdown[];
  difficulty_breakdown: Record<QuestionDifficulty, { correct: number; total: number; percentage: number }>;
  graded_answers: Array<{
    question_id: string;
    selected_choice_key?: string;
    fill_blank_answers?: Record<string, string> | null;
    matching_answers?: Record<string, string> | null;
    correct_choice_key?: string;
    correct_blank_answers?: Record<string, string>;
    correct_matching?: Record<string, string>;
    is_correct: boolean;
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

  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  const chapterStats = new Map<string, { correct: number; total: number }>();
  const topicStats = new Map<string, { correct: number; total: number }>();
  const difficultyStats: Record<QuestionDifficulty, { correct: number; total: number }> = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 },
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
    const ch = chapterStats.get(chapterName) || { correct: 0, total: 0 };
    ch.total += 1;
    chapterStats.set(chapterName, ch);

    // Update topic total
    const top = topicStats.get(topicName) || { correct: 0, total: 0 };
    top.total += 1;
    topicStats.set(topicName, top);

    let isAttempted = false;
    let isCorrect = false;

    if (qType === 'fill_in_the_blank') {
      const userBlanks = userAns?.fill_blank_answers || {};
      const correctBlanks = keyRecord?.correct_blank_answers || {};
      const blankKeys = Object.keys(correctBlanks);

      isAttempted = Object.values(userBlanks).some(v => Boolean(v && v.trim()));

      if (isAttempted && blankKeys.length > 0) {
        isCorrect = blankKeys.every(k => {
          const userVal = (userBlanks[k] || '').trim().toLowerCase();
          const targetVal = (correctBlanks[k] || '').trim().toLowerCase();
          return userVal === targetVal;
        });
      }

      gradedAnswers.push({
        question_id: qId,
        fill_blank_answers: userBlanks,
        correct_blank_answers: correctBlanks,
        is_correct: isCorrect,
        explanation,
        source_citation: sourceCitation,
      });
    } else if (qType === 'matching') {
      const userMatching = userAns?.matching_answers || {};
      const correctMatching = keyRecord?.correct_matching || {};
      const matchKeys = Object.keys(correctMatching);

      isAttempted = Object.values(userMatching).some(v => Boolean(v && v.trim()));

      if (isAttempted && matchKeys.length > 0) {
        isCorrect = matchKeys.every(k => {
          const userVal = userMatching[k];
          const targetVal = correctMatching[k];
          return userVal === targetVal;
        });
      }

      gradedAnswers.push({
        question_id: qId,
        matching_answers: userMatching,
        correct_matching: correctMatching,
        is_correct: isCorrect,
        explanation,
        source_citation: sourceCitation,
      });
    } else {
      // Default: single_choice or numeric
      const selectedKey = userAns?.selected_choice_key;
      const correctKey = keyRecord?.correct_choice_key || 'A';

      isAttempted = Boolean(selectedKey);
      isCorrect = isAttempted && selectedKey === correctKey;

      gradedAnswers.push({
        question_id: qId,
        selected_choice_key: selectedKey || undefined,
        correct_choice_key: correctKey,
        is_correct: isCorrect,
        explanation,
        source_citation: sourceCitation,
      });
    }

    if (!isAttempted) {
      unansweredCount += 1;
    } else if (isCorrect) {
      correctCount += 1;
      if (difficultyStats[diff]) difficultyStats[diff].correct += 1;
      ch.correct += 1;
      top.correct += 1;
    } else {
      incorrectCount += 1;
    }
  }

  const scoreMax = questions.length;
  const scorePercentage = scoreMax > 0 ? Number(((correctCount / scoreMax) * 100).toFixed(2)) : 0;

  const chapterBreakdown: ScoreCategoryBreakdown[] = Array.from(chapterStats.entries()).map(([name, s]) => ({
    name,
    correct: s.correct,
    total: s.total,
    percentage: s.total > 0 ? Number(((s.correct / s.total) * 100).toFixed(1)) : 0,
  }));

  const topicBreakdown: ScoreCategoryBreakdown[] = Array.from(topicStats.entries()).map(([name, s]) => ({
    name,
    correct: s.correct,
    total: s.total,
    percentage: s.total > 0 ? Number(((s.correct / s.total) * 100).toFixed(1)) : 0,
  }));

  const diffBreakdown: ExamScoringResult['difficulty_breakdown'] = {
    easy: {
      correct: difficultyStats.easy.correct,
      total: difficultyStats.easy.total,
      percentage: difficultyStats.easy.total > 0 ? Number(((difficultyStats.easy.correct / difficultyStats.easy.total) * 100).toFixed(1)) : 0,
    },
    medium: {
      correct: difficultyStats.medium.correct,
      total: difficultyStats.medium.total,
      percentage: difficultyStats.medium.total > 0 ? Number(((difficultyStats.medium.correct / difficultyStats.medium.total) * 100).toFixed(1)) : 0,
    },
    hard: {
      correct: difficultyStats.hard.correct,
      total: difficultyStats.hard.total,
      percentage: difficultyStats.hard.total > 0 ? Number(((difficultyStats.hard.correct / difficultyStats.hard.total) * 100).toFixed(1)) : 0,
    },
  };

  return {
    score_total: correctCount,
    score_max: scoreMax,
    score_percentage: scorePercentage,
    correct_count: correctCount,
    incorrect_count: incorrectCount,
    unanswered_count: unansweredCount,
    chapter_breakdown: chapterBreakdown,
    topic_breakdown: topicBreakdown,
    difficulty_breakdown: diffBreakdown,
    graded_answers: gradedAnswers,
  };
}
