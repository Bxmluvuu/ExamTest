import type { DataStore } from '@/lib/mock-data/seed-store';
import type {
  Subject,
  Chapter,
  Topic,
  Question,
  ExamBlueprint,
  ExamAttempt,
  AttemptAnswer,
  AttemptQuestion,
  QuestionChoice,
  QuestionAnswerKey,
  QuestionSource,
  Profile,
} from '@/lib/types/database';

export function createTestFixtureStore(): DataStore {
  const studentUser: Profile = {
    id: 'u-student-001',
    email: 'student@example.com',
    full_name: 'สมชาย รักเรียน',
    role: 'student',
    is_email_verified: true,
    password_hash: 'Password123!',
    failed_login_attempts: 0,
    locked_until: null,
    created_at: '2026-08-01T08:00:00Z',
    updated_at: '2026-08-01T08:00:00Z',
  };

  const adminUser: Profile = {
    id: 'u-admin-001',
    email: 'admin@example.com',
    full_name: 'ดร. วิชาญ ผู้ดูแลระบบ',
    role: 'admin',
    is_email_verified: true,
    password_hash: 'Admin123!',
    failed_login_attempts: 0,
    locked_until: null,
    created_at: '2026-08-01T08:00:00Z',
    updated_at: '2026-08-01T08:00:00Z',
  };

  const subDb: Subject = {
    id: 'sub-db-001',
    slug: 'database-systems',
    name: 'Database Systems',
    description: 'หลักการและทฤษฎีระบบจัดการฐานข้อมูล',
    language: 'th',
    question_target: 500,
    created_at: '2026-08-01T09:00:00Z',
    updated_at: '2026-08-01T09:00:00Z',
  };

  const chDb1: Chapter = {
    id: 'ch-db-01',
    subject_id: subDb.id,
    sequence_order: 1,
    title: 'Introduction & Relational Model',
    description: 'โครงสร้างตาราง Primary Key, Foreign Key',
    created_at: '2026-08-01T09:30:00Z',
  };

  const topDb1_1: Topic = { id: 'top-db-101', chapter_id: chDb1.id, title: 'Relational Model Concepts', created_at: '2026-08-01T09:35:00Z' };

  const bpDb: ExamBlueprint = {
    id: 'bp-db-001',
    subject_id: subDb.id,
    name: 'Database Systems - Comprehensive Midterm Blueprint',
    slug: 'db-midterm-blueprint',
    description: 'แบบประเมินผลกลางภาควิชา Database Systems',
    question_count: 5,
    duration_minutes: 20,
    topic_distribution: [{ topic: 'Relational Model Concepts', weight: 1 }],
    avoid_recent_question_count: 0,
    difficulty_distribution: { easy: 0.4, medium: 0.4, hard: 0.2 },
    is_active: true,
    created_at: '2026-08-01T10:00:00Z',
  };

  const q1: Question = {
    id: 'q-db-001',
    subject_id: subDb.id,
    chapter_id: chDb1.id,
    topic_id: topDb1_1.id,
    question_text: 'คุณสมบัติของค่าข้อมูลที่เป็นไปตาม First Normal Form (1NF) คืออะไร',
    question_type: 'single_choice',
    difficulty: 'easy',
    status: 'published',
    is_ai_generated: false,
    chapter_title: chDb1.title,
    topic_title: topDb1_1.title,
    created_at: '2026-08-05T12:00:00Z',
    updated_at: '2026-08-05T12:00:00Z',
    choices: [
      { id: 'c-1-A', question_id: 'q-db-001', choice_key: 'A', choice_text: 'A', sequence_order: 1 },
      { id: 'c-1-B', question_id: 'q-db-001', choice_key: 'B', choice_text: 'B', sequence_order: 2 },
    ],
  };

  const qDraft: Question = {
    id: 'q-db-draft-001',
    subject_id: subDb.id,
    chapter_id: chDb1.id,
    topic_id: topDb1_1.id,
    question_text: 'คำถามร่าง AI ยังไม่เผยแพร่',
    question_type: 'single_choice',
    difficulty: 'medium',
    status: 'draft',
    is_ai_generated: true,
    chapter_title: chDb1.title,
    topic_title: topDb1_1.title,
    created_at: '2026-08-05T12:00:00Z',
    updated_at: '2026-08-05T12:00:00Z',
    choices: [
      { id: 'c-d-A', question_id: 'q-db-draft-001', choice_key: 'A', choice_text: 'A', sequence_order: 1 },
      { id: 'c-d-B', question_id: 'q-db-draft-001', choice_key: 'B', choice_text: 'B', sequence_order: 2 },
    ],
  };

  const attempt1: ExamAttempt = {
    id: 'att-demo-001',
    user_id: studentUser.id,
    subject_id: subDb.id,
    blueprint_id: bpDb.id,
    mode: 'exam',
    total_questions: 1,
    duration_minutes: 20,
    time_spent_seconds: 480,
    started_at: '2026-08-10T14:00:00Z',
    completed_at: '2026-08-10T14:08:00Z',
    status: 'submitted',
    score_total: 1,
    score_max: 1,
    score_percentage: 100,
    is_graded: true,
    subject_name: subDb.name,
    blueprint_name: bpDb.name,
  };

  const attemptAnswer1: AttemptAnswer = {
    id: 'ans-01',
    attempt_id: attempt1.id,
    question_id: q1.id,
    selected_choice_key: 'B',
    is_correct: true,
    time_spent_seconds: 30,
    answered_at: '2026-08-10T14:02:00Z',
  };

  return {
    profiles: [studentUser, adminUser],
    user_sessions: [],
    password_history: [],
    auth_audit_logs: [],
    subjects: [subDb],
    chapters: [chDb1],
    topics: [topDb1_1],
    source_documents: [],
    source_pages: [],
    exam_blueprints: [bpDb],
    questions: [q1, qDraft],
    question_choices: [...(q1.choices || []), ...(qDraft.choices || [])],
    question_answer_keys: [
      { id: 'ak-1', question_id: q1.id, correct_choice_key: 'B', explanation: 'Correct choice is B' },
      { id: 'ak-2', question_id: qDraft.id, correct_choice_key: 'A', explanation: 'Correct choice is A' },
    ],
    question_sources: [],
    question_quality_flags: [],
    exam_attempts: [attempt1],
    attempt_questions: [
      {
        id: 'attq-01',
        attempt_id: attempt1.id,
        question_id: q1.id,
        sequence_order: 1,
        shuffled_choices: q1.choices || [],
        question_snapshot: {
          text: q1.question_text,
          difficulty: q1.difficulty,
          chapter_title: chDb1.title,
          topic_title: topDb1_1.title,
          question_type: 'single_choice',
        },
        selected_choice_key: 'B',
        is_correct: true,
        correct_choice_key: 'B',
        explanation: 'Correct choice is B',
      },
    ],
    attempt_answers: [attemptAnswer1],
    bookmarks: [],
    admin_audit_logs: [],
    generation_runs: [],
  };
}
