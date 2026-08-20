import {
  cleanupOldExamAttempts,
  pruneExpiredAttempts,
  getUserAttempts,
  getDataStore,
  savePersistentExamData,
  DATA_RETENTION_DAYS,
} from '../src/lib/db-adapter';

async function test() {
  console.log('=== TESTING 7-DAY RETENTION & AUTO CLEANUP ===');
  const store = getDataStore();
  const userId = 'fdccbf21-4376-424b-9b76-4ad85a5007df';

  // 1. Create a fresh attempt (2 days ago)
  const freshAttemptId = `att-fresh-${Date.now()}`;
  const freshTime = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
  store.exam_attempts.push({
    id: freshAttemptId,
    user_id: userId,
    subject_id: 'sub-mal-001',
    mode: 'exam',
    total_questions: 10,
    duration_minutes: 60,
    time_spent_seconds: 1200,
    started_at: freshTime,
    completed_at: freshTime,
    status: 'submitted',
    score_total: 8,
    score_max: 10,
    score_percentage: 80,
    is_graded: true,
  });

  // 2. Create an expired attempt (9 days ago)
  const expiredAttemptId = `att-expired-${Date.now()}`;
  const expiredTime = new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString();
  store.exam_attempts.push({
    id: expiredAttemptId,
    user_id: userId,
    subject_id: 'sub-mal-001',
    mode: 'exam',
    total_questions: 10,
    duration_minutes: 60,
    time_spent_seconds: 1200,
    started_at: expiredTime,
    completed_at: expiredTime,
    status: 'submitted',
    score_total: 5,
    score_max: 10,
    score_percentage: 50,
    is_graded: true,
  });

  savePersistentExamData(store);

  console.log('Before cleanup attempts count:', store.exam_attempts.length);
  console.log('Expired attempt exists:', store.exam_attempts.some(a => a.id === expiredAttemptId));
  console.log('Fresh attempt exists:', store.exam_attempts.some(a => a.id === freshAttemptId));

  // 3. Run cleanup
  console.log('\nRunning cleanupOldExamAttempts(7)...');
  const result = await cleanupOldExamAttempts(7);
  console.log('Cleanup result:', result);

  const hasExpiredAfter = store.exam_attempts.some(a => a.id === expiredAttemptId);
  const hasFreshAfter = store.exam_attempts.some(a => a.id === freshAttemptId);

  console.log('Expired attempt exists after cleanup:', hasExpiredAfter);
  console.log('Fresh attempt exists after cleanup:', hasFreshAfter);

  if (!hasExpiredAfter && hasFreshAfter) {
    console.log('\n PASSED: Expired attempt was successfully purged and fresh attempt was retained!');
  } else {
    console.error('\n FAILED: Retention cleanup mismatch');
    process.exit(1);
  }
}

test().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
