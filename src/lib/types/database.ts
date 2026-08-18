export type UserRole = 'student' | 'admin';

export type QuestionStatus = 'draft' | 'needs_review' | 'approved' | 'published' | 'retired';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'single_choice' | 'multiple_choice' | 'numeric' | 'fill_in_the_blank' | 'matching';
export type ExamMode = 'exam' | 'chapter' | 'weakness' | 'mistakes';
export type AttemptStatus = 'in_progress' | 'submitted' | 'abandoned';
export type DocumentType = 'slide' | 'past_exam';
export type OcrStatus = 'ready' | 'needs_ocr' | 'processing' | 'failed';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  is_email_verified?: boolean;
  password_hash?: string;
  failed_login_attempts?: number;
  locked_until?: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  session_token_hash: string;
  device_name: string;
  browser: string;
  ip_address: string;
  last_active_at: string;
  expires_at: string;
  is_revoked: boolean;
  created_at: string;
}

export interface PasswordHistory {
  id: string;
  user_id: string;
  password_hash: string;
  created_at: string;
}

export type AuthAuditEventType =
  | 'login_success'
  | 'login_failed'
  | 'account_locked'
  | 'account_unlocked'
  | 'logout'
  | 'register'
  | 'password_reset_request'
  | 'password_reset_success'
  | 'password_change'
  | 'email_verify_success'
  | 'session_revoked';

