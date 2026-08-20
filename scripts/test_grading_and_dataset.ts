import { getDataStore } from '../src/lib/db-adapter';
import { gradeExamAttempt } from '../src/lib/scoring-engine';
import type { AttemptQuestion, AttemptAnswer, QuestionAnswerKey } from '../src/lib/types/database';

const store = getDataStore();

console.log('=== DATASET VERIFICATION ===');
const malSub = store.subjects.find(s => s.slug === 'malware-analysis');
console.log('Subject found:', malSub?.name, 'ID:', malSub?.id);

const malChs = store.chapters.filter(c => c.subject_id === malSub?.id);
console.log('Chapters count:', malChs.length);

const malDocs = store.source_documents.filter(d => d.subject_id === malSub?.id);
console.log('Documents count:', malDocs.length);

const malQs = store.questions.filter(q => q.subject_id === malSub?.id);
console.log('Total Questions in Malware Analysis:', malQs.length);

const singleChoiceCount = malQs.filter(q => q.question_type === 'single_choice').length;
const matchingCount = malQs.filter(q => q.question_type === 'matching').length;
const fillBlankCount = malQs.filter(q => q.question_type === 'fill_in_the_blank').length;
console.log(`  - Single Choice: ${singleChoiceCount}`);
console.log(`  - Matching: ${matchingCount}`);
console.log(`  - Fill in the Blank: ${fillBlankCount}`);

console.log('\n=== PARTIAL SCORING TEST ===');
// Let's test a fill in the blank question (q-mal-013 with 4 blanks)
const qFill = malQs.find(q => q.id === 'q-mal-013')!;
const keyFill = store.question_answer_keys.find(k => k.question_id === 'q-mal-013')!;

// Scenario 1: 2 out of 4 correct blanks
const mockQuestions: AttemptQuestion[] = [
  {
    id: 'att-q-1',
    attempt_id: 'test-att',
    question_id: qFill.id,
    question_type: 'fill_in_the_blank',
    shuffled_choices: [],
    question_snapshot: qFill,
  }
];

const mockAnswersPartialFill: AttemptAnswer[] = [
  {
    attempt_id: 'test-att',
    question_id: qFill.id,
    fill_blank_answers: {
      blank_1: 'Virus', // correct
      blank_2: 'Worm', // correct
      blank_3: 'Wrong1', // wrong
      blank_4: 'Wrong2', // wrong
    }
  }
];

const answerKeysMap: Record<string, QuestionAnswerKey> = {
  [qFill.id]: keyFill
};

const resultFill = gradeExamAttempt(mockQuestions, mockAnswersPartialFill, answerKeysMap);
console.log('Fill-in-blank 2/4 correct result:');
console.log('  Score Total:', resultFill.score_total, '/ Max:', resultFill.score_max);
console.log('  Percentage:', resultFill.score_percentage, '%');
console.log('  Partially Correct Count:', resultFill.partially_correct_count);
console.log('  Graded Answer:', {
  points_earned: resultFill.graded_answers[0].points_earned,
  is_partially_correct: resultFill.graded_answers[0].is_partially_correct,
  correct_sub_count: resultFill.graded_answers[0].correct_sub_count,
  total_sub_count: resultFill.graded_answers[0].total_sub_count,
});

if (resultFill.score_total === 0.5 && resultFill.graded_answers[0].is_partially_correct === true) {
  console.log(' PASSED: Partial credit 0.5 / 1.0 awarded successfully!');
} else {
  console.error(' FAILED: Partial scoring mismatch');
}

// Let's test a matching question (q-mal-011 with 4 pairs)
const qMatch = malQs.find(q => q.id === 'q-mal-011')!;
const keyMatch = store.question_answer_keys.find(k => k.question_id === 'q-mal-011')!;

const mockQuestionsMatch: AttemptQuestion[] = [
  {
    id: 'att-q-2',
    attempt_id: 'test-att',
    question_id: qMatch.id,
    question_type: 'matching',
    shuffled_choices: [],
    question_snapshot: qMatch,
  }
];

// 3 out of 4 correct
const mockAnswersPartialMatch: AttemptAnswer[] = [
  {
    attempt_id: 'test-att',
    question_id: qMatch.id,
    matching_answers: {
      p1: 'p1', // correct
      p2: 'p2', // correct
      p3: 'p3', // correct
      p4: 'wrong', // wrong
    }
  }
];

const answerKeysMapMatch: Record<string, QuestionAnswerKey> = {
  [qMatch.id]: keyMatch
};

const resultMatch = gradeExamAttempt(mockQuestionsMatch, mockAnswersPartialMatch, answerKeysMapMatch);
console.log('\nMatching 3/4 correct result:');
console.log('  Score Total:', resultMatch.score_total, '/ Max:', resultMatch.score_max);
console.log('  Percentage:', resultMatch.score_percentage, '%');
console.log('  Graded Answer:', {
  points_earned: resultMatch.graded_answers[0].points_earned,
  is_partially_correct: resultMatch.graded_answers[0].is_partially_correct,
  correct_sub_count: resultMatch.graded_answers[0].correct_sub_count,
  total_sub_count: resultMatch.graded_answers[0].total_sub_count,
});

if (resultMatch.score_total === 0.75 && resultMatch.graded_answers[0].is_partially_correct === true) {
  console.log(' PASSED: Partial credit 0.75 / 1.0 awarded successfully!');
} else {
  console.error(' FAILED: Matching partial scoring mismatch');
}
