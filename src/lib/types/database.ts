export type UserRole = 'student' | 'admin';

export type QuestionStatus = 'draft' | 'needs_review' | 'approved' | 'published' | 'retired';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'single_choice' | 'multiple_choice' | 'numeric';
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
  created_at: string;
  updated_at: string;
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
  id: string;
  question_id: string;
  choice_key: 'A' | 'B' | 'C' | 'D';
  choice_text: string;
  sequence_order: number;
}

export interface QuestionSource {
  id: string;
  question_id: string;
  document_id?: string;
  file_name: string;
  page_numbers: number[];
  evidence_text: string;
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
  question_text: string;
  question_type: QuestionType;
  difficulty: QuestionDifficulty;
  status: QuestionStatus;
  is_ai_generated: boolean;
  created_at: string;
  updated_at: string;
  
  // Relations
  choices?: QuestionChoice[];
  source?: QuestionSource;
  quality_flags?: QuestionQualityFlag[];
  chapter_title?: string;
  topic_title?: string;
  subject_name?: string;
}

export interface QuestionAnswerKey {
  id: string;
  question_id: string;
  correct_choice_key: string;
  explanation: string;
  created_at?: string;
}

export interface ExamAttempt {
  id: string;
  user_id: string;
  subject_id: string;
  blueprint_id?: string;
  mode: ExamMode;
  total_questions: number;
  duration_minutes: number;
  time_spent_seconds: number;
  started_at: string;
  completed_at?: string;
  status: AttemptStatus;
  score_total: number;
  score_max: number;
  score_percentage: number;
  is_graded: boolean;
  metadata?: Record<string, unknown>;
  
  // Joins
  subject_name?: string;
  blueprint_name?: string;
}

export interface AttemptQuestion {
  id: string;
  attempt_id: string;
  question_id: string;
  sequence_order: number;
  shuffled_choices: Array<{
    key: string;
    text: string;
  }>;
  question_snapshot: {
    text: string;
    difficulty: QuestionDifficulty;
    chapter_title: string;
    topic_title: string;
    question_type: QuestionType;
  };
  // Runtime answer info
  selected_choice_key?: string;
  is_correct?: boolean;
  correct_choice_key?: string; // only populated after submit
  explanation?: string;        // only populated after submit
  source_citation?: {
    file_name: string;
    pages: number[];
    evidence: string;
  };
}

export interface AttemptAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_choice_key: string;
  is_correct?: boolean;
  answered_at: string;
  response_time_seconds?: number;
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