export interface AuthAuditLog {
  id: string;
  user_id?: string;
  email?: string;
  event_type: AuthAuditEventType;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface Subject {
  id: string;
  slug: string;
  name: string;
  description: string;
  language: string;
  question_target: number;
  icon?: string;
  created_at: string;
  updated_at: string;
}

export interface Chapter {
  id: string;
  subject_id: string;
  sequence_order: number;
  title: string;
  description?: string;
  created_at: string;
}

export interface Topic {
  id: string;
  chapter_id: string;
  title: string;
  description?: string;
  created_at: string;
}

export interface SourceDocument {
  id: string;
  subject_id: string;
  chapter_id?: string;
  title: string;
  file_path: string;
  document_type: DocumentType;
  mime_type: string;
  file_size: number;
  page_count: number;
  ocr_status: OcrStatus;
  extraction_text_summary?: string;
  storage_bucket: string;
  created_at: string;
}

export interface SourcePage {
  id: string;
  document_id: string;
  page_number: number;
  raw_text: string;
  token_count: number;
  created_at: string;
}

export interface ReadingProgress {
  id: string;
  user_id: string;
  document_id: string;
  last_page_read: number;
  total_pages: number;
  completed: boolean;
  updated_at: string;
}

export interface ExamBlueprint {
  id: string;
  subject_id: string;
  name: string;
  slug: string;
  description: string;
  question_count: number;
  duration_minutes: number;
  difficulty_distribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  topic_distribution: Array<{
    topic: string;
    weight: number;
  }>;
  avoid_recent_question_count: number;
  is_active: boolean;
  created_at: string;
}

export interface QuestionChoice {
  id?: string;
  question_id?: string;
  choice_key?: 'A' | 'B' | 'C' | 'D';
  key?: any;
  choice_text?: string;
  text?: string;
  sequence_order?: number;
}

export interface QuestionSource {
  id?: string;
  question_id: string;
  file_name: string;
  page_numbers: number[];
  pages?: number[];
  evidence_text: string;
  evidence?: string;
  created_at?: string;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface FillBlankItem {
  id: string;
  position: number;
  placeholder?: string;
  correct_word?: string;
}

export interface QuestionAnswerKey {
  id: string;
  question_id: string;
  correct_choice_key?: 'A' | 'B' | 'C' | 'D' | string;
  correct_blank_answers?: Record<string, string>;
  correct_matching?: Record<string, string>;
  explanation: string;
  created_at?: string;
}

export interface QuestionQualityFlag {
  id: string;
  question_id: string;
  flag_type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  is_resolved: boolean;
  created_at: string;
}

export interface Question {
  id: string;
  subject_id: string;
  chapter_id: string;
  topic_id?: string;
  chapter_title?: string;
  topic_title?: string;
  question_text: string;
  text?: string;
  question_type: QuestionType;
  difficulty: QuestionDifficulty;
  status: QuestionStatus;
  is_ai_generated: boolean;
  created_at: string;
  updated_at: string;
  choices?: QuestionChoice[];
  word_bank?: string[];
  blanks?: FillBlankItem[];
  matching_pairs?: MatchingPair[];
  source?: QuestionSource;
  quality_flags?: QuestionQualityFlag[];
}

export interface ExamAttempt {
  id: string;
  user_id: string;
  subject_id: string;
  blueprint_id?: string;
  blueprint_name?: string;
  subject_name?: string;
  mode: ExamMode;
  total_questions: number;
  duration_minutes: number;
  time_spent_seconds: number;
  started_at: string;
  submitted_at?: string;
  completed_at?: string;
  status: AttemptStatus;
  score_total: number;
  score_max: number;
  score_percentage: number;
  is_graded: boolean;
}

export interface AttemptQuestion {
  id: string;
  attempt_id: string;
  question_id: string;
  sequence_number?: number;
  sequence_order?: number;
  question_text?: string;
  question_type?: QuestionType;
  difficulty?: QuestionDifficulty;
  chapter_title?: string;
  topic_title?: string;
  choices?: QuestionChoice[];
  shuffled_choices: QuestionChoice[];
  user_selected_key?: 'A' | 'B' | 'C' | 'D' | string | null;
  selected_choice_key?: 'A' | 'B' | 'C' | 'D' | string | null;
  fill_blank_answers?: Record<string, string> | null;
  matching_answers?: Record<string, string> | null;
  is_marked_for_review?: boolean;
  time_spent_seconds?: number;
  is_correct?: boolean;
  correct_choice_key?: 'A' | 'B' | 'C' | 'D' | string;
  correct_blank_answers?: Record<string, string>;
  correct_matching?: Record<string, string>;
  explanation?: string;
  source?: QuestionSource;
  source_citation?: any;
  question_snapshot: any;
}

export interface AttemptAnswer {
  id?: string;
  attempt_id: string;
  question_id: string;
  selected_choice_key?: 'A' | 'B' | 'C' | 'D' | string | null;
  fill_blank_answers?: Record<string, string> | null;
  matching_answers?: Record<string, string> | null;
  numeric_answer?: number | null;
  is_correct?: boolean;
  time_spent_seconds?: number;
  response_time_seconds?: number;
  is_marked_for_review?: boolean;
  answered_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  question_id: string;
  notes?: string;
  created_at: string;
  question?: Question;
}

export interface GenerationRun {
  id: string;
  subject_id: string;
  model_name: string;
  prompt_version: string;
  total_requested: number;
  total_generated: number;
  total_imported: number;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface GenerationBatch {
  id: string;
  run_id: string;
  batch_number: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  items_count: number;
  error_log?: string;
  created_at: string;
}

export interface AdminAuditLog {
  id: string;
  admin_user_id: string;
  action: string;
  target_entity: string;
  target_id: string;
  details?: Record<string, unknown>;
  created_at: string;
  admin_email?: string;
}

export interface UserAnalyticsSummary {
  user_id: string;
  total_attempts: number;
  completed_attempts: number;
  total_questions_answered: number;
  total_correct_answers: number;
  overall_accuracy: number;
  average_score_percentage: number;
  total_practice_days: number;
  subject_stats: Array<{
    subject_id: string;
    subject_name: string;
    attempts_count: number;
    average_score: number;
    total_answered: number;
    accuracy: number;
    coverage_percentage: number;
  }>;
  topic_accuracies: Array<{
    topic: string;
    chapter: string;
    total_answered: number;
    correct_count: number;
    accuracy_percentage: number;
    status: 'strong' | 'moderate' | 'weak';
  }>;
  score_trends: Array<{
    date: string;
    score_percentage: number;
    mode: string;
    subject_name: string;
    attempt_id: string;
  }>;
  recommendations: Array<{
    type: 'weakness' | 'coverage' | 'review' | 'streak';
    title: string;
    description: string;
    target_subject_id?: string;
    target_topic?: string;
    action_label: string;
    action_url: string;
  }>;
}
