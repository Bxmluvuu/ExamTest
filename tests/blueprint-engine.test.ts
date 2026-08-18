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
      if (item.question.question_type === 'single_choice' || !item.question.question_type) {
        expect(item.shuffledChoices.length).toBe(4);
      } else if (item.question.question_type === 'fill_in_the_blank') {
        expect(item.snapshot.word_bank?.length).toBeGreaterThan(0);
      } else if (item.question.question_type === 'matching') {
        expect(item.snapshot.matching_pairs?.length).toBeGreaterThan(0);
      }
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

  it('strictly selects only easy questions when easy difficulty is selected', () => {
    const store = createInitialSeedData();
    const result = selectQuestionsForAttempt({
      allQuestions: store.questions,
      mode: 'exam',
      targetCount: 10,
      selectedDifficulty: 'easy',
    });

    expect(result.length).toBeGreaterThan(0);
    result.forEach(item => {
      expect(item.question.difficulty).toBe('easy');
    });
  });

  it('strictly selects only hard questions when hard difficulty is selected', () => {
    const store = createInitialSeedData();
    const result = selectQuestionsForAttempt({
      allQuestions: store.questions,
      mode: 'exam',
      targetCount: 10,
      selectedDifficulty: 'hard',
    });

    expect(result.length).toBeGreaterThan(0);
    result.forEach(item => {
      expect(item.question.difficulty).toBe('hard');
    });
  });

  it('strictly selects only medium questions when medium difficulty is selected', () => {
    const store = createInitialSeedData();
    const result = selectQuestionsForAttempt({
      allQuestions: store.questions,
      mode: 'exam',
      targetCount: 10,
      selectedDifficulty: 'medium',
    });

    expect(result.length).toBeGreaterThan(0);
    result.forEach(item => {
      expect(item.question.difficulty).toBe('medium');
    });
  });

  it('randomizes choice positions and distributes correct answers across A, B, C, D instead of always A', () => {
    const store = createInitialSeedData();
    const answerKeyMap: Record<string, any> = {};
    store.question_answer_keys.forEach(k => {
      answerKeyMap[k.question_id] = k;
    });

    const observedCorrectKeys = new Set<string>();

    for (let run = 0; run < 20; run++) {
      const selected = selectQuestionsForAttempt({
        allQuestions: store.questions.filter(q => q.question_type === 'single_choice' || !q.question_type),
        allAnswerKeys: answerKeyMap,
        allChoices: store.question_choices,
        mode: 'exam',
        targetCount: 15,
      });

      selected.forEach(item => {
        if (item.correctChoiceKey) {
          observedCorrectKeys.add(item.correctChoiceKey);
        }
      });
    }

    // Must have observed choices across all letters (A, B, C, D), NOT just 'A'
    expect(observedCorrectKeys.has('A')).toBe(true);
    expect(observedCorrectKeys.has('B')).toBe(true);
    expect(observedCorrectKeys.has('C')).toBe(true);
    expect(observedCorrectKeys.has('D')).toBe(true);
    expect(observedCorrectKeys.size).toBe(4);
  });
});
