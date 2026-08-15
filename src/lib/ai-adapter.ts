import { GeneratedQuestionSchema, type GeneratedQuestion } from './question-validator';

export interface AiGenerationRequest {
  subjectName: string;
  chapterTitle: string;
  topicTitle: string;
  documentFileName: string;
  documentPages: Array<{ pageNumber: number; text: string }>;
  count: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface AiGenerationResponse {
  questions: GeneratedQuestion[];
  modelUsed: string;
  tokensUsed: number;
  isMock: boolean;
}

/**
 * Mock generator that produces high-quality structured questions deterministically from document pages
 */
export function generateMockQuestions(req: AiGenerationRequest): AiGenerationResponse {
  const questions: GeneratedQuestion[] = [];
  const countToGenerate = Math.min(req.count, 10);
  const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];

  for (let i = 1; i <= countToGenerate; i++) {
    const pageNum = req.documentPages[i % req.documentPages.length]?.pageNumber || 1;
    const pageText = req.documentPages[i % req.documentPages.length]?.text || 'Concepts and principles';
    const diff = req.difficulty || difficulties[(i - 1) % 3];

    let stem = '';
    let choices: Array<{ key: 'A' | 'B' | 'C' | 'D'; text: string }> = [];
    let correctChoice: 'A' | 'B' | 'C' | 'D' = 'C';
    let explanation = '';
    let evidence = pageText.slice(0, 120);

    if (req.subjectName.toLowerCase().includes('database')) {
      if (req.topicTitle.includes('Normal') || req.chapterTitle.includes('Normalization')) {
        stem = `ตามหลักการออกแบบฐานข้อมูล ในขั้นตอน Normalization ข้อใดอธิบายคุณสมบัติของ Third Normal Form (3NF) ได้ถูกต้องที่สุด (ข้อที่ ${i})`;
        choices = [
          { key: 'A', text: 'ต้องอยู่ใน 1NF และไม่มี Partial Functional Dependency บน Composite Key' },
          { key: 'B', text: 'ต้องไม่มี Multivalued Dependency ใดๆ ในตาราง' },
          { key: 'C', text: 'ต้องอยู่ใน 2NF และไม่มี Transitive Functional Dependency ระหว่าง Non-prime Attributes' },
          { key: 'D', text: 'ทุก Determinant ใน Functional Dependency ทั้งหมดต้องเป็น Superkey' },
        ];
        correctChoice = 'C';
        explanation = '3NF กำหนดว่าตารางต้องอยู่ใน 2NF และต้องกำจัด Transitive Dependency (X -> Y -> Z) เพื่อป้องกัน Update Anomalies';
      } else if (req.topicTitle.includes('Key') || req.chapterTitle.includes('Relational')) {
        stem = `ข้อใดอธิบายความแตกต่างระหว่าง Primary Key และ Foreign Key ได้ถูกต้องตาม Relational Model (ข้อที่ ${i})`;
        choices = [
          { key: 'A', text: 'Primary Key สามารถมีค่าเป็น NULL ได้ในกรณีที่เป็น Surrogate Key' },
          { key: 'B', text: 'Foreign Key ต้องมีชื่อคอลัมน์เหมือนกับ Primary Key ในตารางปลายทางเสมอ' },
          { key: 'C', text: 'Primary Key บังคับ Entity Integrity (ห้าม NULL และห้ามซ้ำ) ส่วน Foreign Key บังคับ Referential Integrity' },
          { key: 'D', text: 'หนึ่งตารางสามารถมีได้หลาย Primary Key แต่มีได้เพียงหนึ่ง Foreign Key' },
        ];
        correctChoice = 'C';
        explanation = 'Entity Integrity บังคับว่า Primary Key ต้อง Unique และ Not NULL ส่วน Foreign Key อ้างอิงเพื่อรักษา Referential Integrity';
      } else {
        stem = `ในการเขียนคำสั่ง SQL ข้อใดอธิบายพฤติกรรมของ INNER JOIN และ LEFT OUTER JOIN ได้ถูกต้อง (ข้อที่ ${i})`;
        choices = [
          { key: 'A', text: 'INNER JOIN คืนค่าทุกแถวจากตารางซ้าย แม้จะไม่ตรงกับเงื่อนไขในตารางขวา' },
          { key: 'B', text: 'LEFT OUTER JOIN รวมแถวที่ซ้ำกันออกโดยอัตโนมัติเหมือนคำสั่ง UNION' },
          { key: 'C', text: 'INNER JOIN คืนเฉพาะแถวที่ตรงเงื่อนไขทั้งสองฝั่ง ส่วน LEFT OUTER JOIN คืนทุกแถวจากตารางซ้ายและเติม NULL สำหรับแถวขวาที่ไม่ตรง' },
          { key: 'D', text: 'ทั้งสองคำสั่งให้ผลลัพธ์เหมือนกันทุกประการหากใช้คีย์ร่วมแบบ Foreign Key' },
        ];
        correctChoice = 'C';
        explanation = 'INNER JOIN คัดเลือกเฉพาะแถวที่มีค่าตรงกันตามเงื่อนไข ON ส่วน LEFT JOIN จะรักษาแถวทั้งหมดจากตารางด้านซ้ายเสมอ';
      }
    } else {
      // Computer Networks / General
      stem = `ในสถาปัตยกรรมเครือข่ายคอมพิวเตอร์ ข้อใดอธิบายการทำงานของ Data Link Layer และ Transport Layer ได้ถูกต้องที่สุด (ข้อที่ ${i})`;
      choices = [
        { key: 'A', text: 'Data Link Layer ทำงานด้วย IP Address ส่วน Transport Layer ทำงานด้วย MAC Address' },
        { key: 'B', text: 'Transport Layer รับผิดชอบการส่งข้อมูลแบบ Hop-to-Hop ระหว่างเราเตอร์ที่อยู่ติดกัน' },
        { key: 'C', text: 'Data Link Layer รับผิดชอบการส่งข้อมูล Node-to-Node ด้วย Frame และ MAC Address ส่วน Transport Layer ดูแล End-to-End Delivery ด้วย Port' },
        { key: 'D', text: 'Transport Layer มีหน้าที่เพียงแปลงสัญญาณดิจิทัลเป็นสัญญาณคลื่นวิทยุในชั้นกายภาพ' },
      ];
      correctChoice = 'C';
      explanation = 'Data Link Layer ดูแลการส่งเฟรมระหว่างอุปกรณ์ใน Local Network (MAC Address) ขณะที่ Transport Layer ดูแลความถูกต้องและการเชื่อมต่อระหว่าง Process ต้นทางและปลายทาง (Port Number)';
    }

    questions.push({
      questionText: stem,
      questionType: 'single_choice',
      choices,
      correctChoice,
      explanation,
      chapter: req.chapterTitle,
      topic: req.topicTitle,
      difficulty: diff,
      source: {
        file: req.documentFileName,
        pages: [pageNum],
        evidence: evidence || 'Factual concept verified in course syllabus material.',
      },
    });
  }

