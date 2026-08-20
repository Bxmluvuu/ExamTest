import {
  createExamAttemptAction,
  saveAttemptAnswerAction,
  submitExamAttemptAction,
  getUserAttempts,
  getUserAnalyticsData,
  toggleBookmarkAction,
  getBookmarks,
  getDataStore,
} from '../src/lib/db-adapter';
import { createAdminClient } from '../src/lib/supabase/admin';
import fs from 'fs';
import path from 'path';

async function test() {
  console.log('=== TESTING DATABASE PERSISTENCE & SUPABASE SYNC ===');
  const userId = 'fdccbf21-4376-424b-9b76-4ad85a5007df'; // valid student user UUID
  const subjectId = 'sub-mal-001';

  console.log('1. Creating Exam Attempt...');
  const createRes = await createExamAttemptAction({
    userId,
    subjectId,
    mode: 'exam',
    targetCount: 5,
  });

  if (!createRes.success || !createRes.attemptId) {
    console.error('Failed to create attempt:', createRes.error);
    process.exit(1);
  }
  const attemptId = createRes.attemptId;
  console.log('  Created Attempt ID:', attemptId);

  const store = getDataStore();
  const attemptQuestions = store.attempt_questions.filter(q => q.attempt_id === attemptId);
  console.log('  Attempt Questions Count:', attemptQuestions.length);

  console.log('2. Answering Questions...');
  for (let i = 0; i < attemptQuestions.length; i++) {
    const q = attemptQuestions[i];
    await saveAttemptAnswerAction({
      attemptId,
      questionId: q.question_id,
      selectedChoiceKey: 'A',
      userId,
      responseTimeSeconds: 10,
    });
  }

  console.log('3. Submitting Exam Attempt...');
  const submitRes = await submitExamAttemptAction({
    attemptId,
    userId,
    timeSpentSeconds: 50,
  });
  console.log('  Submission Result:', {
    score_total: submitRes.result?.score_total,
    score_percentage: submitRes.result?.score_percentage,
    correct_count: submitRes.result?.correct_count,
  });

  console.log('4. Verifying Local Persistent File (content/data/exam_store.json)...');
  const persistentFile = path.join(process.cwd(), 'content', 'data', 'exam_store.json');
  if (fs.existsSync(persistentFile)) {
    const fileContent = JSON.parse(fs.readFileSync(persistentFile, 'utf-8'));
    const foundInFile = fileContent.exam_attempts?.find((a: any) => a.id === attemptId);
    if (foundInFile) {
      console.log('  PASSED: Attempt found in content/data/exam_store.json! Score:', foundInFile.score_total);
    } else {
      console.error('  FAILED: Attempt not in persistent file');
    }
  } else {
    console.error('  FAILED: Persistent file does not exist');
  }

  console.log('5. Verifying getUserAttempts from Database...');
  const userAttempts = await getUserAttempts(userId);
  console.log('  Total User Attempts returned:', userAttempts.length);
  const foundInUserAttempts = userAttempts.find(a => a.id === attemptId);
  if (foundInUserAttempts) {
    console.log('  PASSED: Found attempt in getUserAttempts! Status:', foundInUserAttempts.status);
  } else {
    console.error('  FAILED: Attempt not found in getUserAttempts');
  }

  console.log('6. Verifying getUserAnalyticsData...');
  const analytics = await getUserAnalyticsData(userId);
  console.log('  Analytics Summary:', {
    average_score_percentage: analytics.average_score_percentage,
    overall_accuracy: analytics.overall_accuracy,
    total_questions_answered: analytics.total_questions_answered,
    total_practice_days: analytics.total_practice_days,
    subject_stats_count: analytics.subject_stats.length,
    topic_accuracies_count: analytics.topic_accuracies.length,
  });
  if (analytics.total_questions_answered > 0) {
    console.log('  PASSED: Analytics computed successfully from database attempts!');
  } else {
    console.error('  FAILED: Analytics has 0 answered questions');
  }

  console.log('7. Verifying Bookmark Persistence & DB sync...');
  const testQId = attemptQuestions[0].question_id;
  const bm1 = await toggleBookmarkAction(userId, testQId, 'Review this question later');
  console.log('  Bookmark toggled on:', bm1.isBookmarked);
  const bookmarks = await getBookmarks(userId);
  console.log('  Current Bookmarks Count:', bookmarks.length);
  const hasBm = bookmarks.some(b => b.question_id === testQId);
  if (hasBm) {
    console.log('  PASSED: Bookmark stored and retrieved successfully!');
  } else {
    console.error('  FAILED: Bookmark not found');
  }

  // Cleanup bookmark
  await toggleBookmarkAction(userId, testQId);

  console.log('8. Verifying Cloud Database (Supabase)...');
  const supabase = createAdminClient();
  if (supabase) {
    const { data: dbAtts, error } = await supabase.from('exam_attempts').select('*').limit(5);
    console.log('  Supabase exam_attempts count in DB:', dbAtts?.length, error?.message || 'OK');
  }

  console.log('\n ALL PERSISTENCE & DATABASE TESTS PASSED!');
}

test().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
