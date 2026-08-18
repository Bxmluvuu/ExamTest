/**
 * Seeds the Internetworking (CCNP ENCOR) subject into Supabase:
 * - subject
 * - chapters (14 chapters)
 * - topics (59 topics)
 * - slide/past-exam documents (16 documents uploaded to storage & registered)
 * - extracted source pages (656 pages with full text & token counts)
 * - exam blueprints (Midterm Exam & Routing Protocols Deep Dive)
 * - question bank (197 questions + 788 choices + 197 answer keys + 197 source citations)
 *
 * Usage: node --env-file=.env.local scripts/seed-internetworking.mjs [--reset]
 */
import fs from 'fs';
import path from 'path';

const SUBJECT_DIR = path.resolve('content/subjects/internetworking');
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  console.error('Run with: node --env-file=.env.local scripts/seed-internetworking.mjs');
  process.exit(1);
}

const CHOICE_KEYS = ['A', 'B', 'C', 'D'];

async function rest(table, { method = 'GET', query = '', body, prefer } = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
    method,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: prefer ?? 'return=representation',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${method} ${table} failed (${res.status}): ${text.slice(0, 500)}`);
  }
  return text ? JSON.parse(text) : null;
}

/** Inserts rows in batches so large payloads do not hit request limits. */
async function insertAll(table, rows, batchSize = 100) {
  const inserted = [];
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const result = await rest(table, { method: 'POST', body: batch });
    if (result && Array.isArray(result)) {
      inserted.push(...result);
    }
  }
  return inserted;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function loadQuestions() {
  const dir = path.join(SUBJECT_DIR, 'questions');
  if (!fs.existsSync(dir)) {
    throw new Error(`Question bank directory not found: ${dir}`);
  }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
  const questions = [];
  for (const file of files) {
    const batch = readJson(path.join(dir, file));
    if (!Array.isArray(batch)) throw new Error(`${file} must contain a JSON array`);
    batch.forEach((q, index) => questions.push({ ...q, _origin: `${file}#${index + 1}` }));
  }
  return questions;
}

function validateQuestion(q) {
  const problems = [];
  if (!q.topic) problems.push('missing topic');
  if (!q.question || q.question.length < 10) problems.push('question stem too short');
  if (!Array.isArray(q.choices) || q.choices.length !== 4) problems.push('must have exactly 4 choices');
  else if (new Set(q.choices.map(c => c.trim().toLowerCase())).size !== 4) problems.push('duplicate choices');
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) problems.push('answer must be index 0-3');
  if (!q.explanation || q.explanation.length < 8) problems.push('explanation too short');
  if (!['easy', 'medium', 'hard'].includes(q.difficulty)) problems.push('invalid difficulty');
  if (!Array.isArray(q.pages) || q.pages.length === 0) problems.push('missing source pages');
  if (!q.evidence || q.evidence.length < 10) problems.push('evidence too short');
  return problems;
}

