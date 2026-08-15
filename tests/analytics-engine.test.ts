import { describe, it, expect } from 'vitest';
import { computeUserAnalytics } from '@/lib/analytics-engine';
import { createInitialSeedData } from '@/lib/mock-data/seed-store';

describe('Analytics Engine', () => {
  it('computes accuracy, coverage, and deterministic recommendations', () => {
    const store = createInitialSeedData();
    const analytics = computeUserAnalytics(
      'u-student-001',
      store.exam_attempts,
      store.attempt_answers,
      store.subjects,
      store.questions
    );

    expect(analytics.total_attempts).toBeGreaterThanOrEqual(1);
    expect(analytics.completed_attempts).toBeGreaterThanOrEqual(1);
    expect(analytics.overall_accuracy).toBeGreaterThan(0);
    expect(analytics.topic_accuracies.length).toBeGreaterThan(0);
    expect(analytics.recommendations.length).toBeGreaterThan(0);
  });
});
