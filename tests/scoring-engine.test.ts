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

  it('correctly grades fill_in_the_blank questions with case-insensitive and whitespace tolerance', () => {
    const questions: AttemptQuestion[] = [
      {
        id: 'aq-fib-1',
        attempt_id: 'att-1',
        question_id: 'q-fib-1',
        sequence_order: 1,
        shuffled_choices: [],
        question_snapshot: {
          text: 'In TCP/IP, [blank_1] is connection-oriented and [blank_2] is connectionless.',
          difficulty: 'medium',
          chapter_title: 'Transport',
          topic_title: 'TCP vs UDP',
          question_type: 'fill_in_the_blank',
        },
      },
      {
        id: 'aq-fib-2',
        attempt_id: 'att-1',
        question_id: 'q-fib-2',
        sequence_order: 2,
        shuffled_choices: [],
        question_snapshot: {
          text: 'Protocol [blank_1] resolves IP to MAC.',
          difficulty: 'easy',
          chapter_title: 'Network',
          topic_title: 'ARP',
          question_type: 'fill_in_the_blank',
        },
      },
    ];

    const answers: AttemptAnswer[] = [
      {
        id: 'ans-fib-1',
        attempt_id: 'att-1',
        question_id: 'q-fib-1',
        fill_blank_answers: { blank_1: ' tcp ', blank_2: 'UDP' },
        answered_at: '',
      },
      {
        id: 'ans-fib-2',
        attempt_id: 'att-1',
        question_id: 'q-fib-2',
        fill_blank_answers: { blank_1: 'DHCP' }, // wrong answer (should be ARP)
        answered_at: '',
      },
    ];

    const answerKeys: Record<string, QuestionAnswerKey> = {
      'q-fib-1': {
        id: 'k-fib-1',
        question_id: 'q-fib-1',
        correct_blank_answers: { blank_1: 'TCP', blank_2: 'UDP' },
        explanation: 'TCP is connection-oriented and UDP is connectionless',
      },
      'q-fib-2': {
        id: 'k-fib-2',
        question_id: 'q-fib-2',
        correct_blank_answers: { blank_1: 'ARP' },
        explanation: 'ARP resolves IP to MAC',
      },
    };

    const result = gradeExamAttempt(questions, answers, answerKeys);

    expect(result.score_total).toBe(1);
    expect(result.score_max).toBe(2);
    expect(result.score_percentage).toBe(50.0);
    expect(result.correct_count).toBe(1);
    expect(result.incorrect_count).toBe(1);
    expect(result.graded_answers[0].is_correct).toBe(true);
    expect(result.graded_answers[1].is_correct).toBe(false);
  });

  it('correctly grades matching questions', () => {
    const questions: AttemptQuestion[] = [
      {
        id: 'aq-mat-1',
        attempt_id: 'att-1',
        question_id: 'q-mat-1',
        sequence_order: 1,
        shuffled_choices: [],
        question_snapshot: {
          text: 'Match ports with protocols',
          difficulty: 'medium',
          chapter_title: 'Transport',
          topic_title: 'Ports',
          question_type: 'matching',
        },
      },
    ];

    const answers: AttemptAnswer[] = [
      {
        id: 'ans-mat-1',
        attempt_id: 'att-1',
        question_id: 'q-mat-1',
        matching_answers: { p1: 'p1', p2: 'p2', p3: 'p3' },
        answered_at: '',
      },
    ];

    const answerKeys: Record<string, QuestionAnswerKey> = {
      'q-mat-1': {
        id: 'k-mat-1',
        question_id: 'q-mat-1',
        correct_matching: { p1: 'p1', p2: 'p2', p3: 'p3' },
        explanation: 'Standard ports correctly matched',
      },
    };

    const result = gradeExamAttempt(questions, answers, answerKeys);

    expect(result.score_total).toBe(1);
    expect(result.score_max).toBe(1);
    expect(result.score_percentage).toBe(100);
    expect(result.correct_count).toBe(1);
    expect(result.graded_answers[0].is_correct).toBe(true);
  });
});