async function uploadStorageFile(bucket, storagePath, localFilePath) {
  const fileBuffer = fs.readFileSync(localFilePath);
  const encodedPath = storagePath.split('/').map(encodeURIComponent).join('/');
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${encodedPath}`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/pdf',
      'x-upsert': 'true',
    },
    body: fileBuffer,
  });
  if (!res.ok) {
    const text = await res.text();
    console.warn(`  ! Storage upload warning for ${storagePath} (${res.status}): ${text}`);
  }
}

async function resetSubject(slug) {
  const existing = await rest('subjects', { query: `?slug=eq.${slug}&select=id` });
  if (existing && existing.length > 0) {
    await rest('subjects', { method: 'DELETE', query: `?slug=eq.${slug}`, prefer: 'return=minimal' });
    console.log(`  ✓ Removed existing subject "${slug}" and all cascaded rows`);
    return true;
  }
  return false;
}

async function main() {
  const reset = process.argv.includes('--reset');
  const subjectMeta = readJson(path.join(SUBJECT_DIR, 'subject.json'));
  const blueprintFiles = fs
    .readdirSync(SUBJECT_DIR)
    .filter(f => f === 'blueprint.json' || f.startsWith('blueprint-'))
    .sort();

  console.log('========================================================================');
  console.log('  ExamPlatform — Internetworking (CCNP ENCOR) Database Seeding');
  console.log('========================================================================');

  const rawQuestions = loadQuestions();
  const invalid = rawQuestions.flatMap(q => {
    const problems = validateQuestion(q);
    return problems.length ? [`${q._origin}: ${problems.join(', ')}`] : [];
  });
  if (invalid.length > 0) {
    console.error(`\n✗ ${invalid.length} question(s) failed validation:`);
    invalid.slice(0, 20).forEach(line => console.error(`  - ${line}`));
    process.exit(1);
  }
  console.log(`\n[1/7] Validated ${rawQuestions.length} questions from content/subjects/internetworking/questions/`);

  if (reset) {
    await resetSubject(subjectMeta.slug);
  } else {
    const existing = await rest('subjects', { query: `?slug=eq.${subjectMeta.slug}&select=id` });
    if (existing && existing.length > 0) {
      console.log(`Subject "${subjectMeta.slug}" already exists. Re-seeding with reset...`);
      await resetSubject(subjectMeta.slug);
    }
  }

  // 1. Subject
  const [subject] = await insertAll('subjects', [
    {
      slug: subjectMeta.slug,
      name: subjectMeta.name,
      description: subjectMeta.description,
      language: subjectMeta.language,
      question_target: subjectMeta.questionTarget,
      icon: 'network',
    },
  ]);
  console.log(`[2/7] Inserted subject "${subject.name}" (${subject.id})`);

  // 2. Chapters
  const chapters = await insertAll(
    'chapters',
    subjectMeta.chapters.map(ch => ({
      subject_id: subject.id,
      sequence_order: ch.sequenceOrder,
      title: ch.title,
      description: ch.description,
    }))
  );
  const chapterByTitle = new Map(chapters.map(c => [c.title, c]));

  // 3. Topics
  const topicRows = [];
  for (const ch of subjectMeta.chapters) {
    const chapter = chapterByTitle.get(ch.title);
    for (const title of ch.topics) {
      topicRows.push({ chapter_id: chapter.id, title });
    }
  }
  const topics = await insertAll('topics', topicRows);
  const topicByTitle = new Map(topics.map(t => [t.title, t]));
  console.log(`[3/7] Inserted ${chapters.length} chapters and ${topics.length} topics`);

  // 4. Documents & Storage Upload & Page Extraction
  const slidesDir = path.join(SUBJECT_DIR, 'slides');
  const examsDir = path.join(SUBJECT_DIR, 'past-exams');
  const documentRows = [];
  const localFileMap = new Map(); // document temp key -> local file path

  console.log('[4/7] Uploading PDF documents to Supabase Storage and extracting pages...');

  for (const ch of subjectMeta.chapters) {
    const slideFile = ch.slideFile;
    if (!slideFile) continue;
    const filePath = path.join(slidesDir, slideFile);
    if (!fs.existsSync(filePath)) {
      console.warn(`  ! Slide missing on disk, skipped: ${slideFile}`);
      continue;
    }
    const storageFilePath = `internetworking/slides/${slideFile}`;
    await uploadStorageFile('source-documents', storageFilePath, filePath);

    const docRow = {
      subject_id: subject.id,
      chapter_id: chapterByTitle.get(ch.title).id,
      title: `Chapter ${ch.sequenceOrder}: ${ch.title}`,
      file_path: storageFilePath,
      document_type: 'slide',
      mime_type: 'application/pdf',
      file_size: fs.statSync(filePath).size,
      page_count: ch.pageCount ?? 0,
      ocr_status: 'ready',
      extraction_text_summary: ch.description || '',
      storage_bucket: 'source-documents',
    };
    documentRows.push(docRow);
    localFileMap.set(storageFilePath, filePath);
  }

  for (const extra of subjectMeta.extraDocuments ?? []) {
    const dir = extra.type === 'past_exam' ? examsDir : slidesDir;
    const filePath = path.join(dir, extra.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`  ! Document missing on disk, skipped: ${extra.file}`);
      continue;
    }
    const safeStorageName = extra.file.replace(/[^\x00-\x7F]/g, '_');
    const folder = extra.type === 'past_exam' ? 'past-exams' : 'slides';
    const storageFilePath = `internetworking/${folder}/${safeStorageName}`;
    await uploadStorageFile('source-documents', storageFilePath, filePath);

    const docRow = {
      subject_id: subject.id,
      chapter_id: null,
      title: extra.title,
      file_path: storageFilePath,
      document_type: extra.type,
      mime_type: 'application/pdf',
      file_size: fs.statSync(filePath).size,
      page_count: extra.pageCount ?? 0,
      ocr_status: 'ready',
      extraction_text_summary: extra.title,
      storage_bucket: 'source-documents',
    };
    documentRows.push(docRow);
    localFileMap.set(storageFilePath, filePath);
  }

  const documents = await insertAll('source_documents', documentRows);
  const documentByFileName = new Map();
  for (const doc of documents) {
    documentByFileName.set(path.basename(doc.file_path), doc);
  }
  for (const ch of subjectMeta.chapters) {
    if (ch.slideFile) {
      const doc = documents.find(d => d.chapter_id === chapterByTitle.get(ch.title)?.id);
      if (doc) documentByFileName.set(ch.slideFile, doc);
    }
  }

  console.log(`      Registered ${documents.length} source documents in database`);

  // Extract and insert pages
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const allPageRows = [];
  for (const doc of documents) {
    const localFile = localFileMap.get(doc.file_path);
    if (!localFile || !fs.existsSync(localFile) || fs.statSync(localFile).size === 0) continue;

    const data = new Uint8Array(fs.readFileSync(localFile));
    const pdf = await pdfjs.getDocument({ data, useSystemFonts: true, disableFontFace: true }).promise;

    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(i => ('str' in i ? i.str : '')).join(' ').replace(/\s+/g, ' ').trim();
      const tokenCount = Math.ceil(pageText.split(/\s+/).filter(Boolean).length * 1.3);

      allPageRows.push({
        document_id: doc.id,
        page_number: p,
        raw_text: pageText || '(Slide visual content)',
        token_count: tokenCount,
      });
    }
  }

  if (allPageRows.length > 0) {
    await insertAll('source_pages', allPageRows, 150);
    console.log(`      Extracted & inserted ${allPageRows.length} source pages`);
  }

  // 5. Blueprints
  const blueprints = await insertAll(
    'exam_blueprints',
    blueprintFiles.map(file => {
      const bp = readJson(path.join(SUBJECT_DIR, file));
      return {
        subject_id: subject.id,
        name: bp.name,
        slug: bp.slug,
        description: bp.description,
        question_count: bp.questionCount,
        duration_minutes: bp.durationMinutes,
        difficulty_distribution: bp.difficultyDistribution,
        topic_distribution: bp.topicDistribution,
        avoid_recent_question_count: bp.avoidRecentQuestionCount,
        is_active: true,
      };
    })
  );
  console.log(`[5/7] Inserted ${blueprints.length} exam blueprint(s)`);

  // 6. Questions
  const slideFileByChapter = new Map(
    subjectMeta.chapters.filter(ch => ch.slideFile).map(ch => [ch.title, ch.slideFile])
  );
  const chapterTitleByTopic = new Map();
  for (const ch of subjectMeta.chapters) {
    for (const title of ch.topics) chapterTitleByTopic.set(title, ch.title);
  }

  const questionRows = rawQuestions.map(q => {
    const chapterTitle = chapterTitleByTopic.get(q.topic);
    if (!chapterTitle) throw new Error(`${q._origin}: topic "${q.topic}" is not defined in subject.json`);
    return {
      subject_id: subject.id,
      chapter_id: chapterByTitle.get(chapterTitle).id,
      topic_id: topicByTitle.get(q.topic).id,
      question_text: q.question,
      question_type: 'single_choice',
      difficulty: q.difficulty,
      status: q.status ?? 'published',
      is_ai_generated: true,
    };
  });

  const questions = await insertAll('questions', questionRows, 100);

  // 7. Choices, Answer Keys, Sources
  const choiceRows = [];
  const answerKeyRows = [];
  const sourceRows = [];

  questions.forEach((row, index) => {
    const raw = rawQuestions[index];
    const chapterTitle = chapterTitleByTopic.get(raw.topic);
    const fileName = slideFileByChapter.get(chapterTitle);
    const document = fileName ? documentByFileName.get(fileName) : null;

    raw.choices.forEach((text, choiceIndex) => {
      choiceRows.push({
        question_id: row.id,
        choice_key: CHOICE_KEYS[choiceIndex],
        choice_text: text,
        sequence_order: choiceIndex + 1,
      });
    });

    answerKeyRows.push({
      question_id: row.id,
      correct_choice_key: CHOICE_KEYS[raw.answer],
      explanation: raw.explanation,
    });

    sourceRows.push({
      question_id: row.id,
      document_id: document?.id ?? null,
      file_name: fileName || '',
      page_numbers: raw.pages,
      evidence_text: raw.evidence,
    });
  });

  await insertAll('question_choices', choiceRows, 200);
  await insertAll('question_answer_keys', answerKeyRows, 200);
  await insertAll('question_sources', sourceRows, 200);

  const published = questions.filter(q => q.status === 'published').length;
  console.log(
    `[6/7] Inserted ${questions.length} questions (${published} published), ${choiceRows.length} choices, ${answerKeyRows.length} answer keys, ${sourceRows.length} citations`
  );

  console.log('[7/7] Database Seeding Completed Successfully! All data is live in Supabase PostgreSQL.');
  console.log('========================================================================\n');
}

main().catch(err => {
  console.error(`\n✗ Seeding failed: ${err.message}`);
  process.exit(1);
});