  return {
    questions,
    modelUsed: 'mock-deterministic-adapter',
    tokensUsed: countToGenerate * 250,
    isMock: true,
  };
}

/**
 * Adapter to call OpenAI or compatible LLM endpoint
 */
export async function generateQuestionsWithAi(req: AiGenerationRequest): Promise<AiGenerationResponse> {
  const apiKey = process.env.AI_API_KEY;
  const baseUrl = process.env.AI_BASE_URL || 'https://api.openai.com/v1';
  const model = process.env.AI_MODEL || 'gpt-4o-mini';

  // If no API key is provided, use mock deterministic generation cleanly
  if (!apiKey || apiKey.trim() === '') {
    return generateMockQuestions(req);
  }

  const systemPrompt = `You are an expert university professor creating rigorous multiple-choice exam questions from course slides.
Output must be a valid JSON array of objects strictly conforming to this schema:
[
  {
    "questionText": "string (Thai)",
    "questionType": "single_choice",
    "choices": [
      { "key": "A", "text": "choice 1" },
      { "key": "B", "text": "choice 2" },
      { "key": "C", "text": "choice 3" },
      { "key": "D", "text": "choice 4" }
    ],
    "correctChoice": "A" | "B" | "C" | "D",
    "explanation": "string (Thai)",
    "chapter": "${req.chapterTitle}",
    "topic": "${req.topicTitle}",
    "difficulty": "easy" | "medium" | "hard",
    "source": {
      "file": "${req.documentFileName}",
      "pages": [number],
      "evidence": "exact quote or concept from text"
    }
  }
]
Rules:
1. Exactly 4 unique choices (A, B, C, D) per question.
2. Only ONE clear correct answer grounded strictly in the provided text.
3. No generic choices like "ถูกทุกข้อ" or "all of the above".
4. Questions must be written in professional Thai language.`;

  const userPrompt = `Generate ${req.count} questions for Subject: "${req.subjectName}", Chapter: "${req.chapterTitle}", Topic: "${req.topicTitle}".
Source Material:
${req.documentPages.map(p => `[Page ${p.pageNumber}]\n${p.text}`).join('\n\n')}`;

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      console.warn(`AI Provider returned status ${res.status}, falling back to mock provider.`);
      return generateMockQuestions(req);
    }

    const data = await res.json();
    const rawContent = data.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(rawContent);
    const rawArray = Array.isArray(parsed) ? parsed : (parsed.questions || []);

    const validatedQuestions: GeneratedQuestion[] = [];
    for (const item of rawArray) {
      const v = GeneratedQuestionSchema.safeParse(item);
      if (v.success) {
        validatedQuestions.push(v.data);
      }
    }

    if (validatedQuestions.length === 0) {
      return generateMockQuestions(req);
    }

    return {
      questions: validatedQuestions,
      modelUsed: model,
      tokensUsed: data.usage?.total_tokens || 1000,
      isMock: false,
    };
  } catch (error) {
    console.warn('AI provider call failed, using mock generator:', error);
    return generateMockQuestions(req);
  }
}
