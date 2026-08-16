import { describe, it, expect, beforeEach } from 'vitest';
import {
  setDataStore,
  createExamAttemptAction,
  saveAttemptAnswerAction,
  submitExamAttemptAction,
  getExamAttempt,
  toggleBookmarkAction,
  getBookmarks,
} from '@/lib/db-adapter';
import { createTestFixtureStore } from './fixtures';

describe('DB Adapter and Exam Lifecycle State Machine', () => {
  beforeEach(() => {
    setDataStore(createTestFixtureStore());
  });

  it('completes the full student exam flow: create -> auto-save -> submit -> verify immutable result', async () => {
    // 1. Create Attempt
    const createRes = await createExamAttemptAction({
      userId: 'u-student-001',
      subjectId: 'sub-db-001',
      mode: 'exam',
      targetCount: 5,
    });

    expect(createRes.success).toBe(true);
    expect(createRes.attemptId).toBeDefined();

    const attemptId = createRes.attemptId!;

    // 2. Fetch in-progress attempt (Answer keys must NOT be present)
    const inProgressRes = await getExamAttempt(attemptId, 'u-student-001');
    expect(inProgressRes).not.toBeNull();
    expect(inProgressRes!.attempt.status).toBe('in_progress');
    // Ensure answer keys are hidden
    inProgressRes!.questions.forEach(q => {
      expect(q.correct_choice_key).toBeUndefined();
      expect(q.explanation).toBeUndefined();
    });

    const q1 = inProgressRes!.questions[0];

    // 3. Auto-save answer for question 1
    const saveRes = await saveAttemptAnswerAction({
      attemptId,
      questionId: q1.question_id,
      selectedChoiceKey: 'B',
      userId: 'u-student-001',
    });
    expect(saveRes.success).toBe(true);

    // 4. Submit Attempt
    const submitRes = await submitExamAttemptAction({
      attemptId,
      userId: 'u-student-001',
      timeSpentSeconds: 120,
    });
    expect(submitRes.success).toBe(true);

    // 5. Fetch submitted attempt (Answer keys and citations are now populated)
    const submittedRes = await getExamAttempt(attemptId, 'u-student-001');
    expect(submittedRes!.attempt.status).toBe('submitted');
    expect(submittedRes!.attempt.is_graded).toBe(true);
    expect(submittedRes!.attempt.score_total).toBeDefined();
    expect(submittedRes!.questions[0].correct_choice_key).toBeDefined();

    // 6. Security Rule: Cannot modify answers on submitted attempt!
    const tryModifyRes = await saveAttemptAnswerAction({
      attemptId,
      questionId: q1.question_id,
      selectedChoiceKey: 'C',
      userId: 'u-student-001',
    });
    expect(tryModifyRes.success).toBe(false);
    expect(tryModifyRes.error).toContain('Cannot modify submitted attempt');
  });

  it('handles bookmark toggle correctly', async () => {
    const res1 = await toggleBookmarkAction('u-student-001', 'q-db-001');
    expect(res1.isBookmarked).toBe(true);

    const bookmarks = await getBookmarks('u-student-001');
    expect(bookmarks.some(b => b.question_id === 'q-db-001')).toBe(true);

    const res2 = await toggleBookmarkAction('u-student-001', 'q-db-001');
    expect(res2.isBookmarked).toBe(false);
  });
});
