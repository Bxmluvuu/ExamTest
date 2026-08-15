import { describe, it, expect } from 'vitest';
import { gradeExamAttempt } from '@/lib/scoring-engine';
import type { AttemptQuestion, AttemptAnswer, QuestionAnswerKey } from '@/lib/types/database';

describe('Scoring Engine', () => {
  it('correctly grades user answers and calculates percentage without floating point errors', () => {
    const questions: AttemptQuestion[] = [
      {
        id: 'aq-1',
        attempt_id: 'att-1',
        question_id: 'q-1',
        sequence_order: 1,
        shuffled_choices: [],
        question_snapshot: {
          text: 'What is 1NF?',
          difficulty: 'easy',
          chapter_title: 'Normalization',
          topic_title: '1NF',
          question_type: 'single_choice',
        },
      },
      {
        id: 'aq-2',
        attempt_id: 'att-1',
        question_id: 'q-2',
        sequence_order: 2,
        shuffled_choices: [],
        question_snapshot: {
          text: 'What is 2NF?',
          difficulty: 'medium',
          chapter_title: 'Normalization',
          topic_title: '2NF',
          question_type: 'single_choice',
        },
      },
      {
        id: 'aq-3',
        attempt_id: 'att-1',
        question_id: 'q-3',
        sequence_order: 3,
        shuffled_choices: [],
        question_snapshot: {
          text: 'What is 3NF?',
          difficulty: 'hard',
          chapter_title: 'Normalization',
          topic_title: '3NF',
          question_type: 'single_choice',
        },
      },
    ];

    const answers: AttemptAnswer[] = [
      { id: 'ans-1', attempt_id: 'att-1', question_id: 'q-1', selected_choice_key: 'A', answered_at: '' },
      { id: 'ans-2', attempt_id: 'att-1', question_id: 'q-2', selected_choice_key: 'B', answered_at: '' }, // incorrect
      // q-3 unanswered
    ];

    const answerKeys: Record<string, QuestionAnswerKey> = {
      'q-1': { id: 'k-1', question_id: 'q-1', correct_choice_key: 'A', explanation: 'A is correct' },
      'q-2': { id: 'k-2', question_id: 'q-2', correct_choice_key: 'C', explanation: 'C is correct' },
      'q-3': { id: 'k-3', question_id: 'q-3', correct_choice_key: 'D', explanation: 'D is correct' },
    };

    const result = gradeExamAttempt(questions, answers, answerKeys);

    expect(result.score_total).toBe(1);
    expect(result.score_max).toBe(3);
    expect(result.score_percentage).toBe(33.33);
    expect(result.correct_count).toBe(1);
    expect(result.incorrect_count).toBe(1);
    expect(result.unanswered_count).toBe(1);

    expect(result.difficulty_breakdown.easy.correct).toBe(1);
    expect(result.difficulty_breakdown.medium.correct).toBe(0);
  });
});
