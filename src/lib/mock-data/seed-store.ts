import type {
  Profile,
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
  // Profiles
  const studentUser: Profile = {
    id: 'u-student-001',
    email: 'student@example.com',
    full_name: 'สมชาย รักเรียน',
    role: 'student',
    created_at: '2026-08-01T08:00:00Z',
    updated_at: '2026-08-01T08:00:00Z',
  };

  const adminUser: Profile = {
    id: 'u-admin-001',
    email: 'admin@example.com',
    full_name: 'ดร. วิชาญ ผู้ดูแลระบบ',
    role: 'admin',
    created_at: '2026-08-01T08:00:00Z',
    updated_at: '2026-08-01T08:00:00Z',
  };

  // Subjects
  const subDb: Subject = {
    id: 'sub-db-001',
    slug: 'database-systems',
    name: 'Database Systems',
    description: 'หลักการและทฤษฎีระบบจัดการฐานข้อมูล แบบจำลองข้อมูลเชิงสัมพันธ์ ภาษา SQL และขั้นตอน Normalization',
    language: 'th',
    question_target: 500,
    created_at: '2026-08-01T09:00:00Z',
    updated_at: '2026-08-01T09:00:00Z',
  };

  const subNet: Subject = {
    id: 'sub-net-001',
    slug: 'computer-networks',
    name: 'Computer Networks',
    description: 'สถาปัตยกรรมเครือข่ายคอมพิวเตอร์ OSI Model, TCP/IP, IP Subnetting, Routing, DNS และ Network Security',
    language: 'th',
    question_target: 500,
    created_at: '2026-08-01T09:00:00Z',
    updated_at: '2026-08-01T09:00:00Z',
  };

  // Chapters & Topics for Database Systems
  const chDb1: Chapter = {
    id: 'ch-db-01',
    subject_id: subDb.id,
    sequence_order: 1,
    title: 'Introduction & Relational Model',
    description: 'โครงสร้างตาราง Primary Key, Foreign Key และ Integrity Constraints',
    created_at: '2026-08-01T09:30:00Z',
  };
  const chDb2: Chapter = {
    id: 'ch-db-02',
    subject_id: subDb.id,
    sequence_order: 2,
    title: 'SQL & Query Formulation',
    description: 'คำสั่ง SELECT, JOINs, Subqueries และ Aggregate Functions',
    created_at: '2026-08-01T09:30:00Z',
  };
  const chDb3: Chapter = {
    id: 'ch-db-03',
    subject_id: subDb.id,
    sequence_order: 3,
    title: 'Database Normalization',
    description: 'Functional Dependencies, 1NF, 2NF, 3NF และ BCNF',
    created_at: '2026-08-01T09:30:00Z',
  };

  const topDb1_1: Topic = { id: 'top-db-101', chapter_id: chDb1.id, title: 'Relational Model Concepts', created_at: '2026-08-01T09:35:00Z' };
  const topDb1_2: Topic = { id: 'top-db-102', chapter_id: chDb1.id, title: 'Primary & Foreign Keys', created_at: '2026-08-01T09:35:00Z' };
  const topDb2_1: Topic = { id: 'top-db-201', chapter_id: chDb2.id, title: 'INNER & OUTER JOINs', created_at: '2026-08-01T09:35:00Z' };
  const topDb2_2: Topic = { id: 'top-db-202', chapter_id: chDb2.id, title: 'GROUP BY & HAVING Clauses', created_at: '2026-08-01T09:35:00Z' };
  const topDb3_1: Topic = { id: 'top-db-301', chapter_id: chDb3.id, title: 'Functional Dependencies', created_at: '2026-08-01T09:35:00Z' };
  const topDb3_2: Topic = { id: 'top-db-302', chapter_id: chDb3.id, title: 'Third Normal Form (3NF)', created_at: '2026-08-01T09:35:00Z' };

  // Chapters & Topics for Computer Networks
  const chNet1: Chapter = {
    id: 'ch-net-01',
    subject_id: subNet.id,
    sequence_order: 1,
    title: 'Network Models & Physical/Data Link',
    description: 'OSI 7 Layers, TCP/IP Model, MAC Address, Ethernet',
    created_at: '2026-08-01T09:30:00Z',
  };
  const chNet2: Chapter = {
    id: 'ch-net-02',
    subject_id: subNet.id,
    sequence_order: 2,
    title: 'Network Layer & IP Addressing',
    description: 'IPv4 Subnetting, CIDR, NAT, Routing Protocols',
    created_at: '2026-08-01T09:30:00Z',
  };

  const topNet1_1: Topic = { id: 'top-net-101', chapter_id: chNet1.id, title: 'OSI vs TCP/IP Architecture', created_at: '2026-08-01T09:35:00Z' };
  const topNet2_1: Topic = { id: 'top-net-201', chapter_id: chNet2.id, title: 'IPv4 Structure & Subnetting', created_at: '2026-08-01T09:35:00Z' };

  // Source Documents
  const docDbSlide1: SourceDocument = {
    id: 'doc-db-01',
    subject_id: subDb.id,
    chapter_id: chDb1.id,
    title: 'Chapter 01 - Relational Model & Schema.pdf',
    file_path: 'content/subjects/database-systems/slides/chapter-01.pdf',
    document_type: 'slide',
    mime_type: 'application/pdf',
    file_size: 45000,
    page_count: 4,
    ocr_status: 'ready',
    extraction_text_summary: 'Slide เอกสารบรรยาย Relational model concepts, keys, and integrity constraints.',
    storage_bucket: 'source-documents',
    created_at: '2026-08-02T10:00:00Z',
  };

  const docDbSlide2: SourceDocument = {
    id: 'doc-db-02',
    subject_id: subDb.id,
    chapter_id: chDb2.id,
    title: 'Chapter 02 - SQL Queries & Joins.pdf',
    file_path: 'content/subjects/database-systems/slides/chapter-02.pdf',
    document_type: 'slide',
    mime_type: 'application/pdf',
    file_size: 52000,
    page_count: 4,
    ocr_status: 'ready',
    extraction_text_summary: 'Slide เอกสารบรรยาย SQL DDL/DML, JOIN operations, grouping, and subqueries.',
    storage_bucket: 'source-documents',
    created_at: '2026-08-02T10:00:00Z',
  };

  const docDbSlide3: SourceDocument = {
    id: 'doc-db-03',
    subject_id: subDb.id,
    chapter_id: chDb3.id,
    title: 'Chapter 03 - Normalization.pdf',
    file_path: 'content/subjects/database-systems/slides/chapter-03.pdf',
    document_type: 'slide',
    mime_type: 'application/pdf',
    file_size: 58000,
    page_count: 5,
    ocr_status: 'ready',
    extraction_text_summary: 'Slide เอกสารบรรยาย Normalization 1NF, 2NF, 3NF, BCNF and anomalies.',
    storage_bucket: 'source-documents',
    created_at: '2026-08-02T10:00:00Z',
  };

  const docDbExam: SourceDocument = {
    id: 'doc-db-04',
    subject_id: subDb.id,
    title: 'Database Midterm Exam 2025 Past Paper.pdf',
    file_path: 'content/subjects/database-systems/past-exams/midterm-2025.pdf',
    document_type: 'past_exam',
    mime_type: 'application/pdf',
    file_size: 32000,
    page_count: 2,
    ocr_status: 'ready',
    extraction_text_summary: 'ข้อสอบเก่ากลางภาควิชา Database Systems ปีการศึกษา 2025',
    storage_bucket: 'source-documents',
    created_at: '2026-08-02T10:00:00Z',
  };

  // Exam Blueprints
  const bpDb: ExamBlueprint = {
    id: 'bp-db-01',
    subject_id: subDb.id,
    name: 'Database Systems Standard Midterm Exam',
    slug: 'db-midterm-blueprint',
    description: 'แบบทดสอบจำลองสอบกลางภาค ครอบคลุม Relational Model, SQL และ Normalization',
    question_count: 10,
    duration_minutes: 20,
    difficulty_distribution: { easy: 0.2, medium: 0.6, hard: 0.2 },
    topic_distribution: [
      { topic: 'Relational Model Concepts', weight: 0.2 },
      { topic: 'Primary & Foreign Keys', weight: 0.2 },
      { topic: 'INNER & OUTER JOINs', weight: 0.2 },
      { topic: 'GROUP BY & HAVING Clauses', weight: 0.2 },
      { topic: 'Third Normal Form (3NF)', weight: 0.2 },
    ],
    avoid_recent_question_count: 20,
    is_active: true,
    created_at: '2026-08-02T11:00:00Z',
  };

  const bpNet: ExamBlueprint = {
    id: 'bp-net-01',
    subject_id: subNet.id,
    name: 'Computer Networks Comprehensive Exam',
    slug: 'cn-comprehensive-blueprint',
    description: 'แบบทดสอบวัดผลรวมวิชาเครือข่ายคอมพิวเตอร์',
    question_count: 10,
    duration_minutes: 20,
    difficulty_distribution: { easy: 0.3, medium: 0.5, hard: 0.2 },
    topic_distribution: [
      { topic: 'OSI vs TCP/IP Architecture', weight: 0.5 },
      { topic: 'IPv4 Structure & Subnetting', weight: 0.5 },
    ],
    avoid_recent_question_count: 15,
    is_active: true,
    created_at: '2026-08-02T11:00:00Z',
  };

  // Questions Database
  const rawQuestionsData = [
    {
      id: 'q-db-001',
      subject_id: subDb.id,
      chapter_id: chDb1.id,
      topic_id: topDb1_1.id,
      chapter_title: chDb1.title,
      topic_title: topDb1_1.title,
      question_text: 'ในทฤษฎีแบบจำลองเชิงสัมพันธ์ (Relational Model) ค่าของแอตทริบิวต์ (Attribute Value) แต่ละช่องต้องมีคุณสมบัติ Atomic หมายถึงข้อใด',
      difficulty: 'easy' as const,
      status: 'published' as const,
      choices: [
        { key: 'A' as const, text: 'ค่าของข้อมูลต้องเป็นจำนวนเต็มเท่านั้น' },
        { key: 'B' as const, text: 'ค่าของข้อมูลต้องไม่สามารถแยกย่อยเป็นหน่วยย่อยที่มีความหมายได้อีก และไม่ใช่เซตของค่าหลายค่า' },
        { key: 'C' as const, text: 'ค่าของข้อมูลต้องไม่ซ้ำกับข้อมูลในแถวอื่นภายในตาราง' },
        { key: 'D' as const, text: 'ค่าของข้อมูลต้องถูกเข้ารหัสแบบไม่สามารถย้อนกลับได้' },
      ],
      correctChoice: 'B' as const,
      explanation: 'ความเป็น Atomic ตามกฎของ Relational Model หมายถึงข้อมูลในแต่ละเซลล์ต้องเป็น Single-valued ไม่สามารถแบ่งย่อยเป็นค่าหลายค่าหรือ Multi-valued ได้',
      source: { file_name: 'chapter-01.pdf', pages: [1, 2], evidence: 'Relational Model requires attributes to be atomic single values without repeating groups.' },
    },
    {
      id: 'q-db-002',
      subject_id: subDb.id,
      chapter_id: chDb1.id,
      topic_id: topDb1_2.id,
      chapter_title: chDb1.title,
      topic_title: topDb1_2.title,
      question_text: 'ข้อใดอธิบายกฎความสมบูรณ์ของการอ้างอิง (Referential Integrity Constraint) ได้ถูกต้องที่สุด',
      difficulty: 'medium' as const,
      status: 'published' as const,
      choices: [
        { key: 'A' as const, text: 'Primary Key ในตารางหลักต้องไม่มีค่าเป็น NULL' },
        { key: 'B' as const, text: 'Foreign Key ต้องมีค่าตรงกับ Primary Key ในตารางที่อ้างอิงถึง หรือต้องมีค่าเป็น NULL หากอนุญาต' },
        { key: 'C' as const, text: 'ตารางที่มี Foreign Key จะไม่สามารถทำคำสั่ง DROP TABLE ได้ในทุกกรณี' },
        { key: 'D' as const, text: 'ข้อมูลใน Foreign Key ต้องถูกสร้างขึ้นก่อน Primary Key ในตารางต้นทางเสมอ' },
      ],
      correctChoice: 'B' as const,
      explanation: 'Referential Integrity กำหนดว่าค่าของ Foreign Key ในตารางลูกต้องมีค่าตรงกับ Primary Key ในตารางแม่ หรือเป็น NULL เท่านั้น เพื่อป้องกัน Dangling References',
      source: { file_name: 'chapter-01.pdf', pages: [3], evidence: 'Foreign Key references the primary key of another table to maintain Referential Integrity.' },
    },
    {
      id: 'q-db-003',
      subject_id: subDb.id,
      chapter_id: chDb2.id,
      topic_id: topDb2_1.id,
      chapter_title: chDb2.title,
      topic_title: topDb2_1.title,
      question_text: 'หากต้องการค้นหารายชื่อลูกค้าทั้งหมด (Customers) พร้อมรายการคำสั่งซื้อ (Orders) โดยลูกค้าที่ยังไม่เคยสั่งซื้อเลยต้องแสดงชื่อด้วย ต้องใช้คำสั่ง SQL JOIN ประเภทใด',
      difficulty: 'medium' as const,
      status: 'published' as const,
      choices: [
        { key: 'A' as const, text: 'INNER JOIN ระหว่าง Customers กับ Orders' },
        { key: 'B' as const, text: 'CROSS JOIN ระหว่าง Customers กับ Orders' },
        { key: 'C' as const, text: 'LEFT OUTER JOIN จาก Customers ไปยัง Orders' },
        { key: 'D' as const, text: 'RIGHT OUTER JOIN จาก Customers ไปยัง Orders' },
      ],
      correctChoice: 'C' as const,
      explanation: 'LEFT OUTER JOIN จะคงแถวข้อมูลทั้งหมดจากตารางด้านซ้าย (Customers) ไว้ และนำข้อมูลตารางด้านขวา (Orders) ที่ตรงเงื่อนไขมาประกบ หากไม่มีจะแสดงเป็นค่า NULL',
      source: { file_name: 'chapter-02.pdf', pages: [2, 3], evidence: 'LEFT OUTER JOIN preserves all rows from the left table with NULLs for unmatched right rows.' },
    },
    {
      id: 'q-db-004',
      subject_id: subDb.id,
      chapter_id: chDb2.id,
      topic_id: topDb2_2.id,
      chapter_title: chDb2.title,
      topic_title: topDb2_2.title,
      question_text: 'ในคำสั่ง SQL การใช้ HAVING แตกต่างจากการใช้ WHERE อย่างไร',
      difficulty: 'medium' as const,
      status: 'published' as const,
      choices: [
        { key: 'A' as const, text: 'WHERE ใช้กรองผลลัพธ์ของ Aggregate Functions ส่วน HAVING ใช้กรองแถวเดี่ยว' },
        { key: 'B' as const, text: 'WHERE กรองแถวข้อมูลก่อนการจัดกลุ่ม (GROUP BY) ส่วน HAVING กรองกลุ่มข้อมูลหลังผ่านการคำนวณ Aggregate แล้ว' },
        { key: 'C' as const, text: 'HAVING ใช้ได้เฉพาะกับตารางที่มี Primary Key เป็น Composite Key เท่านั้น' },
        { key: 'D' as const, text: 'ทั้งสองคำสั่งสามารถใช้สลับตำแหน่งและทำงานได้เหมือนกันทุกประการ' },
      ],
      correctChoice: 'B' as const,
      explanation: 'WHERE ประมวลผลกรองแต่ละ Tuple ก่อน Aggregate ขณะที่ HAVING ประมวลผลบน Group หลังจากจัดกลุ่มด้วย GROUP BY แล้ว',
      source: { file_name: 'chapter-02.pdf', pages: [4], evidence: 'GROUP BY aggregates rows by specified columns and HAVING filters grouped results.' },
    },
    {
      id: 'q-db-005',
      subject_id: subDb.id,
      chapter_id: chDb3.id,
      topic_id: topDb3_1.id,
      chapter_title: chDb3.title,
      topic_title: topDb3_1.title,
      question_text: 'กำหนด Functional Dependency: StudentID -> {Name, Faculty} และ Faculty -> Dean ข้อใดอธิบายความสัมพันธ์แบบ Transitive Dependency ได้ถูกต้อง',
      difficulty: 'medium' as const,
      status: 'published' as const,
      choices: [
        { key: 'A' as const, text: 'StudentID ส่งผลโดยตรงต่อ Dean โดยไม่ผ่าน Faculty' },
        { key: 'B' as const, text: 'Dean เป็นตัวกำหนดค่า StudentID แบบย้อนกลับ' },
        { key: 'C' as const, text: 'StudentID กำหนดค่า Dean ผ่านทาง Faculty (StudentID -> Faculty -> Dean) ซึ่งเป็น Transitive Dependency' },
        { key: 'D' as const, text: 'ความสัมพันธ์นี้อยู่ในรูปแบบ BCNF แล้วจึงไม่มี Transitive Dependency' },
      ],
      correctChoice: 'C' as const,
      explanation: 'Transitive Dependency เกิดขึ้นเมื่อ X -> Y และ Y -> Z โดยที่ Y ไม่ได้เป็น Candidate Key ทำให้เกิด X -> Z ทางอ้อม',
      source: { file_name: 'chapter-03.pdf', pages: [1, 2], evidence: 'Transitive functional dependencies occur when X -> Y -> Z without superkey property.' },
    },
    {
      id: 'q-db-006',
      subject_id: subDb.id,
      chapter_id: chDb3.id,
      topic_id: topDb3_2.id,
      chapter_title: chDb3.title,
      topic_title: topDb3_2.title,
      question_text: 'ตารางจะอยู่ในระดับ Third Normal Form (3NF) ได้ ต้องผ่านเงื่อนไขใด',
      difficulty: 'hard' as const,
      status: 'published' as const,
      choices: [
        { key: 'A' as const, text: 'ต้องอยู่ใน 1NF และทุกแอตทริบิวต์ต้องขึ้นกับส่วนใดส่วนหนึ่งของ Composite Key' },
        { key: 'B' as const, text: 'ต้องอยู่ใน 2NF และต้องไม่มี Transitive Dependency ระหว่าง Non-prime Attributes' },
        { key: 'C' as const, text: 'ต้องไม่มี Foreign Key ภายในตารางเลย' },
        { key: 'D' as const, text: 'ต้องมีเพียงคอลัมน์เดียวที่เป็นประเภทข้อความ' },
      ],
      correctChoice: 'B' as const,
      explanation: '3NF ต้องการให้ตารางผ่าน 2NF ก่อน และห้ามมี Non-prime Attribute ใดขึ้นต่อ Non-prime Attribute อื่น (ไม่มี Transitive Dependency)',
      source: { file_name: 'chapter-03.pdf', pages: [4], evidence: 'Third Normal Form 3NF requires 2NF and no transitive functional dependencies.' },
    },
    {
      id: 'q-db-007',
      subject_id: subDb.id,
      chapter_id: chDb1.id,
      topic_id: topDb1_1.id,
      chapter_title: chDb1.title,
      topic_title: topDb1_1.title,
      question_text: 'ข้อใดคือข้อดีหลักของการใช้ระบบจัดการฐานข้อมูล (DBMS) เมื่อเทียบกับระบบไฟล์ (File System)',
      difficulty: 'easy' as const,
      status: 'published' as const,
      choices: [
        { key: 'A' as const, text: 'ใช้พื้นที่จัดเก็บฮาร์ดดิสก์น้อยกว่าเสมอ' },
        { key: 'B' as const, text: 'ลดความซ้ำซ้อนของข้อมูล ควบคุมความสอดคล้อง และจัดการ Concurrent Access ได้อย่างปลอดภัย' },
        { key: 'C' as const, text: 'ไม่ต้องมีระบบสำรองข้อมูล (Backup) อีกต่อไป' },
        { key: 'D' as const, text: 'ไม่จำเป็นต้องกำหนด Schema ก่อนการบันทึกข้อมูล' },
      ],
      correctChoice: 'B' as const,
      explanation: 'DBMS มีจุดเด่นด้าน Data Independence, ควบคุม Concurrency, ป้องกัน Redundancy และรักษา Integrity',
      source: { file_name: 'chapter-01.pdf', pages: [1], evidence: 'Database systems enforce domain consistency, reduce redundancy, and manage concurrency.' },
    },
    {
      id: 'q-db-008',
      subject_id: subDb.id,
      chapter_id: chDb2.id,
      topic_id: topDb2_1.id,
      chapter_title: chDb2.title,
      topic_title: topDb2_1.title,
      question_text: 'คำสั่ง SQL ใดใช้สำหรับลบโครงสร้างตารางและข้อมูลทั้งหมดทิ้งอย่างถาวร',
      difficulty: 'easy' as const,
      status: 'published' as const,
      choices: [
        { key: 'A' as const, text: 'DELETE TABLE table_name;' },
        { key: 'B' as const, text: 'DROP TABLE table_name;' },
        { key: 'C' as const, text: 'REMOVE TABLE table_name;' },
        { key: 'D' as const, text: 'TRUNCATE SCHEMA table_name;' },
      ],
      correctChoice: 'B' as const,
      explanation: 'DROP TABLE เป็นคำสั่ง DDL ที่ลบทั้ง Schema Definition และ Data ทั้งหมดของตารางออกจากฐานข้อมูล',
      source: { file_name: 'chapter-02.pdf', pages: [1], evidence: 'Chapter 2: SQL DDL operations include CREATE, ALTER, and DROP table definitions.' },
    },
    {
      id: 'q-db-009',
      subject_id: subDb.id,
      chapter_id: chDb3.id,
      topic_id: topDb3_2.id,
      chapter_title: chDb3.title,
      topic_title: topDb3_2.title,
      question_text: 'Boyce-Codd Normal Form (BCNF) มีความเข้มงวดกว่า 3NF ในแง่มุมใด',
      difficulty: 'hard' as const,
      status: 'published' as const,
      choices: [
        { key: 'A' as const, text: 'BCNF ห้ามไม่ให้มีตารางที่มีแถวเกิน 1,000 แถว' },
        { key: 'B' as const, text: 'ทุก Functional Dependency X -> Y ค่า X ต้องเป็น Superkey เสมอ โดยไม่มีข้อยกเว้นเรื่อง Prime Attribute' },
        { key: 'C' as const, text: 'BCNF บังคับให้ตารางต้องมี Foreign Key อย่างน้อยสองตัว' },
        { key: 'D' as const, text: 'BCNF ไม่รองรับข้อมูลชนิด Numeric' },
      ],
      correctChoice: 'B' as const,
      explanation: 'ใน 3NF อนุญาตให้ Y เป็น Prime Attribute ได้แม้ X ไม่ใช่ Superkey แต่ BCNF บังคับเด็ดขาดว่าทุก Left-hand side determinant ต้องเป็น Superkey',
      source: { file_name: 'chapter-03.pdf', pages: [5], evidence: 'BCNF requires that for every functional dependency X -> A, X must be a superkey.' },
    },
    {
      id: 'q-db-010',
      subject_id: subDb.id,
      chapter_id: chDb2.id,
      topic_id: topDb2_2.id,
      chapter_title: chDb2.title,
      topic_title: topDb2_2.title,
      question_text: 'ผลลัพธ์ของคำสั่ง SELECT COUNT(*), COUNT(bonus) FROM Employees จะต่างกันเมื่อใด',
      difficulty: 'medium' as const,
      status: 'published' as const,
      choices: [
        { key: 'A' as const, text: 'เมื่อตารางมีจำนวนพนักงานเกิน 100 คน' },
        { key: 'B' as const, text: 'เมื่อมีพนักงานบางคนได้รับค่า bonus เป็น 0' },
        { key: 'C' as const, text: 'เมื่อมีพนักงานบางคนมีค่า bonus เป็น NULL (เนื่องจาก COUNT(column) จะไม่นับค่า NULL)' },
        { key: 'D' as const, text: 'ทั้งสองคำสั่งจะให้ผลลัพธ์เท่ากันเสมอทุกกรณี' },
      ],
      correctChoice: 'C' as const,
      explanation: 'COUNT(*) นับจำนวนแถวทั้งหมดในตารางรวม NULL ขณะที่ COUNT(column_name) จะนับเฉพาะแถวที่ column นั้นมีค่า NOT NULL เท่านั้น',
      source: { file_name: 'chapter-02.pdf', pages: [3], evidence: 'Aggregate functions ignore NULL values except COUNT(*) which tallies total tuples.' },
    },
    // Draft & Needs Review Questions for Admin demo
    {
      id: 'q-db-draft-001',
      subject_id: subDb.id,
      chapter_id: chDb3.id,
      topic_id: topDb3_1.id,
      chapter_title: chDb3.title,
      topic_title: topDb3_1.title,
      question_text: '[AI Draft] ในการตรวจสอบ Functional Dependency ข้อใดคือ Armstrong’s Axioms กฎการสะท้อน (Reflexivity Rule)',
      difficulty: 'hard' as const,
      status: 'draft' as const,
      choices: [
        { key: 'A' as const, text: 'หาก Y เป็นสับเซตของ X แล้ว X -> Y จะเป็นจริงเสมอ' },
        { key: 'B' as const, text: 'หาก X -> Y แล้ว XZ -> YZ' },
        { key: 'C' as const, text: 'หาก X -> Y และ Y -> Z แล้ว X -> Z' },
        { key: 'D' as const, text: 'หาก X -> Y และ X -> Z แล้ว X -> YZ' },
      ],
      correctChoice: 'A' as const,
      explanation: 'Reflexivity Rule ระบุว่า If Y is a subset of X, then X -> Y',
      source: { file_name: 'chapter-03.pdf', pages: [1], evidence: 'Armstrong axioms: reflexivity, augmentation, transitivity.' },
    },
    {
      id: 'q-db-review-001',
      subject_id: subDb.id,
      chapter_id: chDb1.id,
      topic_id: topDb1_2.id,
      chapter_title: chDb1.title,
      topic_title: topDb1_2.title,
      question_text: '[Needs Review] การกำหนด ON DELETE CASCADE ใน Foreign Key มีผลต่อการทำงานอย่างไร',
      difficulty: 'medium' as const,
      status: 'needs_review' as const,
      choices: [
        { key: 'A' as const, text: 'ไม่อนุญาตให้ลบข้อมูลในตารางหลัก' },
        { key: 'B' as const, text: 'เมื่อแถวในตารางหลักถูกลบ แถวที่อ้างอิงในตารางลูกจะถูกลบตามโดยอัตโนมัติ' },
        { key: 'C' as const, text: 'เปลี่ยนค่า Foreign Key ในตารางลูกเป็น NULL' },
        { key: 'D' as const, text: 'สำเนาข้อมูลที่ถูกลบไปยังตาราง Backup' },
      ],
      correctChoice: 'B' as const,
      explanation: 'CASCADE จะส่งต่อการลบจาก Parent row ไปยัง Child rows ทั้งหมด',
      source: { file_name: 'chapter-01.pdf', pages: [3], evidence: 'ON DELETE CASCADE propagates parent deletion to dependent children rows.' },
    },
    // Computer Networks Questions
    {
      id: 'q-net-001',
      subject_id: subNet.id,
      chapter_id: chNet1.id,
      topic_id: topNet1_1.id,
      chapter_title: chNet1.title,
      topic_title: topNet1_1.title,
      question_text: 'ในแบบจำลอง OSI 7 เลเยอร์ เลเยอร์ใดทำหน้าที่รับผิดชอบการกำหนดเส้นทาง (Routing) และ Logical Addressing',
      difficulty: 'easy' as const,
      status: 'published' as const,
      choices: [
        { key: 'A' as const, text: 'Data Link Layer (Layer 2)' },
        { key: 'B' as const, text: 'Network Layer (Layer 3)' },
        { key: 'C' as const, text: 'Transport Layer (Layer 4)' },
        { key: 'D' as const, text: 'Session Layer (Layer 5)' },
      ],
      correctChoice: 'B' as const,
      explanation: 'Network Layer (Layer 3) ดูแล IP Addressing และการส่งต่อแพ็กเก็ตข้ามเครือข่ายด้วยเราเตอร์',
      source: { file_name: 'chapter-01.pdf', pages: [1, 2], evidence: 'Network Layer uses IP addressing to route packets end-to-end.' },
    },
    {
      id: 'q-net-002',
      subject_id: subNet.id,
      chapter_id: chNet2.id,
      topic_id: topNet2_1.id,
      chapter_title: chNet2.title,
      topic_title: topNet2_1.title,
      question_text: 'หมายเลข IP 192.168.1.0/26 มีจำนวน Usable Host Addresses (โฮสต์ที่สามารถใช้งานได้จริง) เท่าใดต่อ Subnet',
      difficulty: 'hard' as const,
      status: 'published' as const,
      choices: [
        { key: 'A' as const, text: '30 หมายเลข' },
        { key: 'B' as const, text: '62 หมายเลข (2^6 - 2)' },
        { key: 'C' as const, text: '64 หมายเลข' },
        { key: 'D' as const, text: '126 หมายเลข' },
      ],
      correctChoice: 'B' as const,
      explanation: 'Prefix /26 มี Host bits = 32 - 26 = 6 bits ทำให้ได้โฮสต์ทั้งหมด 2^6 = 64 หัก Network ID และ Broadcast ID ออก 2 หมายเลข เหลือ 62 Usable Hosts',
      source: { file_name: 'final-2025.pdf', pages: [1], evidence: 'Subnetting with /26 yields 6 host bits, total 62 usable IPs per subnet.' },
    },
  ];

  const questions: Question[] = [];
  const question_choices: QuestionChoice[] = [];
  const question_answer_keys: QuestionAnswerKey[] = [];
  const question_sources: QuestionSource[] = [];
  const question_quality_flags: QuestionQualityFlag[] = [];

  for (const raw of rawQuestionsData) {
    const q: Question = {
      id: raw.id,
      subject_id: raw.subject_id,
      chapter_id: raw.chapter_id,
      topic_id: raw.topic_id,
      question_text: raw.question_text,
      question_type: 'single_choice',
      difficulty: raw.difficulty,
      status: raw.status,
      is_ai_generated: raw.id.includes('draft'),
      created_at: '2026-08-05T12:00:00Z',
      updated_at: '2026-08-05T12:00:00Z',
      chapter_title: raw.chapter_title,
      topic_title: raw.topic_title,
      choices: raw.choices.map((c, idx) => ({
        id: `c-${raw.id}-${c.key}`,
        question_id: raw.id,
        choice_key: c.key,
        choice_text: c.text,
        sequence_order: idx + 1,
      })),
      source: {
        id: `src-${raw.id}`,
        question_id: raw.id,
        file_name: raw.source.file_name,
        page_numbers: raw.source.pages,
        evidence_text: raw.source.evidence,
      },
    };

    questions.push(q);

    for (const c of q.choices || []) {
      question_choices.push(c);
    }

    question_answer_keys.push({
      id: `ak-${raw.id}`,
      question_id: raw.id,
      correct_choice_key: raw.correctChoice,
      explanation: raw.explanation,
    });

    if (q.source) {
      question_sources.push(q.source);
    }

    if (raw.id === 'q-db-review-001') {
      question_quality_flags.push({
        id: 'flg-01',
        question_id: raw.id,
        flag_type: 'needs_human_verification',
        severity: 'low',
        description: 'Question drafted by AI requiring instructor verification before publish',
        is_resolved: false,
        created_at: '2026-08-05T12:30:00Z',
      });
    }
  }

  // Pre-seeded Completed Exam Attempt for Student
  const attempt1: ExamAttempt = {
    id: 'att-demo-001',
    user_id: studentUser.id,
    subject_id: subDb.id,
    blueprint_id: bpDb.id,
    mode: 'exam',
    total_questions: 6,
    duration_minutes: 20,
    time_spent_seconds: 480,
    started_at: '2026-08-10T14:00:00Z',
    completed_at: '2026-08-10T14:08:00Z',
    status: 'submitted',
    score_total: 5,
    score_max: 6,
    score_percentage: 83.33,
    is_graded: true,
    subject_name: subDb.name,
    blueprint_name: bpDb.name,
  };

  const attempt1_questions: AttemptQuestion[] = [
    {
      id: 'attq-01',
      attempt_id: attempt1.id,
      question_id: 'q-db-001',
      sequence_order: 1,
      shuffled_choices: [
        { key: 'A', text: 'ค่าของข้อมูลต้องเป็นจำนวนเต็มเท่านั้น' },
        { key: 'B', text: 'ค่าของข้อมูลต้องไม่สามารถแยกย่อยเป็นหน่วยย่อยที่มีความหมายได้อีก และไม่ใช่เซตของค่าหลายค่า' },
        { key: 'C', text: 'ค่าของข้อมูลต้องไม่ซ้ำกับข้อมูลในแถวอื่นภายในตาราง' },
        { key: 'D', text: 'ค่าของข้อมูลต้องถูกเข้ารหัสแบบไม่สามารถย้อนกลับได้' },
      ],
      question_snapshot: {
        text: questions[0].question_text,
        difficulty: questions[0].difficulty,
        chapter_title: chDb1.title,
        topic_title: topDb1_1.title,
        question_type: 'single_choice',
      },
      selected_choice_key: 'B',
      is_correct: true,
      correct_choice_key: 'B',
      explanation: questions[0].source?.evidence_text || '',
    },
    {
      id: 'attq-02',
      attempt_id: attempt1.id,
      question_id: 'q-db-002',
      sequence_order: 2,
      shuffled_choices: [
        { key: 'A', text: 'Primary Key ในตารางหลักต้องไม่มีค่าเป็น NULL' },
        { key: 'B', text: 'Foreign Key ต้องมีค่าตรงกับ Primary Key ในตารางที่อ้างอิงถึง หรือต้องมีค่าเป็น NULL หากอนุญาต' },
        { key: 'C', text: 'ตารางที่มี Foreign Key จะไม่สามารถทำคำสั่ง DROP TABLE ได้ในทุกกรณี' },
        { key: 'D', text: 'ข้อมูลใน Foreign Key ต้องถูกสร้างขึ้นก่อน Primary Key ในตารางต้นทางเสมอ' },
      ],
      question_snapshot: {
        text: questions[1].question_text,
        difficulty: questions[1].difficulty,
        chapter_title: chDb1.title,
        topic_title: topDb1_2.title,
        question_type: 'single_choice',
      },
      selected_choice_key: 'B',
      is_correct: true,
      correct_choice_key: 'B',
      explanation: 'Referential Integrity Constraint requires valid foreign key mapping.',
    },
    {
      id: 'attq-03',
      attempt_id: attempt1.id,
      question_id: 'q-db-003',
      sequence_order: 3,
      shuffled_choices: [
        { key: 'A', text: 'INNER JOIN ระหว่าง Customers กับ Orders' },
        { key: 'B', text: 'CROSS JOIN ระหว่าง Customers กับ Orders' },
        { key: 'C', text: 'LEFT OUTER JOIN จาก Customers ไปยัง Orders' },
        { key: 'D', text: 'RIGHT OUTER JOIN จาก Customers ไปยัง Orders' },
      ],
      question_snapshot: {
        text: questions[2].question_text,
        difficulty: questions[2].difficulty,
        chapter_title: chDb2.title,
        topic_title: topDb2_1.title,
        question_type: 'single_choice',
      },
      selected_choice_key: 'C',
      is_correct: true,
      correct_choice_key: 'C',
      explanation: 'LEFT OUTER JOIN preserves unmatched left records.',
    },
    {
      id: 'attq-04',
      attempt_id: attempt1.id,
      question_id: 'q-db-004',
      sequence_order: 4,
      shuffled_choices: [
        { key: 'A', text: 'WHERE ใช้กรองผลลัพธ์ของ Aggregate Functions ส่วน HAVING ใช้กรองแถวเดี่ยว' },
        { key: 'B', text: 'WHERE กรองแถวข้อมูลก่อนการจัดกลุ่ม (GROUP BY) ส่วน HAVING กรองกลุ่มข้อมูลหลังผ่านการคำนวณ Aggregate แล้ว' },
        { key: 'C', text: 'HAVING ใช้ได้เฉพาะกับตารางที่มี Primary Key เป็น Composite Key เท่านั้น' },
        { key: 'D', text: 'ทั้งสองคำสั่งสามารถใช้สลับตำแหน่งและทำงานได้เหมือนกันทุกประการ' },
      ],
      question_snapshot: {
        text: questions[3].question_text,
        difficulty: questions[3].difficulty,
        chapter_title: chDb2.title,
        topic_title: topDb2_2.title,
        question_type: 'single_choice',
      },
      selected_choice_key: 'B',
      is_correct: true,
      correct_choice_key: 'B',
      explanation: 'WHERE filters rows before grouping, HAVING filters aggregated groups.',
    },
    {
      id: 'attq-05',
      attempt_id: attempt1.id,
      question_id: 'q-db-005',
      sequence_order: 5,
      shuffled_choices: [
        { key: 'A', text: 'StudentID ส่งผลโดยตรงต่อ Dean โดยไม่ผ่าน Faculty' },
        { key: 'B', text: 'Dean เป็นตัวกำหนดค่า StudentID แบบย้อนกลับ' },
        { key: 'C', text: 'StudentID กำหนดค่า Dean ผ่านทาง Faculty (StudentID -> Faculty -> Dean) ซึ่งเป็น Transitive Dependency' },
        { key: 'D', text: 'ความสัมพันธ์นี้อยู่ในรูปแบบ BCNF แล้วจึงไม่มี Transitive Dependency' },
      ],
      question_snapshot: {
        text: questions[4].question_text,
        difficulty: questions[4].difficulty,
        chapter_title: chDb3.title,
        topic_title: topDb3_1.title,
        question_type: 'single_choice',
      },
      selected_choice_key: 'A', // intentional wrong answer for testing
      is_correct: false,
      correct_choice_key: 'C',
      explanation: 'Transitive dependency arises because StudentID -> Faculty and Faculty -> Dean.',
    },
    {
      id: 'attq-06',
      attempt_id: attempt1.id,
      question_id: 'q-db-006',
      sequence_order: 6,
      shuffled_choices: [
        { key: 'A', text: 'ต้องอยู่ใน 1NF และทุกแอตทริบิวต์ต้องขึ้นกับส่วนใดส่วนหนึ่งของ Composite Key' },
        { key: 'B', text: 'ต้องอยู่ใน 2NF และต้องไม่มี Transitive Dependency ระหว่าง Non-prime Attributes' },
        { key: 'C', text: 'ต้องไม่มี Foreign Key ภายในตารางเลย' },
        { key: 'D', text: 'ต้องมีเพียงคอลัมน์เดียวที่เป็นประเภทข้อความ' },
      ],
      question_snapshot: {
        text: questions[5].question_text,
        difficulty: questions[5].difficulty,
        chapter_title: chDb3.title,
        topic_title: topDb3_2.title,
        question_type: 'single_choice',
      },
      selected_choice_key: 'B',
      is_correct: true,
      correct_choice_key: 'B',
      explanation: '3NF removes transitive dependencies.',
    },
  ];

  const attempt1_answers: AttemptAnswer[] = [
    { id: 'ans-01', attempt_id: attempt1.id, question_id: 'q-db-001', selected_choice_key: 'B', is_correct: true, answered_at: '2026-08-10T14:01:00Z', response_time_seconds: 45 },
    { id: 'ans-02', attempt_id: attempt1.id, question_id: 'q-db-002', selected_choice_key: 'B', is_correct: true, answered_at: '2026-08-10T14:02:00Z', response_time_seconds: 60 },
    { id: 'ans-03', attempt_id: attempt1.id, question_id: 'q-db-003', selected_choice_key: 'C', is_correct: true, answered_at: '2026-08-10T14:03:00Z', response_time_seconds: 70 },
    { id: 'ans-04', attempt_id: attempt1.id, question_id: 'q-db-004', selected_choice_key: 'B', is_correct: true, answered_at: '2026-08-10T14:04:30Z', response_time_seconds: 90 },
    { id: 'ans-05', attempt_id: attempt1.id, question_id: 'q-db-005', selected_choice_key: 'A', is_correct: false, answered_at: '2026-08-10T14:06:00Z', response_time_seconds: 90 },
    { id: 'ans-06', attempt_id: attempt1.id, question_id: 'q-db-006', selected_choice_key: 'B', is_correct: true, answered_at: '2026-08-10T14:07:30Z', response_time_seconds: 90 },
  ];

  // Bookmarks
  const bookmarks: Bookmark[] = [
    {
      id: 'bm-001',
      user_id: studentUser.id,
      question_id: 'q-db-005',
      notes: 'ทบทวน Transitive Functional Dependency อีกครั้งก่อนสอบกลางภาค',
      created_at: '2026-08-10T14:10:00Z',
      question: questions.find(q => q.id === 'q-db-005'),
    },
  ];

  // Admin audit logs
  const admin_audit_logs: AdminAuditLog[] = [
    {
      id: 'log-001',
      admin_user_id: adminUser.id,
      admin_email: adminUser.email,
      action: 'publish_question',
      target_entity: 'questions',
      target_id: 'q-db-001',
      details: { previous_status: 'approved', new_status: 'published' },
      created_at: '2026-08-05T12:00:00Z',
    },
  ];

  // Generation runs
  const generation_runs: GenerationRun[] = [
    {
      id: 'gen-run-001',
      subject_id: subDb.id,
      model_name: 'gpt-4o-mini',
      prompt_version: 'v1.0',
      total_requested: 25,
      total_generated: 25,
      total_imported: 25,
      status: 'completed',
      metadata: { chapter: 'Normalization' },
      created_at: '2026-08-05T11:00:00Z',
    },
  ];

  return {
    profiles: [studentUser, adminUser],
    subjects: [subDb, subNet],
    chapters: [chDb1, chDb2, chDb3, chNet1, chNet2],
    topics: [topDb1_1, topDb1_2, topDb2_1, topDb2_2, topDb3_1, topDb3_2, topNet1_1, topNet2_1],
    source_documents: [docDbSlide1, docDbSlide2, docDbSlide3, docDbExam],
    source_pages: [],
    exam_blueprints: [bpDb, bpNet],
    questions,
    question_choices,
    question_answer_keys,
    question_sources,
    question_quality_flags,
    exam_attempts: [attempt1],
    attempt_questions: attempt1_questions,
    attempt_answers: attempt1_answers,
    bookmarks,
    admin_audit_logs,
    generation_runs,
  };
}
