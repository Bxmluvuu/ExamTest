import type {
  Profile,
  UserSession,
  PasswordHistory,
  AuthAuditLog,
  Subject,
  Chapter,
  Topic,
  SourceDocument,
  SourcePage,
  ExamBlueprint,
  Question,
  QuestionChoice,
  QuestionAnswerKey,
  QuestionSource,
  QuestionQualityFlag,
  ExamAttempt,
  AttemptQuestion,
  AttemptAnswer,
  Bookmark,
  AdminAuditLog,
  GenerationRun,
} from '../types/database';

export interface DataStore {
  profiles: Profile[];
  user_sessions: UserSession[];
  password_history: PasswordHistory[];
  auth_audit_logs: AuthAuditLog[];
  subjects: Subject[];
  chapters: Chapter[];
  topics: Topic[];
  source_documents: SourceDocument[];
  source_pages: SourcePage[];
  exam_blueprints: ExamBlueprint[];
  questions: Question[];
  question_choices: QuestionChoice[];
  question_answer_keys: QuestionAnswerKey[];
  question_sources: QuestionSource[];
  question_quality_flags: QuestionQualityFlag[];
  exam_attempts: ExamAttempt[];
  attempt_questions: AttemptQuestion[];
  attempt_answers: AttemptAnswer[];
  bookmarks: Bookmark[];
  admin_audit_logs: AdminAuditLog[];
  generation_runs: GenerationRun[];
}

export function createInitialSeedData(): DataStore {
  // Base Production Accounts
  const studentUser: Profile = {
    id: 'u-student-001',
    email: 'student@example.com',
    full_name: 'สมชาย รักเรียน',
    role: 'student',
    is_email_verified: true,
    password_hash: 'Password123!',
    failed_login_attempts: 0,
    locked_until: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return {
    profiles: [studentUser, adminUser],
    user_sessions: [],
    password_history: [],
    auth_audit_logs: [],
    subjects: [],
    chapters: [],
    topics: [],
    source_documents: [],
    source_pages: [],
    exam_blueprints: [],
    questions: [],
    question_choices: [],
    question_answer_keys: [],
    question_sources: [],
    question_quality_flags: [],
    exam_attempts: [],
    attempt_questions: [],
    attempt_answers: [],
    bookmarks: [],
    admin_audit_logs: [],
    generation_runs: [],
  };
}
