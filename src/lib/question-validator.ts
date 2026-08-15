import { z } from 'zod';
import type { QuestionQualityFlag } from './types/database';

export const ChoiceSchema = z.object({
  key: z.enum(['A', 'B', 'C', 'D']),
  text: z.string().min(1, 'Choice text cannot be empty').trim(),
});

export const SourceSchema = z.object({
  documentId: z.string().optional(),
  file: z.string().min(1, 'Source file name is required'),
  pages: z.array(z.number().int().positive()).min(1, 'At least one page number is required'),
  evidence: z.string().min(5, 'Evidence text must be at least 5 characters long'),
});

export const GeneratedQuestionSchema = z.object({
  questionText: z.string().min(5, 'Question text must be at least 5 characters').trim(),
  questionType: z.enum(['single_choice', 'multiple_choice', 'numeric']).default('single_choice'),
  choices: z.array(ChoiceSchema).length(4, 'Must provide exactly 4 choices (A, B, C, D)'),
  correctChoice: z.enum(['A', 'B', 'C', 'D']),
  explanation: z.string().min(10, 'Explanation must be at least 10 characters').trim(),
  chapter: z.string().min(1, 'Chapter name is required'),
  topic: z.string().min(1, 'Topic name is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  source: SourceSchema,
}).superRefine((data, ctx) => {
  // Check for duplicate choice texts
  const choiceTexts = data.choices.map(c => c.text.toLowerCase().trim());
  const uniqueTexts = new Set(choiceTexts);
  if (uniqueTexts.size !== choiceTexts.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Choices must have unique options, duplicates detected',
      path: ['choices'],
    });
  }

  // Check correctChoice exists in choices
  const validKeys = data.choices.map(c => c.key);
  if (!validKeys.includes(data.correctChoice)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Correct choice '${data.correctChoice}' is not in choices list`,
      path: ['correctChoice'],
    });
  }
});

export type GeneratedQuestion = z.infer<typeof GeneratedQuestionSchema>;

/**
 * Text normalization for similarity & duplicate checking
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\u0E00-\u0E7Fa-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Jaccard similarity between two token sets
 */
export function calculateJaccardSimilarity(text1: string, text2: string): number {
  const norm1 = normalizeText(text1);
  const norm2 = normalizeText(text2);

  if (norm1 === norm2) return 1.0;
  if (!norm1 || !norm2) return 0.0;

  const tokens1 = new Set(norm1.split(' '));
  const tokens2 = new Set(norm2.split(' '));

  const intersection = new Set([...tokens1].filter(t => tokens2.has(t)));
  const union = new Set([...tokens1, ...tokens2]);

  if (union.size === 0) return 0.0;
  return intersection.size / union.size;
}

/**
 * Detects whether a new question is a duplicate of existing questions
 */
export function detectDuplicateQuestion(
  newQuestionText: string,
  existingQuestions: Array<{ id: string; question_text: string }>,
  threshold: number = 0.85
): { isDuplicate: boolean; matchedQuestionId?: string; similarity: number } {
  for (const existing of existingQuestions) {
    const similarity = calculateJaccardSimilarity(newQuestionText, existing.question_text);
    if (similarity >= threshold) {
      return {
        isDuplicate: true,
        matchedQuestionId: existing.id,
        similarity,
      };
    }
  }

  return {
    isDuplicate: false,
    similarity: 0,
  };
}

/**
 * Inspects a generated question and returns quality flags if issues are found
 */
export function inspectQuestionQuality(question: GeneratedQuestion): Omit<QuestionQualityFlag, 'id' | 'question_id' | 'created_at'>[] {
  const flags: Omit<QuestionQualityFlag, 'id' | 'question_id' | 'created_at'>[] = [];

  // 1. Evidence check
  if (!question.source.evidence || question.source.evidence.length < 15) {
    flags.push({
      flag_type: 'weak_evidence',
      severity: 'medium',
      description: 'Citation evidence text is too brief or generic',
      is_resolved: false,
    });
  }

  // 2. Ambiguity check in choices (e.g. all of the above / none of the above)
  const hasMetaChoices = question.choices.some(c => 
    /all of the above|none of the above|ถูกทุกข้อ|ผิดทุกข้อ/i.test(c.text)
  );
  if (hasMetaChoices) {
    flags.push({
      flag_type: 'meta_choice_detected',
      severity: 'low',
      description: 'Choice contains generic phrases like "ถูกทุกข้อ" or "ผิดทุกข้อ"',
      is_resolved: false,
    });
  }

  // 3. Question length check
  if (question.questionText.length < 12) {
    flags.push({
      flag_type: 'short_stem',
      severity: 'medium',
      description: 'Question stem might be too short or vague',
      is_resolved: false,
    });
  }

  return flags;
}
