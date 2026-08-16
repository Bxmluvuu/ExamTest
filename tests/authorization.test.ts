import { describe, it, expect, beforeEach } from 'vitest';
import { safeRedirectPath } from '@/lib/auth/server-guard';
import {
  getDataStore,
  setDataStore,
  getExamAttempt,
  createExamAttemptAction,
  setCurrentSessionUser,
  getAdminQuestions,
} from '@/lib/db-adapter';
import { createTestFixtureStore } from './fixtures';

describe('Server-side Authorization & Security Boundaries', () => {
  beforeEach(() => {
    setDataStore(createTestFixtureStore());
  });

  describe('Open Redirect Protection (safeRedirectPath)', () => {
    it('allows valid relative paths', () => {
      expect(safeRedirectPath('/dashboard')).toBe('/dashboard');
      expect(safeRedirectPath('/admin/questions')).toBe('/admin/questions');
      expect(safeRedirectPath('/subjects/database-systems')).toBe('/subjects/database-systems');
    });

    it('rejects external protocol URLs and returns fallback', () => {
      expect(safeRedirectPath('https://malicious-site.com', '/dashboard')).toBe('/dashboard');
      expect(safeRedirectPath('http://phishing.org/steal', '/dashboard')).toBe('/dashboard');
      expect(safeRedirectPath('//attacker.com/evil', '/admin')).toBe('/admin');
      expect(safeRedirectPath('javascript:alert(1)', '/dashboard')).toBe('/dashboard');
    });

    it('handles null, undefined, and empty string gracefully', () => {
      expect(safeRedirectPath(null, '/dashboard')).toBe('/dashboard');
      expect(safeRedirectPath(undefined, '/admin')).toBe('/admin');
      expect(safeRedirectPath('', '/dashboard')).toBe('/dashboard');
    });
  });

  describe('Data Boundaries: Question Answer Key Security', () => {
    it('NEVER leaks correct_choice_key or explanation to student during in-progress attempt', async () => {
      setCurrentSessionUser('u-student-001');

      // Create new attempt
      const attemptRes = await createExamAttemptAction({
        userId: 'u-student-001',
        subjectId: 'sub-db-001',
        mode: 'exam',
        targetCount: 5,
      });

      expect(attemptRes.success).toBe(true);
      expect(attemptRes.attemptId).toBeDefined();

      // Fetch attempt data as student
      const attemptData = await getExamAttempt(attemptRes.attemptId!, 'u-student-001');
      expect(attemptData).not.toBeNull();
      expect(attemptData?.attempt.status).toBe('in_progress');

      // Verify every question in active attempt HAS NO answer key or explanation
      for (const q of attemptData?.questions || []) {
        expect((q as any).correct_choice_key).toBeUndefined();
        expect((q as any).explanation).toBeUndefined();
      }
    });

    it('attaches explanation and correct keys ONLY after exam submission', async () => {
      // Completed attempt pre-seeded in data store
      const completedData = await getExamAttempt('att-demo-001', 'u-student-001');
      expect(completedData).not.toBeNull();
      expect(completedData?.attempt.status).toBe('submitted');

      // Graded result contains citations and explanations
      const firstQ = completedData?.questions[0];
      expect(firstQ?.correct_choice_key).toBe('B');
      expect(firstQ?.is_correct).toBe(true);
      expect(firstQ?.explanation).toBeDefined();
    });

    it('rejects student attempting to access another student private attempt', async () => {
      setCurrentSessionUser('u-student-001');

      // Try accessing an attempt belonging to user-999
      const store = getDataStore();
      store.exam_attempts.push({
        id: 'att-other-user',
        user_id: 'u-other-999',
        subject_id: 'sub-db-001',
        mode: 'exam',
        total_questions: 5,
        duration_minutes: 10,
        time_spent_seconds: 0,
        started_at: new Date().toISOString(),
        status: 'in_progress',
        score_total: 0,
        score_max: 5,
        score_percentage: 0,
        is_graded: false,
      });

      await expect(getExamAttempt('att-other-user', 'u-student-001')).rejects.toThrow('Unauthorized');
    });
  });

  describe('Question Lifecycle & Status Filtering', () => {
    it('draft questions are excluded from student attempt question pool', async () => {
      const store = getDataStore();
      const draftQuestions = store.questions.filter(q => q.status === 'draft');
      expect(draftQuestions.length).toBeGreaterThan(0);

      // Create student exam attempt
      const res = await createExamAttemptAction({
        userId: 'u-student-001',
        subjectId: 'sub-db-001',
        mode: 'exam',
        targetCount: 10,
      });

      expect(res.success).toBe(true);
      const attemptData = await getExamAttempt(res.attemptId!, 'u-student-001');

      const attemptQuestionIds = new Set(attemptData?.questions.map(q => q.question_id));
      for (const draft of draftQuestions) {
        expect(attemptQuestionIds.has(draft.id)).toBe(false);
      }
    });

    it('admin query returns drafts and needs_review questions for operational curation', async () => {
      const adminQuestions = await getAdminQuestions({ status: 'draft' });
      expect(adminQuestions.questions.length).toBeGreaterThanOrEqual(1);
      expect(adminQuestions.questions[0].status).toBe('draft');
    });
  });
});
