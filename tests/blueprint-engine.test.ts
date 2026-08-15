import { describe, it, expect } from 'vitest';
import { calculateBlueprintQuota, selectQuestionsForAttempt } from '@/lib/blueprint-engine';
import { createInitialSeedData } from '@/lib/mock-data/seed-store';
import type { Question } from '@/lib/types/database';

describe('Blueprint Engine', () => {
  it('calculates quota distribution accurately matching target question count', () => {
    const topicDist = [
      { topic: 'SQL', weight: 0.5 },
      { topic: 'Normalization', weight: 0.5 },
    ];
    const diffDist = { easy: 0.2, medium: 0.6, hard: 0.2 };

    const quotas = calculateBlueprintQuota(20, topicDist, diffDist);
    const totalAllocated = quotas.reduce((acc, q) => acc + q.count, 0);

    expect(totalAllocated).toBe(20);
    expect(quotas.length).toBeGreaterThan(0);
  });

  it('selects only published questions with choices', () => {
    const store = createInitialSeedData();
    const published = selectQuestionsForAttempt({
      allQuestions: store.questions,
      mode: 'exam',
      targetCount: 5,
    });

    expect(published.length).toBeLessThanOrEqual(5);
    published.forEach(item => {
      expect(item.question.status).toBe('published');
      expect(item.shuffledChoices.length).toBe(4);
    });
  });

  it('never creates duplicate questions in the same attempt', () => {
    const store = createInitialSeedData();
    const selected = selectQuestionsForAttempt({
      allQuestions: store.questions,
      mode: 'exam',
      targetCount: 8,
    });

    const questionIds = selected.map(s => s.question.id);
    const uniqueIds = new Set(questionIds);
    expect(uniqueIds.size).toBe(questionIds.length);
  });

  it('falls back gracefully when pool is smaller than requested count', () => {
    const mockQuestions: Question[] = [
      {
        id: 'q-1',
        subject_id: 'sub-1',
        chapter_id: 'ch-1',
        question_text: 'Q1',
        question_type: 'single_choice',
        difficulty: 'easy',
        status: 'published',
        is_ai_generated: false,
        created_at: '',
        updated_at: '',
        choices: [
          { id: '1', question_id: 'q-1', choice_key: 'A', choice_text: 'A', sequence_order: 1 },
          { id: '2', question_id: 'q-1', choice_key: 'B', choice_text: 'B', sequence_order: 2 },
          { id: '3', question_id: 'q-1', choice_key: 'C', choice_text: 'C', sequence_order: 3 },
          { id: '4', question_id: 'q-1', choice_key: 'D', choice_text: 'D', sequence_order: 4 },
        ],
      },
    ];

    const result = selectQuestionsForAttempt({
      allQuestions: mockQuestions,
      mode: 'exam',
      targetCount: 10,
    });

    expect(result.length).toBe(1);
  });
});
