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
    correct_choice_key: string;
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
  const answerMap = new Map<string, string>();
  for (const ans of answers) {
    if (ans.selected_choice_key) {
      answerMap.set(ans.question_id, ans.selected_choice_key);
    }
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
    const selectedKey = answerMap.get(qId);
    const keyRecord = answerKeys[qId];
    const correctKey = keyRecord?.correct_choice_key || 'A';
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

    if (!selectedKey) {
      unansweredCount += 1;
      gradedAnswers.push({
        question_id: qId,
        selected_choice_key: undefined,
        correct_choice_key: correctKey,
        is_correct: false,
        explanation,
        source_citation: sourceCitation,
      });
    } else if (selectedKey === correctKey) {
      correctCount += 1;
      if (difficultyStats[diff]) difficultyStats[diff].correct += 1;
      ch.correct += 1;
      top.correct += 1;

      gradedAnswers.push({
        question_id: qId,
        selected_choice_key: selectedKey,
        correct_choice_key: correctKey,
        is_correct: true,
        explanation,
        source_citation: sourceCitation,
      });
    } else {
      incorrectCount += 1;
      gradedAnswers.push({
        question_id: qId,
        selected_choice_key: selectedKey,
        correct_choice_key: correctKey,
        is_correct: false,
        explanation,
        source_citation: sourceCitation,
      });
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
