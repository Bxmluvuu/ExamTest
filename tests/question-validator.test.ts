import { describe, it, expect } from 'vitest';
import {
  GeneratedQuestionSchema,
  detectDuplicateQuestion,
  calculateJaccardSimilarity,
  inspectQuestionQuality,
} from '@/lib/question-validator';

describe('Question Validator & Duplicate Detection', () => {
  it('validates a correct question against GeneratedQuestionSchema', () => {
    const validQuestion = {
      questionText: 'ข้อใดอธิบายคุณสมบัติของ Third Normal Form (3NF) ได้ถูกต้องที่สุด',
      questionType: 'single_choice' as const,
      choices: [
        { key: 'A' as const, text: 'ต้องอยู่ใน 1NF และไม่มี Partial Functional Dependency' },
        { key: 'B' as const, text: 'ต้องไม่มี Multivalued Dependency' },
        { key: 'C' as const, text: 'ต้องอยู่ใน 2NF และไม่มี Transitive Functional Dependency' },
        { key: 'D' as const, text: 'ทุก Determinant ต้องเป็น Superkey' },
      ],
      correctChoice: 'C' as const,
      explanation: '3NF กำหนดว่าตารางต้องอยู่ใน 2NF และไม่มี Transitive Dependency',
      chapter: 'Normalization',
      topic: 'Third Normal Form (3NF)',
      difficulty: 'medium' as const,
      source: {
        file: 'chapter-03.pdf',
        pages: [3, 4],
        evidence: 'Third Normal Form removes transitive dependencies between non-prime attributes.',
      },
    };

    const parsed = GeneratedQuestionSchema.safeParse(validQuestion);
    expect(parsed.success).toBe(true);
  });

  it('rejects questions with duplicate choices', () => {
    const invalidQuestion = {
      questionText: 'ข้อใดถูกต้อง',
      questionType: 'single_choice' as const,
      choices: [
        { key: 'A' as const, text: 'ตัวเลือก A' },
        { key: 'B' as const, text: 'ตัวเลือก A' }, // duplicate text
        { key: 'C' as const, text: 'ตัวเลือก C' },
        { key: 'D' as const, text: 'ตัวเลือก D' },
      ],
      correctChoice: 'A' as const,
      explanation: 'คำอธิบายคำตอบที่ถูกต้อง',
      chapter: 'General',
      topic: 'General',
      difficulty: 'easy' as const,
      source: {
        file: 'slide.pdf',
        pages: [1],
        evidence: 'Verified concept evidence',
      },
    };

    const parsed = GeneratedQuestionSchema.safeParse(invalidQuestion);
    expect(parsed.success).toBe(false);
  });

  it('detects duplicate question text with Jaccard similarity', () => {
    const text1 = 'ข้อใดอธิบาย Third Normal Form (3NF) ได้ถูกต้องที่สุด';
    const text2 = 'ข้อใดอธิบาย Third Normal Form 3NF ได้ถูกต้องที่สุด';

    const similarity = calculateJaccardSimilarity(text1, text2);
    expect(similarity).toBeGreaterThan(0.8);

    const dupResult = detectDuplicateQuestion(text1, [
      { id: 'q-existing', question_text: text2 },
    ]);
    expect(dupResult.isDuplicate).toBe(true);
  });
});
