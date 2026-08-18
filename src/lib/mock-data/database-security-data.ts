import type {
  Subject,
  Chapter,
  Topic,
  SourceDocument,
  ExamBlueprint,
  Question,
  QuestionChoice,
  QuestionAnswerKey,
  QuestionSource,
} from '../types/database';

export const dbSecSubject: Subject = {
  id: 'sub-dbsec-001',
  slug: 'database-web-security',
  name: 'Database and WebSecurity',
  description: 'การพัฒนาเว็บแอปพลิเคชันและการรักษาความปลอดภัยระบบฐานข้อมูล (PHP, MySQL, Prepared Statements, Authentication, Session Security, CSRF, XSS, Password Hashing)',
  language: 'th',
  question_target: 110,
  icon: 'ShieldCheck',
  chapters_count: 7,
  documents_count: 7,
  created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  updated_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
};

export const dbSecChapters: Chapter[] = [
  {
    id: 'ch-dbsec-01',
    subject_id: 'sub-dbsec-001',
    sequence_order: 1,
    title: 'Chapter 1: พื้นฐาน Web Application และ HTML',
    description: 'สถาปัตยกรรม Client-Server, HTTP Request/Response, Frontend vs Backend, โครงสร้าง HTML, Semantic Tags และ CSS เบื้องต้น',
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
  {
    id: 'ch-dbsec-02',
    subject_id: 'sub-dbsec-001',
    sequence_order: 2,
    title: 'Chapter 2: HTML Form และการส่งข้อมูล GET / POST',
    description: 'โครงสร้าง Form, Input Types, ข้อแตกต่างและการใช้งานระหว่าง HTTP Method GET vs POST, Multipart Form Data และความปลอดภัยเบื้องต้นของ Form',
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
  {
    id: 'ch-dbsec-03',
    subject_id: 'sub-dbsec-001',
    sequence_order: 3,
    title: 'Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ',
    description: 'การทำงานของ Server-Side Scripting, ไวยากรณ์ PHP, ตัวแปร, Superglobals ($_GET, $_POST, $_SERVER) และการรับค่าอย่างปลอดภัย',
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
  {
    id: 'ch-dbsec-04',
    subject_id: 'sub-dbsec-001',
    sequence_order: 4,
    title: 'Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)',
    description: 'การเชื่อมต่อฐานข้อมูลด้วย PDO และ MySQLi, การค้นหาข้อมูล (SELECT), การเพิ่มข้อมูล (INSERT) และ Prepared Statements ป้องกัน SQL Injection',
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
  {
    id: 'ch-dbsec-05',
    subject_id: 'sub-dbsec-001',
    sequence_order: 5,
    title: 'Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)',
    description: 'การแก้ไขข้อมูล (UPDATE), การลบข้อมูล (DELETE), CRUD Operations ครบวงจร, Error Handling ด้วย PDO::ERRMODE_EXCEPTION และ Data Sanitization',
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
  {
    id: 'ch-dbsec-06',
    subject_id: 'sub-dbsec-001',
    sequence_order: 6,
    title: 'Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน',
    description: 'Authentication vs Authorization, การจัดการ Session/Cookie, การแฮชรหัสผ่านด้วย password_hash() (bcrypt) และการตรวจสอบด้วย password_verify()',
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
  {
    id: 'ch-dbsec-07',
    subject_id: 'sub-dbsec-001',
    sequence_order: 7,
    title: 'Chapter 7: Session Security and Login Protection',
    description: 'Session Fixation vs Session Hijacking, การใช้ session_regenerate_id(true), Cookie Flags (HttpOnly, Secure, SameSite), การป้องกัน XSS, CSRF และ Brute-force Attack',
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
];

export const dbSecTopics: Topic[] = [
  { id: 'top-dbsec-01-1', chapter_id: 'ch-dbsec-01', title: 'Client-Server & HTTP Protocol', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
  { id: 'top-dbsec-01-2', chapter_id: 'ch-dbsec-01', title: 'HTML5 Semantic Tags & Elements', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
  { id: 'top-dbsec-02-1', chapter_id: 'ch-dbsec-02', title: 'HTML Form & Input Controls', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
  { id: 'top-dbsec-02-2', chapter_id: 'ch-dbsec-02', title: 'HTTP GET vs POST Methods', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
  { id: 'top-dbsec-03-1', chapter_id: 'ch-dbsec-03', title: 'PHP Syntax & Superglobals', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
  { id: 'top-dbsec-03-2', chapter_id: 'ch-dbsec-03', title: 'PHP Input Handling & Functions', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
  { id: 'top-dbsec-04-1', chapter_id: 'ch-dbsec-04', title: 'PDO Database Connection', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
  { id: 'top-dbsec-04-2', chapter_id: 'ch-dbsec-04', title: 'Prepared Statements & SQL Injection Prevention', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
  { id: 'top-dbsec-05-1', chapter_id: 'ch-dbsec-05', title: 'PHP MySQL CRUD Operations (Update/Delete)', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
  { id: 'top-dbsec-05-2', chapter_id: 'ch-dbsec-05', title: 'PDO Error Handling & Data Integrity', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
  { id: 'top-dbsec-06-1', chapter_id: 'ch-dbsec-06', title: 'Authentication vs Authorization & Login Flow', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
  { id: 'top-dbsec-06-2', chapter_id: 'ch-dbsec-06', title: 'Password Hashing & Verification (bcrypt)', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
  { id: 'top-dbsec-07-1', chapter_id: 'ch-dbsec-07', title: 'Session Hijacking & Session Fixation Protection', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
  { id: 'top-dbsec-07-2', chapter_id: 'ch-dbsec-07', title: 'Cookie Flags (HttpOnly, Secure, SameSite)', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
  { id: 'top-dbsec-07-3', chapter_id: 'ch-dbsec-07', title: 'XSS & CSRF Defense Mechanisms', created_at: new Date('2026-08-18T10:00:00.000Z').toISOString() },
];

export const dbSecDocuments: SourceDocument[] = [
  {
    id: 'doc-dbsec-01',
    subject_id: 'sub-dbsec-001',
    chapter_id: 'ch-dbsec-01',
    title: 'Chapter 1: พื้นฐาน Web Application และ HTML',
    file_path: 'database-security/slides/1-พื้นฐาน Web Application และ HTML.pdf',
    document_type: 'slide',
    mime_type: 'application/pdf',
    file_size: 1121237,
    page_count: 44,
    ocr_status: 'ready',
    extraction_text_summary: 'Client-Server Architecture, HTTP Request/Response, Frontend vs Backend, โครงสร้าง HTML, Semantic Tags และ CSS',
    storage_bucket: 'source-documents',
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
  {
    id: 'doc-dbsec-02',
    subject_id: 'sub-dbsec-001',
    chapter_id: 'ch-dbsec-02',
    title: 'Chapter 2: HTML Form และการส่งข้อมูล GET / POST',
    file_path: 'database-security/slides/2-HTML Form และการส่งข้อมูล GET POST.pdf',
    document_type: 'slide',
    mime_type: 'application/pdf',
    file_size: 653712,
    page_count: 35,
    ocr_status: 'ready',
    extraction_text_summary: 'Form Controls, Input Types, Method GET (URL Query String) vs Method POST (HTTP Request Body), Enctype และ File Upload',
    storage_bucket: 'source-documents',
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
  {
    id: 'doc-dbsec-03',
    subject_id: 'sub-dbsec-001',
    chapter_id: 'ch-dbsec-03',
    title: 'Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ',
    file_path: 'database-security/slides/3-PHP.pdf',
    document_type: 'slide',
    mime_type: 'application/pdf',
    file_size: 1355630,
    page_count: 48,
    ocr_status: 'ready',
    extraction_text_summary: 'PHP Syntax, Variables, Data Types, Superglobals ($_GET, $_POST, $_SERVER), Input Handling และ Functions',
    storage_bucket: 'source-documents',
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
  {
    id: 'doc-dbsec-04',
    subject_id: 'sub-dbsec-001',
    chapter_id: 'ch-dbsec-04',
    title: 'Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)',
    file_path: 'database-security/slides/4-PHP MySQL-1.pdf',
    document_type: 'slide',
    mime_type: 'application/pdf',
    file_size: 1066673,
    page_count: 59,
    ocr_status: 'ready',
    extraction_text_summary: 'Relational Database, PDO Connection, SELECT, INSERT, Prepared Statements, Parameter Binding ป้องกัน SQL Injection',
    storage_bucket: 'source-documents',
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
  {
    id: 'doc-dbsec-05',
    subject_id: 'sub-dbsec-001',
    chapter_id: 'ch-dbsec-05',
    title: 'Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)',
    file_path: 'database-security/slides/5-PHP MySQL 2.pdf',
    document_type: 'slide',
    mime_type: 'application/pdf',
    file_size: 898246,
    page_count: 57,
    ocr_status: 'ready',
    extraction_text_summary: 'CRUD Update & Delete Operations, Data Integrity, Confirmation UI, Data Sanitization และ PDO Error Handling',
    storage_bucket: 'source-documents',
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
  {
    id: 'doc-dbsec-06',
    subject_id: 'sub-dbsec-001',
    chapter_id: 'ch-dbsec-06',
    title: 'Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน',
    file_path: 'database-security/slides/6-PHP Login_Logout.pdf',
    document_type: 'slide',
    mime_type: 'application/pdf',
    file_size: 1273356,
    page_count: 39,
    ocr_status: 'ready',
    extraction_text_summary: 'Authentication vs Authorization, Session Lifecycle, password_hash(), password_verify(), bcrypt และข้อเสียของ MD5',
    storage_bucket: 'source-documents',
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
  {
    id: 'doc-dbsec-07',
    subject_id: 'sub-dbsec-001',
    chapter_id: 'ch-dbsec-07',
    title: 'Chapter 7: Session Security and Login Protection',
    file_path: 'database-security/slides/7-Session Security and Login Protection.pdf',
    document_type: 'slide',
    mime_type: 'application/pdf',
    file_size: 1694079,
    page_count: 67,
    ocr_status: 'ready',
    extraction_text_summary: 'Session Fixation, Session Hijacking, session_regenerate_id(), Cookie Flags (HttpOnly, Secure, SameSite), XSS, CSRF และ Brute-force',
    storage_bucket: 'source-documents',
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
];

export const dbSecBlueprints: ExamBlueprint[] = [
  {
    id: 'bp-dbsec-001',
    subject_id: 'sub-dbsec-001',
    name: 'Database and WebSecurity Comprehensive Exam',
    slug: 'database-web-security-comprehensive',
    description: 'แบบทดสอบประมวลความรู้ครอบคลุมทั้ง 7 บทเรียน (HTML Form, PHP, MySQL, PDO Prepared Statements, Password Hashing, Session Security, CSRF/XSS Defense)',
    question_count: 25,
    duration_minutes: 50,
    avoid_recent_question_count: 10,
    is_active: true,
    topic_distribution: [
      { topic: 'Client-Server & HTTP Protocol', weight: 0.10 },
      { topic: 'HTTP GET vs POST Methods', weight: 0.15 },
      { topic: 'PHP Syntax & Superglobals', weight: 0.15 },
      { topic: 'Prepared Statements & SQL Injection Prevention', weight: 0.20 },
      { topic: 'Password Hashing & Verification (bcrypt)', weight: 0.15 },
      { topic: 'Session Hijacking & Session Fixation Protection', weight: 0.15 },
      { topic: 'XSS & CSRF Defense Mechanisms', weight: 0.10 },
    ],
    difficulty_distribution: { easy: 0.30, medium: 0.50, hard: 0.20 },
    created_at: new Date('2026-08-18T10:00:00.000Z').toISOString(),
  },
];

export const dbSecQuestions: Question[] = [
  {
    "id": "q-dbsec-001",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-1",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "Client-Server & HTTP Protocol",
    "question_text": "ในสถาปัตยกรรม Client-Server ของระบบ Web Application หน้าที่หลักของ Web Server คือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-002",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-2",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "HTML5 Semantic Tags & Elements",
    "question_text": "แท็ก HTML5 ชนิดใดออกแบบมาเพื่อระบุส่วนเนื้อหาหลักของเอกสารเว็บ โดยควรมีเพียงแท็กเดียวต่อหนึ่งหน้าเว็บเพจ?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-003",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-1",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "Client-Server & HTTP Protocol",
    "question_text": "HTTP Status Code หมายเลข 403 (Forbidden) และ 404 (Not Found) แตกต่างกันอย่างไรในทางสถาปัตยกรรมความปลอดภัย?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-004",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-1",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "Client-Server & HTTP Protocol",
    "question_text": "HTTP Status Code กลุ่ม 5xx (เช่น 500 Internal Server Error, 503 Service Unavailable) บ่งบอกถึงสถานะใดของการทำงานระบบ?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-005",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-2",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "HTML5 Semantic Tags & Elements",
    "question_text": "การประกาศ <!DOCTYPE html> บรรทัดแรกสุดของเอกสาร HTML มีจุดประสงค์หลักเพื่ออะไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-006",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-2",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "HTML5 Semantic Tags & Elements",
    "question_text": "แท็ก <meta charset=\"UTF-8\"> ภายในส่วน <head> มีบทบาทสำคัญต่อความปลอดภัยและการแสดงผลอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-007",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-1",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "Client-Server & HTTP Protocol",
    "question_text": "ข้อใดอธิบายความแตกต่างระหว่าง Stateless Protocol ของ HTTP กับการทำงานของ Stateful Application ได้ถูกต้อง?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-008",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-2",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "HTML5 Semantic Tags & Elements",
    "question_text": "แท็ก HTML ใดจัดเป็น Inline Elements ที่ไม่ขึ้นบรรทัดใหม่และมีความกว้างเท่ากับขนาดของเนื้อหาภายใน?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-009",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-1",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "Client-Server & HTTP Protocol",
    "question_text": "ในโมเดล 3-Tier Web Architecture ส่วนประกอบใดรับผิดชอบการจัดการ Business Logic และการติดต่อฐานข้อมูล?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-010",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-1",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "Client-Server & HTTP Protocol",
    "question_text": "HTTPS แตกต่างจาก HTTP ธรรมดาอย่างไรในแง่ของความปลอดภัยข้อมูลที่วิ่งผ่านเครือข่าย?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-071",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-1",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "Client-Server & HTTP Protocol",
    "question_text": "HTTP Response Header: Content-Type: application/json; charset=utf-8 ทำหน้าที่อะไรต่อเว็บเบราว์เซอร์?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-072",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-1",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "Client-Server & HTTP Protocol",
    "question_text": "HTTP Request Header ใดที่เบราว์เซอร์ส่งไประบุ URL ของหน้าเว็บก่อนหน้าที่ผู้ใช้คลิกลิงก์มา?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-073",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-2",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "HTML5 Semantic Tags & Elements",
    "question_text": "แท็ก HTML5 <nav> มีวัตถุประสงค์เพื่อใช้ครอบส่วนใดของเว็บไซต์?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-074",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-1",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "Client-Server & HTTP Protocol",
    "question_text": "HTTP Status Code 301 (Moved Permanently) แตกต่างจาก 302 (Found / Temporary Redirect) อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-075",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-01",
    "topic_id": "top-dbsec-01-2",
    "chapter_title": "Chapter 1: พื้นฐาน Web Application และ HTML",
    "topic_title": "HTML5 Semantic Tags & Elements",
    "question_text": "แอตทริบิวต์ alt ในแท็ก <img> มีความสำคัญต่อ Accessibility และ SEO อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-011",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-2",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTTP GET vs POST Methods",
    "question_text": "เหตุใดการส่งข้อมูลรหัสผ่าน (Password) หรือข้อมูลบัตรเครดิตผ่าน HTTP Method GET จึงถือว่าไม่ปลอดภัยอย่างร้ายแรง?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-012",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-1",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTML Form & Input Controls",
    "question_text": "เมื่อต้องการสร้างฟอร์มสำหรับอัปโหลดไฟล์ (File Upload) จำเป็นต้องกำหนดแอตทริบิวต์ใดในแท็ก <form>?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-013",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-2",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTTP GET vs POST Methods",
    "question_text": "ข้อใดอธิบายคุณสมบัติ Idempotency ของ HTTP Method ได้ถูกต้องตามมาตรฐาน RFC?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-014",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-1",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTML Form & Input Controls",
    "question_text": "แอตทริบิวต์ name ในแท็ก <input> มีความสำคัญต่อการประมวลผลในฝั่งเซิร์ฟเวอร์อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-015",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-1",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTML Form & Input Controls",
    "question_text": "การใช้งาน <label for=\"user_email\"> คู่กับ <input id=\"user_email\"> ให้ประโยชน์หลักด้านใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-016",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-2",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTTP GET vs POST Methods",
    "question_text": "ในกรณีใดที่เหมาะสมกับการเลือกใช้ HTTP Method GET มากที่สุด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-017",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-1",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTML Form & Input Controls",
    "question_text": "หากต้องการให้ผู้ใช้เลือกคำตอบได้เพียง \"ตัวเลือกเดียว\" จากกลุ่มตัวเลือกทั้งหมด ควรใช้ Input Type ชนิดใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-018",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-1",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTML Form & Input Controls",
    "question_text": "เหตุใดการตรวจสอบข้อมูล (Validation) ในฝั่ง Client ด้วย HTML5 required หรือ JavaScript เพียงอย่างเดียว จึงไม่เพียงพอต่อความปลอดภัย?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-019",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-1",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTML Form & Input Controls",
    "question_text": "แท็ก <input type=\"hidden\"> ส่งข้อมูลอย่างไร และมีข้อควรระวังด้านความปลอดภัยอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-020",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-2",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTTP GET vs POST Methods",
    "question_text": "เมื่อส่งข้อมูลฟอร์มด้วย method=\"POST\" ข้อมูลจะถูกบรรจุอยู่ในส่วนใดของ HTTP Request Message?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-076",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-1",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTML Form & Input Controls",
    "question_text": "หากต้องการให้ฟอร์ม HTML สามารถรับค่า Checkbox หลายตัวเลือกเป็น Array ใน PHP เช่น รายการงานอดิเรก ควรตั้งชื่อแอตทริบิวต์ name อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-077",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-1",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTML Form & Input Controls",
    "question_text": "แท็ก <textarea> แตกต่างจาก <input type=\"text\"> อย่างไรในการรับค่าข้อความ?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-078",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-2",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTTP GET vs POST Methods",
    "question_text": "ค่าเริ่มต้นของแอตทริบิวต์ enctype ในแท็ก <form> หากไม่ได้ระบุคือค่าใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-079",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-1",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTML Form & Input Controls",
    "question_text": "แอตทริบิวต์ autocomplete=\"off\" ในช่องกรอกรหัสผ่านมีจุดประสงค์เพื่ออะไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-080",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-02",
    "topic_id": "top-dbsec-02-1",
    "chapter_title": "Chapter 2: HTML Form และการส่งข้อมูล GET / POST",
    "topic_title": "HTML Form & Input Controls",
    "question_text": "แอตทริบิวต์ pattern=\"^[0-9]{10}$\" บนแท็ก <input type=\"text\"> มีประโยชน์อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-021",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-1",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Syntax & Superglobals",
    "question_text": "ในภาษา PHP ตัวแปรประเภท Superglobal ตัวใดที่ใช้ในการอ่านค่า Headers ของคำขอ, IP Address ของผู้ใช้ และชื่อสคริปต์ที่กำลังรัน?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-022",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-2",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Input Handling & Functions",
    "question_text": "ฟังก์ชันใดใน PHP ที่ใช้แปลงอักขระพิเศษของ HTML (เช่น <, >, &, \") ให้เป็น HTML Entities เพื่อป้องกันช่องโหว่ Cross-Site Scripting (XSS)?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-023",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-1",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Syntax & Superglobals",
    "question_text": "ใน PHP ตัวดำเนินการเปรียบเทียบ === (Strict Equality) แตกต่างจาก == (Loose Equality) อย่างไรในการตรวจสอบข้อมูลด้านความปลอดภัย?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-024",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-1",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Syntax & Superglobals",
    "question_text": "คำสั่ง declare(strict_types=1); ที่ระบุบนบรรทัดแรกสุดของไฟล์ PHP มีผลต่อการทำงานของโค้ดอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-025",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-2",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Input Handling & Functions",
    "question_text": "ฟังก์ชัน trim() ใน PHP มักถูกใช้ในขั้นตอน Input Sanitization เพื่อจุดประสงค์ใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-026",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-1",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Syntax & Superglobals",
    "question_text": "ใน PHP การต่อสตริง (String Concatenation) ใช้เครื่องหมายตัวดำเนินการใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-027",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-2",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Input Handling & Functions",
    "question_text": "ฟังก์ชัน filter_var($email, FILTER_VALIDATE_EMAIL) ให้ผลลัพธ์อย่างไรเมื่อค่าอีเมลที่ส่งเข้ามาไม่ถูกต้องตามรูปแบบ?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-028",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-1",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Syntax & Superglobals",
    "question_text": "การใช้งาน Short Echo Tag <?= $variable ?> ใน PHP มีความหมายเทียบเท่ากับคำสั่งใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-029",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-2",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Input Handling & Functions",
    "question_text": "ในการรับค่าจากฟอร์มใน PHP เหตุใดจึงควรตรวจสอบด้วย isset() หรือใช้ Null Coalescing Operator ($var = $_POST['key'] ?? '') ก่อนนำไปใช้งาน?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-030",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-1",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Syntax & Superglobals",
    "question_text": "ฟังก์ชัน require_once แตกต่างจาก include อย่างไรเมื่อไม่พบไฟล์ที่ต้องการเรียกใช้งาน?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-081",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-1",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Syntax & Superglobals",
    "question_text": "ในการตั้งค่าความปลอดภัยของ PHP บนเซิร์ฟเวอร์ Production เหตุใดจึงควรตั้งค่า ini_set('display_errors', '0'); ร่วมกับ log_errors = 1?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-082",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-2",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Input Handling & Functions",
    "question_text": "ใน PHP ตัวแปร $_FILES['myfile']['tmp_name'] เก็บข้อมูลใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-083",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-2",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Input Handling & Functions",
    "question_text": "เหตุใดการใช้ Type Casting แบบ (int)$_GET['id'] จึงเป็นวิธีที่มีประสิทธิภาพในการป้องกัน SQL Injection สำหรับพารามิเตอร์ที่เป็นตัวเลข?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-084",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-2",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Input Handling & Functions",
    "question_text": "เหตุใดการใช้ฟังก์ชัน strip_tags() เพียงอย่างเดียว จึงไม่สามารถป้องกันช่องโหว่ XSS ได้อย่างสมบูรณ์แบบ?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-085",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-03",
    "topic_id": "top-dbsec-03-1",
    "chapter_title": "Chapter 3: ภาษา PHP สำหรับการพัฒนาเว็บ",
    "topic_title": "PHP Syntax & Superglobals",
    "question_text": "ใน PHP คำสั่ง json_encode($data) และ json_decode($json, true) มีหน้าที่ทำงานอย่างไรตามลำดับ?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-031",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-1",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "PDO Database Connection",
    "question_text": "PDO (PHP Data Objects) มีข้อได้เปรียบเหนือไดรเวอร์ mysql_* ดั้งเดิมอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-032",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-2",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "Prepared Statements & SQL Injection Prevention",
    "question_text": "เหตุใด Prepared Statements ร่วมกับ Parameter Binding จึงสามารถป้องกันการโจมตีแบบ SQL Injection ได้ 100%?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-033",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-2",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "Prepared Statements & SQL Injection Prevention",
    "question_text": "พิจารณาโค้ด: $stmt = $pdo->prepare(\"SELECT * FROM users WHERE username = :u\"); $stmt->execute([\":u\" => $input]); หากผู้ใช้ป้อน ' OR 1=1 -- จะเกิดผลลัพธ์อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-040",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-1",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "PDO Database Connection",
    "question_text": "ในสตริง DSN (Data Source Name) ของการเชื่อมต่อ PDO MySQL เช่น \"mysql:host=localhost;dbname=mydb;charset=utf8mb4\" การระบุ charset=utf8mb4 มีความสำคัญอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-034",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-1",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "PDO Database Connection",
    "question_text": "เมธอด fetch(PDO::FETCH_ASSOC) แตกต่างจาก fetchAll(PDO::FETCH_ASSOC) ในการดึงข้อมูลจากฐานข้อมูลอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-035",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-2",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "Prepared Statements & SQL Injection Prevention",
    "question_text": "ในคำสั่ง SQL INSERT INTO users (name, email) VALUES (?, ?) เครื่องหมายคำถาม (?) เรียกว่าอะไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-036",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-2",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "Prepared Statements & SQL Injection Prevention",
    "question_text": "คำสั่ง bindParam() แตกต่างจาก bindValue() ใน PDO อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-037",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-1",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "PDO Database Connection",
    "question_text": "คำสั่ง $pdo->lastInsertId() มีหน้าที่อะไรในการจัดการฐานข้อมูล?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-038",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-2",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "Prepared Statements & SQL Injection Prevention",
    "question_text": "การโจมตีแบบ Union-Based SQL Injection มีลักษณะการทำงานอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-039",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-1",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "PDO Database Connection",
    "question_text": "ข้อใดคือไวยากรณ์ SQL ที่ถูกต้องสำหรับการสร้างตาราง users พร้อมกำหนด Primary Key แบบ Auto Increment?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-086",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-1",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "PDO Database Connection",
    "question_text": "การตั้งค่า PDO::ATTR_EMULATE_PREPARES => false ในออปชันของ PDO มีความสำคัญอย่างไรต่อความปลอดภัย?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-087",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-2",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "Prepared Statements & SQL Injection Prevention",
    "question_text": "เมื่อต้องการเขียนคำสั่ง SQL LIKE ร่วมกับ Prepared Statements ใน PDO วิธีการ Bind ค่า Wildcard (%) ที่ถูกต้องและปลอดภัยคือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-088",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-2",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "Prepared Statements & SQL Injection Prevention",
    "question_text": "เหตุใดส่วนของคำสั่ง ORDER BY (เช่น ORDER BY column_name DESC) จึงไม่สามารถใช้ Parameter Binding (:placeholder) ใน Prepared Statements ได้?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-089",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-2",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "Prepared Statements & SQL Injection Prevention",
    "question_text": "การโจมตีแบบ Blind SQL Injection ชนิด Time-Based มีหลักการทดสอบช่องโหว่อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-090",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-1",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "PDO Database Connection",
    "question_text": "ในภาษา SQL คำสั่ง DROP TABLE แตกต่างจาก TRUNCATE TABLE อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-041",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-1",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PHP MySQL CRUD Operations (Update/Delete)",
    "question_text": "ในการทำงานคำสั่ง SQL UPDATE หรือ DELETE หากลืมระบุคำสั่ง WHERE clause จะเกิดผลกระทบอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-042",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-2",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PDO Error Handling & Data Integrity",
    "question_text": "การตั้งค่า $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) มีประโยชน์อย่างไรในการจัดการข้อผิดพลาดและรักษาความปลอดภัย?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-043",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-2",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PDO Error Handling & Data Integrity",
    "question_text": "เหตุใดการแสดงข้อความดิบของ Database Exception ($e->getMessage()) ให้ผู้ใช้ทั่วไปเห็นบนหน้าเว็บโปรดักชันจึงเป็นข้อผิดพลาดร้ายแรง (Information Disclosure)?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-044",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-1",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PHP MySQL CRUD Operations (Update/Delete)",
    "question_text": "ในการทำระบบลบข้อมูล (Delete) ข้อใดเป็นแนวทางปฏิบัติที่ดีที่สุดในการออกแบบ UI และระบบเพื่อป้องกันความผิดพลาด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-045",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-1",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PHP MySQL CRUD Operations (Update/Delete)",
    "question_text": "ฟังก์ชันผู้ช่วย function h(string $str): string { return htmlspecialchars($str, ENT_QUOTES, 'UTF-8'); } นิยมนำมาใช้ในส่วนใดของแอปพลิเคชัน CRUD?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-046",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-2",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PDO Error Handling & Data Integrity",
    "question_text": "เมื่อทำการอัปเดตข้อมูลด้วย Prepared Statements คำสั่ง $stmt->rowCount() ใน PDO ให้ข้อมูลใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-047",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-1",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PHP MySQL CRUD Operations (Update/Delete)",
    "question_text": "ในกระบวนการแก้ไขข้อมูล (Edit / Update) รูปแบบ Flow การทำงานของหน้าเว็บที่ถูกต้องตามมาตรฐาน MVC คือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-048",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-2",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PDO Error Handling & Data Integrity",
    "question_text": "การทำ Database Transaction ด้วย $pdo->beginTransaction(), $pdo->commit() และ $pdo->rollBack() มีความสำคัญสูงสุดในสถานการณ์ใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-049",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-1",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PHP MySQL CRUD Operations (Update/Delete)",
    "question_text": "การใช้งาน Post/Redirect/Get (PRG) Pattern หลังการบันทึกข้อมูลใน update.php ด้วย header(\"Location: index.php\"); exit; ช่วยแก้ปัญหาใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-050",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-2",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PDO Error Handling & Data Integrity",
    "question_text": "ฟังก์ชัน mb_strlen($str, 'UTF-8') แตกต่างจาก strlen($str) อย่างไรในการตรวจสอบความยาวข้อความภาษาไทยก่อนบันทึก?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-091",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-1",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PHP MySQL CRUD Operations (Update/Delete)",
    "question_text": "การทำ Soft Delete (เช่น กำหนด is_deleted = 1) แตกต่างจาก Hard Delete (DELETE FROM) อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-092",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-1",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PHP MySQL CRUD Operations (Update/Delete)",
    "question_text": "ในคำสั่ง SQL Pagination: SELECT * FROM products ORDER BY id DESC LIMIT 10 OFFSET 20 หมายความว่าอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-093",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-2",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PDO Error Handling & Data Integrity",
    "question_text": "เมื่อทำการอัปโหลดไฟล์รูปภาพ แนวทางการรักษาความปลอดภัยที่ดีที่สุดคือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-094",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-1",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PHP MySQL CRUD Operations (Update/Delete)",
    "question_text": "ใน PHP ฟังก์ชัน header(\"Location: index.php\"); เหตุใดจึง \"ต้องมี\" คำสั่ง exit; หรือ die; ตามหลังเสมอ?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-095",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-05",
    "topic_id": "top-dbsec-05-2",
    "chapter_title": "Chapter 5: PHP กับฐานข้อมูล MySQL (ตอนที่ 2)",
    "topic_title": "PDO Error Handling & Data Integrity",
    "question_text": "ในระบบฐานข้อมูล ACID ย่อมาจากคุณสมบัติใดบ้าง?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-051",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-1",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Authentication vs Authorization & Login Flow",
    "question_text": "ข้อใดอธิบายความแตกต่างระหว่าง Authentication และ Authorization ได้ถูกต้องที่สุด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-052",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-2",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Password Hashing & Verification (bcrypt)",
    "question_text": "เหตุใดจึงห้ามใช้ฟังก์ชันแฮชแบบเก่า เช่น md5() หรือ sha1() ในการจัดเก็บรหัสผ่านผู้ใช้ในฐานข้อมูล?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-053",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-2",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Password Hashing & Verification (bcrypt)",
    "question_text": "ฟังก์ชัน password_hash($pwd, PASSWORD_BCRYPT) ใน PHP สร้างค่า Salt ให้อย่างไร และเหตุใดเราจึงไม่จำเป็นต้องสร้างคอลัมน์เก็บ Salt แยกต่างหากในฐานข้อมูล?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-054",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-2",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Password Hashing & Verification (bcrypt)",
    "question_text": "เมื่อผู้ใช้กรอกรหัสผ่านเข้ามาในหน้า login.php ฟังก์ชันใดใน PHP ที่ใช้ตรวจสอบรหัสผ่านอย่างปลอดภัยและป้องกันการโจมตีแบบ Timing Attack?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-055",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-1",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Authentication vs Authorization & Login Flow",
    "question_text": "ในกระบวนการ Logout ออกจากระบบ การเขียนโค้ดเพื่อทำลาย Session ให้หมดจดและปลอดภัยที่สุดควรประกอบด้วยขั้นตอนใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-056",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-1",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Authentication vs Authorization & Login Flow",
    "question_text": "ไฟล์ auth_check.php ที่ใช้ตรวจสอบสิทธิ์ในหน้าควบคุมของผู้ใช้ ควรมีเงื่อนไขตรวจสอบเบื้องต้นอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-057",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-2",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Password Hashing & Verification (bcrypt)",
    "question_text": "สตริงแฮชที่สร้างจาก password_hash(\"secret\", PASSWORD_BCRYPT) มีความยาวคงที่กี่ตัวอักษร และควรตั้งค่าคอลัมน์ password ในฐานข้อมูลอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-058",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-2",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Password Hashing & Verification (bcrypt)",
    "question_text": "ตัวเลือก Cost Factor (เช่น ['cost' => 12]) ใน bcrypt มีหน้าที่ควบคุมสิ่งใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-059",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-1",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Authentication vs Authorization & Login Flow",
    "question_text": "เมื่อผู้ใช้ Login ล้มเหลวเนื่องจากรหัสผ่านไม่ถูกต้อง ข้อความแจ้งเตือนใดถือว่าปลอดภัยที่สุดตามหลัก Security Best Practices?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-060",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-2",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Password Hashing & Verification (bcrypt)",
    "question_text": "ฟังก์ชัน password_needs_rehash($hash, PASSWORD_DEFAULT, ['cost' => 12]) ใช้ในกรณีใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-096",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-1",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Authentication vs Authorization & Login Flow",
    "question_text": "การทำ Role-Based Access Control (RBAC) เช่น การตรวจสอบว่า $_SESSION['role'] === 'admin' ก่อนเข้าถึงหน้าจัดการ มีจุดประสงค์เพื่ออะไร?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-097",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-2",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Password Hashing & Verification (bcrypt)",
    "question_text": "ตามคำแนะนำด้านความปลอดภัยของ NIST / OWASP การตั้งรหัสผ่านที่แข็งแกร่งควรให้ความสำคัญกับปัจจัยใดมากที่สุด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-098",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-1",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Authentication vs Authorization & Login Flow",
    "question_text": "ใน PHP การเรียกคำสั่ง session_start() จะสร้าง Cookie ชื่อใดบนเบราว์เซอร์ของผู้ใช้โดยค่าเริ่มต้น?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-099",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-2",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Password Hashing & Verification (bcrypt)",
    "question_text": "อัลกอริทึม Argon2id มีข้อได้เปรียบเหนือ bcrypt อย่างไรในระบบจัดการรหัสผ่านยุคใหม่?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-100",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-1",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Authentication vs Authorization & Login Flow",
    "question_text": "ฟังก์ชัน session_unset() ใน PHP ทำหน้าที่แตกต่างจาก session_destroy() อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-061",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-1",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "Session Hijacking & Session Fixation Protection",
    "question_text": "การโจมตีประเภท Session Fixation คืออะไร และมีวิธีป้องกันที่ถูกต้องใน PHP อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-062",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-2",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "Cookie Flags (HttpOnly, Secure, SameSite)",
    "question_text": "การตั้งค่า Cookie Flag แบบ HttpOnly ช่วยป้องกันการโจมตีด้านความปลอดภัยในลักษณะใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-063",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-3",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "XSS & CSRF Defense Mechanisms",
    "question_text": "การโจมตีแบบ CSRF (Cross-Site Request Forgery) อาศัยช่องโหว่ใดของเบราว์เซอร์ และเหตุใด CSRF Token แบบ Synchronizer Token Pattern จึงสามารถป้องกันได้?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-064",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-1",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "Session Hijacking & Session Fixation Protection",
    "question_text": "ความแตกต่างระหว่าง Idle Timeout และ Absolute Timeout ของ Session คือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-065",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-2",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "Cookie Flags (HttpOnly, Secure, SameSite)",
    "question_text": "Cookie Flag แบบ SameSite=Strict มีการทำงานเพื่อความปลอดภัยอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-066",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-3",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "XSS & CSRF Defense Mechanisms",
    "question_text": "การโจมตีประเภท Stored XSS (Persistent XSS) แตกต่างจาก Reflected XSS อย่างไร?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-067",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-1",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "Session Hijacking & Session Fixation Protection",
    "question_text": "กลไก Login Rate Limiting (เช่น อนุญาตให้ลอง Login ผิดได้ไม่เกิน 5 ครั้งภายใน 15 นาที) ออกแบบมาเพื่อป้องกันภัยคุกคามใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-068",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-3",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "XSS & CSRF Defense Mechanisms",
    "question_text": "การกำหนด HTTP Header: Cache-Control: no-store, no-cache, must-revalidate ในหน้าข้อมูลส่วนตัว (Profile) มีความสำคัญต่อความปลอดภัยอย่างไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-069",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-2",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "Cookie Flags (HttpOnly, Secure, SameSite)",
    "question_text": "ฟังก์ชัน session_set_cookie_params(['secure' => true, 'httponly' => true, 'samesite' => 'Lax']); ใน PHP ควรถูกเรียกใช้งานเมื่อใด?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-070",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-3",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "XSS & CSRF Defense Mechanisms",
    "question_text": "เหตุใดการใช้ Content Security Policy (CSP) เช่น Content-Security-Policy: default-src 'self'; จึงเป็นแนวทางการป้องกันเชิงลึก (Defense in Depth) ที่มีประสิทธิภาพ?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-101",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-3",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "XSS & CSRF Defense Mechanisms",
    "question_text": "ในการเขียน JavaScript ฝั่ง Client เหตุใดการใช้ element.textContent หรือ element.innerText จึงปลอดภัยจากช่องโหว่ DOM-based XSS มากกว่าการใช้ element.innerHTML?",
    "question_type": "single_choice",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-102",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-2",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "Cookie Flags (HttpOnly, Secure, SameSite)",
    "question_text": "ความแตกต่างระหว่าง Cookie SameSite=Lax กับ SameSite=Strict ในการส่งคำขอข้ามเว็บไซต์ (Top-Level Navigation) คือข้อใด?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-103",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-1",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "Session Hijacking & Session Fixation Protection",
    "question_text": "HTTP Response Header: Strict-Transport-Security: max-age=31536000; includeSubDomains (HSTS) มีบทบาทอย่างไรในการรักษาความปลอดภัย Session?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-104",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-3",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "XSS & CSRF Defense Mechanisms",
    "question_text": "การใช้งาน Subresource Integrity (SRI) เช่น <script src=\"https://cdn.example.com/app.js\" integrity=\"sha384-...\" crossorigin=\"anonymous\"> มีประโยชน์หลักเพื่ออะไร?",
    "question_type": "single_choice",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-105",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-1",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "Session Hijacking & Session Fixation Protection",
    "question_text": "ระบบ CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart) มีบทบาทสำคัญที่สุดในการป้องกันภัยคุกคามใด?",
    "question_type": "single_choice",
    "difficulty": "easy",
    "status": "published",
    "is_ai_generated": false,
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-fib-001",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-04",
    "topic_id": "top-dbsec-04-2",
    "chapter_title": "Chapter 4: PHP กับฐานข้อมูล MySQL (ตอนที่ 1)",
    "topic_title": "Prepared Statements & SQL Injection Prevention",
    "question_text": "ในการเขียน PHP เชื่อมต่อฐานข้อมูล PDO คำสั่ง [blank_1] ใช้สร้างคำสั่ง SQL ล่วงหน้า จากนั้นใช้ [blank_2] เพื่อผูกค่าตัวแปรเข้ากับพารามิเตอร์ และใช้ [blank_3] เพื่อเริ่มประมวลผลคำสั่งอย่างปลอดภัยจากการโจมตีแบบ [blank_4]",
    "question_type": "fill_in_the_blank",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "word_bank": [
      "prepare()",
      "bindParam()",
      "execute()",
      "SQL Injection",
      "query()",
      "eval()",
      "XSS",
      "strip_tags()"
    ],
    "blanks": [
      {
        "id": "blank_1",
        "position": 1,
        "placeholder": "คำสั่งเตรียม Query",
        "correct_word": "prepare()"
      },
      {
        "id": "blank_2",
        "position": 2,
        "placeholder": "คำสั่งผูกตัวแปร",
        "correct_word": "bindParam()"
      },
      {
        "id": "blank_3",
        "position": 3,
        "placeholder": "คำสั่งรัน Query",
        "correct_word": "execute()"
      },
      {
        "id": "blank_4",
        "position": 4,
        "placeholder": "ชื่อภัยคุกคาม",
        "correct_word": "SQL Injection"
      }
    ],
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-fib-002",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-2",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "Cookie Flags (HttpOnly, Secure, SameSite)",
    "question_text": "เมื่อตั้งค่า Session Cookie ใน PHP แฟล็ก [blank_1] ป้องกันไม่ให้ JavaScript อ่านคุกกี้เพื่อกัน XSS, แฟล็ก [blank_2] บังคับส่งคุกกี้ผ่านโปรโตคอล HTTPS เท่านั้น และฟังก์ชัน [blank_3] ใช้สร้าง Session ID ใหม่หลัง Login สำเร็จเพื่อป้องกัน [blank_4]",
    "question_type": "fill_in_the_blank",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "word_bank": [
      "HttpOnly",
      "Secure",
      "session_regenerate_id(true)",
      "Session Fixation",
      "SameSite",
      "session_destroy()",
      "MD5",
      "Session Hijacking"
    ],
    "blanks": [
      {
        "id": "blank_1",
        "position": 1,
        "placeholder": "แฟล็กกัน JS อ่านคุกกี้",
        "correct_word": "HttpOnly"
      },
      {
        "id": "blank_2",
        "position": 2,
        "placeholder": "แฟล็กบังคับ HTTPS",
        "correct_word": "Secure"
      },
      {
        "id": "blank_3",
        "position": 3,
        "placeholder": "ฟังก์ชันสร้าง Session ID ใหม่",
        "correct_word": "session_regenerate_id(true)"
      },
      {
        "id": "blank_4",
        "position": 4,
        "placeholder": "รูปแบบการโจมตีตรึงเซสชัน",
        "correct_word": "Session Fixation"
      }
    ],
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-fib-003",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-2",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Password Hashing & Verification (bcrypt)",
    "question_text": "ใน PHP ฟังก์ชัน [blank_1] ใช้สร้างรหัสผ่านแฮชที่ปลอดภัย, ฟังก์ชัน [blank_2] ใช้เปรียบเทียบรหัสผ่านแบบ Constant-Time และตัวแปร [blank_3] กำหนดอัลกอริทึมมาตรฐานของระบบ เพื่อป้องกันภัยคุกคามแบบ [blank_4]",
    "question_type": "fill_in_the_blank",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "word_bank": [
      "password_hash()",
      "password_verify()",
      "PASSWORD_DEFAULT",
      "Brute-force Attack",
      "md5()",
      "sha1()",
      "crypt()",
      "SQL Injection"
    ],
    "blanks": [
      {
        "id": "blank_1",
        "position": 1,
        "placeholder": "ฟังก์ชันแฮชรหัสผ่าน",
        "correct_word": "password_hash()"
      },
      {
        "id": "blank_2",
        "position": 2,
        "placeholder": "ฟังก์ชันตรวจสอบรหัสผ่าน",
        "correct_word": "password_verify()"
      },
      {
        "id": "blank_3",
        "position": 3,
        "placeholder": "ค่าคงที่อัลกอริทึม",
        "correct_word": "PASSWORD_DEFAULT"
      },
      {
        "id": "blank_4",
        "position": 4,
        "placeholder": "การโจมตีสุ่มรหัสผ่าน",
        "correct_word": "Brute-force Attack"
      }
    ],
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-mat-001",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-07",
    "topic_id": "top-dbsec-07-3",
    "chapter_title": "Chapter 7: Session Security and Login Protection",
    "topic_title": "XSS & CSRF Defense Mechanisms",
    "question_text": "จงจับคู่รูปแบบภัยคุกคามทางเว็บ (Web Security Threat) กับกลไกการป้องกันที่ถูกต้องและตรงจุดที่สุด",
    "question_type": "matching",
    "difficulty": "medium",
    "status": "published",
    "is_ai_generated": false,
    "matching_pairs": [
      {
        "id": "p1",
        "left": "SQL Injection",
        "right": "ใช้ PDO Prepared Statements ร่วมกับ Parameter Binding"
      },
      {
        "id": "p2",
        "left": "Stored / Reflected XSS",
        "right": "กรองข้อมูลขาออกด้วย htmlspecialchars(..., ENT_QUOTES, \"UTF-8\")"
      },
      {
        "id": "p3",
        "left": "Cross-Site Request Forgery (CSRF)",
        "right": "สร้างและตรวจสอบ Anti-CSRF Token ที่ฝังในแบบฟอร์ม"
      },
      {
        "id": "p4",
        "left": "Session Fixation Attack",
        "right": "เรียก session_regenerate_id(true) ทันทีเมื่อผู้ใช้ล็อกอินผ่าน"
      }
    ],
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  },
  {
    "id": "q-dbsec-mat-002",
    "subject_id": "sub-dbsec-001",
    "chapter_id": "ch-dbsec-06",
    "topic_id": "top-dbsec-06-2",
    "chapter_title": "Chapter 6: ระบบ Login / Logout และการจัดการรหัสผ่าน",
    "topic_title": "Password Hashing & Verification (bcrypt)",
    "question_text": "จงจับคู่ฟังก์ชันและเทคโนโลยีด้านการจัดการรหัสผ่านกับหน้าที่การทำงานให้ถูกต้อง",
    "question_type": "matching",
    "difficulty": "hard",
    "status": "published",
    "is_ai_generated": false,
    "matching_pairs": [
      {
        "id": "p1",
        "left": "password_hash()",
        "right": "สร้างแฮชรหัสผ่านอย่างปลอดภัยด้วยอัลกอริทึม bcrypt พร้อม Auto-Salt"
      },
      {
        "id": "p2",
        "left": "password_verify()",
        "right": "ตรวจสอบรหัสผ่าน Plaintext กับ Hash ในฐานข้อมูลแบบ Constant-Time"
      },
      {
        "id": "p3",
        "left": "password_needs_rehash()",
        "right": "ตรวจสอบว่าแฮชเดิมควรถูกอัปเกรดเป็นอัลกอริทึมหรือ Cost ใหม่หรือไม่"
      },
      {
        "id": "p4",
        "left": "Bcrypt Cost Factor",
        "right": "ตัวเลขกำหนดจำนวนรอบการคำนวณ (Work Factor) เพื่อชะลอการแฮก Brute-force"
      }
    ],
    "created_at": "2026-08-18T10:00:00.000Z",
    "updated_at": "2026-08-18T10:00:00.000Z"
  }
];

export const dbSecChoices: QuestionChoice[] = [
  {
    "id": "c-001-A",
    "question_id": "q-dbsec-001",
    "choice_key": "A",
    "choice_text": "ประมวลผลคำขอ (HTTP Request) ของไคลเอนต์และส่งผลลัพธ์ (HTTP Response) กลับไป",
    "sequence_order": 1
  },
  {
    "id": "c-001-B",
    "question_id": "q-dbsec-001",
    "choice_key": "B",
    "choice_text": "แสดงผลกราฟิกและเรนเดอร์หน้าจอ HTML ในฝั่งเครื่องผู้ใช้โดยตรง",
    "sequence_order": 2
  },
  {
    "id": "c-001-C",
    "question_id": "q-dbsec-001",
    "choice_key": "C",
    "choice_text": "จัดเก็บแคชของเบราว์เซอร์บนเครื่องลูกข่าย",
    "sequence_order": 3
  },
  {
    "id": "c-001-D",
    "question_id": "q-dbsec-001",
    "choice_key": "D",
    "choice_text": "แปลงสัญญาณดิจิทัลเป็นสัญญาณอนาล็อกผ่านสายเคเบิล",
    "sequence_order": 4
  },
  {
    "id": "c-002-A",
    "question_id": "q-dbsec-002",
    "choice_key": "A",
    "choice_text": "<main>",
    "sequence_order": 1
  },
  {
    "id": "c-002-B",
    "question_id": "q-dbsec-002",
    "choice_key": "B",
    "choice_text": "<div>",
    "sequence_order": 2
  },
  {
    "id": "c-002-C",
    "question_id": "q-dbsec-002",
    "choice_key": "C",
    "choice_text": "<section>",
    "sequence_order": 3
  },
  {
    "id": "c-002-D",
    "question_id": "q-dbsec-002",
    "choice_key": "D",
    "choice_text": "<article>",
    "sequence_order": 4
  },
  {
    "id": "c-003-A",
    "question_id": "q-dbsec-003",
    "choice_key": "A",
    "choice_text": "403 คือ Server ทราบตัวตน/มีไฟล์อยู่จริงแต่ผู้ใช้ไม่มีสิทธิ์เข้าถึง ส่วน 404 คือไม่พบไฟล์หรือ URL นั้นบนเซิร์ฟเวอร์",
    "sequence_order": 1
  },
  {
    "id": "c-003-B",
    "question_id": "q-dbsec-003",
    "choice_key": "B",
    "choice_text": "403 หมายถึง Server ล่ม ส่วน 404 หมายถึงเครือข่ายขัดข้อง",
    "sequence_order": 2
  },
  {
    "id": "c-003-C",
    "question_id": "q-dbsec-003",
    "choice_key": "C",
    "choice_text": "403 ใช้เฉพาะกับโปรโตคอล HTTPS ส่วน 404 ใช้กับ HTTP ธรรมดา",
    "sequence_order": 3
  },
  {
    "id": "c-003-D",
    "question_id": "q-dbsec-003",
    "choice_key": "D",
    "choice_text": "ทั้งสองรหัสมีความหมายเหมือนกันทุกประการ",
    "sequence_order": 4
  },
  {
    "id": "c-004-A",
    "question_id": "q-dbsec-004",
    "choice_key": "A",
    "choice_text": "เกิดข้อผิดพลาดขึ้นในฝั่งเซิร์ฟเวอร์ (Server Error) ขณะพยายามประมวลผลคำขอ",
    "sequence_order": 1
  },
  {
    "id": "c-004-B",
    "question_id": "q-dbsec-004",
    "choice_key": "B",
    "choice_text": "เกิดข้อผิดพลาดในการป้อนข้อมูลของผู้ใช้ในฝั่งไคลเอนต์",
    "sequence_order": 2
  },
  {
    "id": "c-004-C",
    "question_id": "q-dbsec-004",
    "choice_key": "C",
    "choice_text": "การส่งข้อมูลสำเร็จเรียบร้อยโดยสมบูรณ์",
    "sequence_order": 3
  },
  {
    "id": "c-004-D",
    "question_id": "q-dbsec-004",
    "choice_key": "D",
    "choice_text": "เบราว์เซอร์ของผู้ใช้ไม่รองรับการทำงานของ JavaScript",
    "sequence_order": 4
  },
  {
    "id": "c-005-A",
    "question_id": "q-dbsec-005",
    "choice_key": "A",
    "choice_text": "แจ้งเบราว์เซอร์ให้ประมวลผลเอกสารตามมาตรฐาน HTML5 ในโหมด Standards Mode",
    "sequence_order": 1
  },
  {
    "id": "c-005-B",
    "question_id": "q-dbsec-005",
    "choice_key": "B",
    "choice_text": "ทำการเชื่อมต่อกับฐานข้อมูล SQL อัตโนมัติ",
    "sequence_order": 2
  },
  {
    "id": "c-005-C",
    "question_id": "q-dbsec-005",
    "choice_key": "C",
    "choice_text": "เข้ารหัสเนื้อหาในหน้าเว็บเพจเพื่อป้องกันการคัดลอก",
    "sequence_order": 3
  },
  {
    "id": "c-005-D",
    "question_id": "q-dbsec-005",
    "choice_key": "D",
    "choice_text": "กำหนดให้เว็บไซต์รันได้เฉพาะบนเซิร์ฟเวอร์ Apache เท่านั้น",
    "sequence_order": 4
  },
  {
    "id": "c-006-A",
    "question_id": "q-dbsec-006",
    "choice_key": "A",
    "choice_text": "กำหนดการเข้ารหัสตัวอักษรแบบสากล รองรับภาษาไทย ป้องกันปัญหาตัวอักษรเพี้ยนและช่องโหว่ UTF-7 Charset XSS",
    "sequence_order": 1
  },
  {
    "id": "c-006-B",
    "question_id": "q-dbsec-006",
    "choice_key": "B",
    "choice_text": "บีบอัดขนาดไฟล์ HTML ให้เล็กลง 8 เท่า",
    "sequence_order": 2
  },
  {
    "id": "c-006-C",
    "question_id": "q-dbsec-006",
    "choice_key": "C",
    "choice_text": "สั่งให้เว็บโหลดเฉพาะฟอนต์ภาษาอังกฤษเท่านั้น",
    "sequence_order": 3
  },
  {
    "id": "c-006-D",
    "question_id": "q-dbsec-006",
    "choice_key": "D",
    "choice_text": "เปิดใช้งานการแคชคุกกี้บนหน่วยความจำของเครื่องแม่ข่าย",
    "sequence_order": 4
  },
  {
    "id": "c-007-A",
    "question_id": "q-dbsec-007",
    "choice_key": "A",
    "choice_text": "HTTP เป็น Stateless ที่ไม่จำสถานะของ Request ก่อนหน้า ดังนั้น Web App จึงต้องใช้ Cookie/Session เพื่อรักษา State ของผู้ใช้",
    "sequence_order": 1
  },
  {
    "id": "c-007-B",
    "question_id": "q-dbsec-007",
    "choice_key": "B",
    "choice_text": "HTTP เป็น Stateful ที่จดจำข้อมูลผู้ใช้ได้ตลอดเวลาโดยไม่ต้องใช้ Cookie ใดๆ",
    "sequence_order": 2
  },
  {
    "id": "c-007-C",
    "question_id": "q-dbsec-007",
    "choice_key": "C",
    "choice_text": "Stateless หมายความว่าเซิร์ฟเวอร์จะลบไฟล์เว็บทิ้งทุกครั้งที่ประมวลผลเสร็จ",
    "sequence_order": 3
  },
  {
    "id": "c-007-D",
    "question_id": "q-dbsec-007",
    "choice_key": "D",
    "choice_text": "Stateful หมายถึงเว็บไซต์ที่สามารถเปิดใช้งานได้โดยไม่ต้องต่ออินเทอร์เน็ต",
    "sequence_order": 4
  },
  {
    "id": "c-008-A",
    "question_id": "q-dbsec-008",
    "choice_key": "A",
    "choice_text": "<span>, <a>, <strong>, <em>",
    "sequence_order": 1
  },
  {
    "id": "c-008-B",
    "question_id": "q-dbsec-008",
    "choice_key": "B",
    "choice_text": "<div>, <p>, <h1>, <section>",
    "sequence_order": 2
  },
  {
    "id": "c-008-C",
    "question_id": "q-dbsec-008",
    "choice_key": "C",
    "choice_text": "<header>, <nav>, <footer>, <main>",
    "sequence_order": 3
  },
  {
    "id": "c-008-D",
    "question_id": "q-dbsec-008",
    "choice_key": "D",
    "choice_text": "<table>, <ul>, <ol>, <form>",
    "sequence_order": 4
  },
  {
    "id": "c-009-A",
    "question_id": "q-dbsec-009",
    "choice_key": "A",
    "choice_text": "Application Server / Logic Tier (เช่น PHP, Node.js, Python)",
    "sequence_order": 1
  },
  {
    "id": "c-009-B",
    "question_id": "q-dbsec-009",
    "choice_key": "B",
    "choice_text": "Presentation Tier / Web Browser",
    "sequence_order": 2
  },
  {
    "id": "c-009-C",
    "question_id": "q-dbsec-009",
    "choice_key": "C",
    "choice_text": "Database Management System (DBMS) เพียงอย่างเดียว",
    "sequence_order": 3
  },
  {
    "id": "c-009-D",
    "question_id": "q-dbsec-009",
    "choice_key": "D",
    "choice_text": "Network Switch และ Router",
    "sequence_order": 4
  },
  {
    "id": "c-010-A",
    "question_id": "q-dbsec-010",
    "choice_key": "A",
    "choice_text": "HTTPS เข้ารหัสข้อมูลด้วย TLS/SSL (พอร์ต 443) ป้องกันการดักฟัง (Eavesdropping) และการแก้ไขข้อมูลกลางทาง (Man-in-the-Middle Attack)",
    "sequence_order": 1
  },
  {
    "id": "c-010-B",
    "question_id": "q-dbsec-010",
    "choice_key": "B",
    "choice_text": "HTTPS ป้องกันการโจมตี SQL Injection บนเซิร์ฟเวอร์ได้โดยอัตโนมัติ",
    "sequence_order": 2
  },
  {
    "id": "c-010-C",
    "question_id": "q-dbsec-010",
    "choice_key": "C",
    "choice_text": "HTTPS ทำให้ความเร็วในการดาวน์โหลดไฟล์เร็วขึ้น 10 เท่า",
    "sequence_order": 3
  },
  {
    "id": "c-010-D",
    "question_id": "q-dbsec-010",
    "choice_key": "D",
    "choice_text": "HTTPS ทำการปิดกั้นไม่ให้ผู้ใช้สามารถดู Source Code HTML ในเบราว์เซอร์ได้",
    "sequence_order": 4
  },
  {
    "id": "c-071-A",
    "question_id": "q-dbsec-071",
    "choice_key": "A",
    "choice_text": "ระบุชนิดของ MIME Type และการเข้ารหัสของข้อมูลใน Response Body ให้เบราว์เซอร์ตีความเป็นโครงสร้าง JSON",
    "sequence_order": 1
  },
  {
    "id": "c-071-B",
    "question_id": "q-dbsec-071",
    "choice_key": "B",
    "choice_text": "บังคับให้ดาวน์โหลดไฟล์ลงในเครื่องของผู้ใช้เสมอ",
    "sequence_order": 2
  },
  {
    "id": "c-071-C",
    "question_id": "q-dbsec-071",
    "choice_key": "C",
    "choice_text": "ทำการแปลงไฟล์ JSON เป็นรูปภาพ PNG อัตโนมัติ",
    "sequence_order": 3
  },
  {
    "id": "c-071-D",
    "question_id": "q-dbsec-071",
    "choice_key": "D",
    "choice_text": "สั่งให้เบราว์เซอร์ปิดการทำงานของคุกกี้ทั้งหมด",
    "sequence_order": 4
  },
  {
    "id": "c-072-A",
    "question_id": "q-dbsec-072",
    "choice_key": "A",
    "choice_text": "Referer (หรือ Referrer)",
    "sequence_order": 1
  },
  {
    "id": "c-072-B",
    "question_id": "q-dbsec-072",
    "choice_key": "B",
    "choice_text": "User-Agent",
    "sequence_order": 2
  },
  {
    "id": "c-072-C",
    "question_id": "q-dbsec-072",
    "choice_key": "C",
    "choice_text": "Host",
    "sequence_order": 3
  },
  {
    "id": "c-072-D",
    "question_id": "q-dbsec-072",
    "choice_key": "D",
    "choice_text": "Accept-Encoding",
    "sequence_order": 4
  },
  {
    "id": "c-073-A",
    "question_id": "q-dbsec-073",
    "choice_key": "A",
    "choice_text": "กลุ่มของลิงก์นำทางหลัก (Navigation Links) เช่น เมนูหลักของเว็บไซต์",
    "sequence_order": 1
  },
  {
    "id": "c-073-B",
    "question_id": "q-dbsec-073",
    "choice_key": "B",
    "choice_text": "ส่วนแสดงวิดีโอและสื่อมัลติมีเดีย",
    "sequence_order": 2
  },
  {
    "id": "c-073-C",
    "question_id": "q-dbsec-073",
    "choice_key": "C",
    "choice_text": "ส่วนกรอกข้อมูลล็อกอินเข้าสู่ระบบ",
    "sequence_order": 3
  },
  {
    "id": "c-073-D",
    "question_id": "q-dbsec-073",
    "choice_key": "D",
    "choice_text": "ส่วนแสดงผลโฆษณาด้านข้าง",
    "sequence_order": 4
  },
  {
    "id": "c-074-A",
    "question_id": "q-dbsec-074",
    "choice_key": "A",
    "choice_text": "301 เป็นการเปลี่ยน URL ถาวร (เบราว์เซอร์และ Search Engine จะจำ URL ใหม่) ส่วน 302 เป็นการเปลี่ยนเส้นทางชั่วคราว",
    "sequence_order": 1
  },
  {
    "id": "c-074-B",
    "question_id": "q-dbsec-074",
    "choice_key": "B",
    "choice_text": "301 ใช้เฉพาะเว็บภาษาไทย ส่วน 302 ใช้กับภาษาอังกฤษ",
    "sequence_order": 2
  },
  {
    "id": "c-074-C",
    "question_id": "q-dbsec-074",
    "choice_key": "C",
    "choice_text": "301 หมายถึงรหัสผ่านผิด ส่วน 302 หมายถึงระบบล็อก",
    "sequence_order": 3
  },
  {
    "id": "c-074-D",
    "question_id": "q-dbsec-074",
    "choice_key": "D",
    "choice_text": "ทั้งสองรหัสทำงานเหมือนกันทุกประการ",
    "sequence_order": 4
  },
  {
    "id": "c-075-A",
    "question_id": "q-dbsec-075",
    "choice_key": "A",
    "choice_text": "ระบุข้อความอธิบายรูปภาพสำหรับโปรแกรมอ่านหน้าจอ (Screen Reader) และแสดงแทนรูปภาพเมื่อรูปโหลดไม่ขึ้น",
    "sequence_order": 1
  },
  {
    "id": "c-075-B",
    "question_id": "q-dbsec-075",
    "choice_key": "B",
    "choice_text": "ปรับความสว่างของรูปภาพให้อัตโนมัติ",
    "sequence_order": 2
  },
  {
    "id": "c-075-C",
    "question_id": "q-dbsec-075",
    "choice_key": "C",
    "choice_text": "เข้ารหัสรูปภาพเพื่อป้องกันการบันทึกภาพ",
    "sequence_order": 3
  },
  {
    "id": "c-075-D",
    "question_id": "q-dbsec-075",
    "choice_key": "D",
    "choice_text": "กำหนดให้รูปภาพหมุนรอบตัวเอง 360 องศา",
    "sequence_order": 4
  },
  {
    "id": "c-011-A",
    "question_id": "q-dbsec-011",
    "choice_key": "A",
    "choice_text": "ข้อมูลจะถูกเปิดเผยบน URL Address Bar, ถูกบันทึกใน Browser History และ Web Server Access Logs",
    "sequence_order": 1
  },
  {
    "id": "c-011-B",
    "question_id": "q-dbsec-011",
    "choice_key": "B",
    "choice_text": "Method GET ไม่รองรับการเชื่อมต่อผ่านพอร์ต 443 (HTTPS)",
    "sequence_order": 2
  },
  {
    "id": "c-011-C",
    "question_id": "q-dbsec-011",
    "choice_key": "C",
    "choice_text": "Method GET จะส่งข้อมูลได้ไม่เกิน 8 ตัวอักษรเท่านั้น",
    "sequence_order": 3
  },
  {
    "id": "c-011-D",
    "question_id": "q-dbsec-011",
    "choice_key": "D",
    "choice_text": "Method GET จะทำการเข้ารหัสข้อมูลด้วยรหัสผ่านของผู้ดูแลระบบเสมอ",
    "sequence_order": 4
  },
  {
    "id": "c-012-A",
    "question_id": "q-dbsec-012",
    "choice_key": "A",
    "choice_text": "enctype=\"multipart/form-data\" และ method=\"POST\"",
    "sequence_order": 1
  },
  {
    "id": "c-012-B",
    "question_id": "q-dbsec-012",
    "choice_key": "B",
    "choice_text": "enctype=\"text/plain\" และ method=\"GET\"",
    "sequence_order": 2
  },
  {
    "id": "c-012-C",
    "question_id": "q-dbsec-012",
    "choice_key": "C",
    "choice_text": "enctype=\"application/x-www-form-urlencoded\"",
    "sequence_order": 3
  },
  {
    "id": "c-012-D",
    "question_id": "q-dbsec-012",
    "choice_key": "D",
    "choice_text": "type=\"file/binary\"",
    "sequence_order": 4
  },
  {
    "id": "c-013-A",
    "question_id": "q-dbsec-013",
    "choice_key": "A",
    "choice_text": "การส่งคำขอซ้ำหลายครั้งด้วย Request เดียวกัน จะให้สถานะทรัพยากรบน Server เหมือนกับการส่งคำขอเพียงครั้งเดียว (เช่น GET, PUT, DELETE)",
    "sequence_order": 1
  },
  {
    "id": "c-013-B",
    "question_id": "q-dbsec-013",
    "choice_key": "B",
    "choice_text": "การส่งข้อมูลจะต้องมีการเข้ารหัสข้อมูลด้วย SSL/TLS เสมอ",
    "sequence_order": 2
  },
  {
    "id": "c-013-C",
    "question_id": "q-dbsec-013",
    "choice_key": "C",
    "choice_text": "การที่คำขอนั้นสามารถส่งข้อมูลไฟล์ขนาดใหญ่เกิน 100MB ได้",
    "sequence_order": 3
  },
  {
    "id": "c-013-D",
    "question_id": "q-dbsec-013",
    "choice_key": "D",
    "choice_text": "การส่งข้อมูลที่ต้องมี Session ID กำกับไว้ใน Header ทุกครั้ง",
    "sequence_order": 4
  },
  {
    "id": "c-014-A",
    "question_id": "q-dbsec-014",
    "choice_key": "A",
    "choice_text": "เป็น Key หรือชื่อตัวแปรที่ใช้ในการอ้างอิงค่าใน Array $_GET หรือ $_POST ในฝั่ง Backend",
    "sequence_order": 1
  },
  {
    "id": "c-014-B",
    "question_id": "q-dbsec-014",
    "choice_key": "B",
    "choice_text": "กำหนดสีและขนาดตัวอักษรของช่องกรอกข้อมูล",
    "sequence_order": 2
  },
  {
    "id": "c-014-C",
    "question_id": "q-dbsec-014",
    "choice_key": "C",
    "choice_text": "เป็น ID ที่ใช้ผูกกับ CSS Selector เพียงอย่างเดียว",
    "sequence_order": 3
  },
  {
    "id": "c-014-D",
    "question_id": "q-dbsec-014",
    "choice_key": "D",
    "choice_text": "กำหนดชนิดข้อมูลว่าเป็นตัวเลขหรือตัวอักษร",
    "sequence_order": 4
  },
  {
    "id": "c-015-A",
    "question_id": "q-dbsec-015",
    "choice_key": "A",
    "choice_text": "เพิ่มความสะดวกในการใช้งาน (Accessibility) โดยเมื่อคลิกที่ข้อความ Label จะเป็นการ Focus ไปยังช่อง Input นั้นทันที",
    "sequence_order": 1
  },
  {
    "id": "c-015-B",
    "question_id": "q-dbsec-015",
    "choice_key": "B",
    "choice_text": "ทำการตรวจสอบรูปแบบอีเมลโดยไม่ต้องเขียน JavaScript",
    "sequence_order": 2
  },
  {
    "id": "c-015-C",
    "question_id": "q-dbsec-015",
    "choice_key": "C",
    "choice_text": "บังคับให้ต้องกรอกข้อมูลห้ามเว้นว่าง",
    "sequence_order": 3
  },
  {
    "id": "c-015-D",
    "question_id": "q-dbsec-015",
    "choice_key": "D",
    "choice_text": "เข้ารหัสข้อมูลอีเมลก่อนส่งไปยังเซิร์ฟเวอร์",
    "sequence_order": 4
  },
  {
    "id": "c-016-A",
    "question_id": "q-dbsec-016",
    "choice_key": "A",
    "choice_text": "ฟังก์ชันการค้นหาข้อมูล (Search) หรือการกรองข้อมูล (Filter) ที่ผู้ใช้ต้องการแชร์ URL หรือ Bookmark หน้านั้นเก็บไว้ได้",
    "sequence_order": 1
  },
  {
    "id": "c-016-B",
    "question_id": "q-dbsec-016",
    "choice_key": "B",
    "choice_text": "ฟอร์มการสมัครสมาชิกและตั้งรหัสผ่านใหม่",
    "sequence_order": 2
  },
  {
    "id": "c-016-C",
    "question_id": "q-dbsec-016",
    "choice_key": "C",
    "choice_text": "การทำธุรกรรมโอนเงินผ่านระบบธนาคาร",
    "sequence_order": 3
  },
  {
    "id": "c-016-D",
    "question_id": "q-dbsec-016",
    "choice_key": "D",
    "choice_text": "การอัปโหลดไฟล์รูปภาพโปรไฟล์",
    "sequence_order": 4
  },
  {
    "id": "c-017-A",
    "question_id": "q-dbsec-017",
    "choice_key": "A",
    "choice_text": "<input type=\"radio\"> โดยกำหนดแอตทริบิวต์ name ของทุกตัวเลือกให้มีชื่อเดียวกัน",
    "sequence_order": 1
  },
  {
    "id": "c-017-B",
    "question_id": "q-dbsec-017",
    "choice_key": "B",
    "choice_text": "<input type=\"checkbox\"> โดยกำหนดแอตทริบิวต์ name ของทุกตัวเลือกให้มีชื่อเดียวกัน",
    "sequence_order": 2
  },
  {
    "id": "c-017-C",
    "question_id": "q-dbsec-017",
    "choice_key": "C",
    "choice_text": "<input type=\"select\">",
    "sequence_order": 3
  },
  {
    "id": "c-017-D",
    "question_id": "q-dbsec-017",
    "choice_key": "D",
    "choice_text": "<input type=\"button\">",
    "sequence_order": 4
  },
  {
    "id": "c-018-A",
    "question_id": "q-dbsec-018",
    "choice_key": "A",
    "choice_text": "เพราะผู้โจมตีสามารถปิดการทำงานของ JavaScript หรือส่ง HTTP Request ยิงตรงไปยัง Server ด้วย Postman/cURL เพื่อข้าม Client Validation ได้อย่างง่ายดาย",
    "sequence_order": 1
  },
  {
    "id": "c-018-B",
    "question_id": "q-dbsec-018",
    "choice_key": "B",
    "choice_text": "เพราะเบราว์เซอร์ทุกตัวไม่รองรับการทำงานของ required attribute",
    "sequence_order": 2
  },
  {
    "id": "c-018-C",
    "question_id": "q-dbsec-018",
    "choice_key": "C",
    "choice_text": "เพราะ Client Validation จะทำให้ความเร็วอินเทอร์เน็ตของผู้ใช้ช้าลง",
    "sequence_order": 3
  },
  {
    "id": "c-018-D",
    "question_id": "q-dbsec-018",
    "choice_key": "D",
    "choice_text": "เพราะ JavaScript ไม่สามารถอ่านค่าจาก Input Text ได้",
    "sequence_order": 4
  },
  {
    "id": "c-019-A",
    "question_id": "q-dbsec-019",
    "choice_key": "A",
    "choice_text": "ไม่แสดงบนหน้าจอแต่ส่งค่าไปกับฟอร์ม ผู้ใช้สามารถเปิด DevTools แก้ไขค่าของ hidden field ได้ ดังนั้นห้ามใช้เก็บข้อมูลสำคัญเช่นราคาสินค้าหรือสิทธิ์ผู้ใช้",
    "sequence_order": 1
  },
  {
    "id": "c-019-B",
    "question_id": "q-dbsec-019",
    "choice_key": "B",
    "choice_text": "ทำการเข้ารหัสข้อมูลระดับฮาร์ดแวร์ก่อนส่งไปยังเซิร์ฟเวอร์",
    "sequence_order": 2
  },
  {
    "id": "c-019-C",
    "question_id": "q-dbsec-019",
    "choice_key": "C",
    "choice_text": "สามารถอ่านค่าได้เฉพาะผู้ดูแลระบบที่มีรหัสผ่านเท่านั้น",
    "sequence_order": 3
  },
  {
    "id": "c-019-D",
    "question_id": "q-dbsec-019",
    "choice_key": "D",
    "choice_text": "ข้อมูลจะไม่ถูกส่งไปกับ HTTP Request",
    "sequence_order": 4
  },
  {
    "id": "c-020-A",
    "question_id": "q-dbsec-020",
    "choice_key": "A",
    "choice_text": "HTTP Request Message Body (Payload)",
    "sequence_order": 1
  },
  {
    "id": "c-020-B",
    "question_id": "q-dbsec-020",
    "choice_key": "B",
    "choice_text": "URL Query String ต่อท้าย URL",
    "sequence_order": 2
  },
  {
    "id": "c-020-C",
    "question_id": "q-dbsec-020",
    "choice_key": "C",
    "choice_text": "TCP Window Header",
    "sequence_order": 3
  },
  {
    "id": "c-020-D",
    "question_id": "q-dbsec-020",
    "choice_key": "D",
    "choice_text": "DNS Server Cache",
    "sequence_order": 4
  },
  {
    "id": "c-076-A",
    "question_id": "q-dbsec-076",
    "choice_key": "A",
    "choice_text": "name=\"hobbies[]\" (ใส่วงเล็บเหลี่ยมปิดท้ายชื่อ)",
    "sequence_order": 1
  },
  {
    "id": "c-076-B",
    "question_id": "q-dbsec-076",
    "choice_key": "B",
    "choice_text": "name=\"hobbies.array\"",
    "sequence_order": 2
  },
  {
    "id": "c-076-C",
    "question_id": "q-dbsec-076",
    "choice_key": "C",
    "choice_text": "name=\"array(hobbies)\"",
    "sequence_order": 3
  },
  {
    "id": "c-076-D",
    "question_id": "q-dbsec-076",
    "choice_key": "D",
    "choice_text": "name=\"@hobbies\"",
    "sequence_order": 4
  },
  {
    "id": "c-077-A",
    "question_id": "q-dbsec-077",
    "choice_key": "A",
    "choice_text": "<textarea> รองรับข้อความหลายบรรทัด (Multi-line) และค่าเริ่มต้นจะอยู่ระหว่างแท็กเปิดและแท็กปิด ไม่ได้อยู่ใน value attribute",
    "sequence_order": 1
  },
  {
    "id": "c-077-B",
    "question_id": "q-dbsec-077",
    "choice_key": "B",
    "choice_text": "<textarea> ส่งข้อมูลผ่านทางดาวเทียม",
    "sequence_order": 2
  },
  {
    "id": "c-077-C",
    "question_id": "q-dbsec-077",
    "choice_key": "C",
    "choice_text": "<textarea> ไม่สามารถพิมพ์ภาษาไทยได้",
    "sequence_order": 3
  },
  {
    "id": "c-077-D",
    "question_id": "q-dbsec-077",
    "choice_key": "D",
    "choice_text": "<textarea> สามารถใส่รหัสผ่านได้เท่านั้น",
    "sequence_order": 4
  },
  {
    "id": "c-078-A",
    "question_id": "q-dbsec-078",
    "choice_key": "A",
    "choice_text": "application/x-www-form-urlencoded",
    "sequence_order": 1
  },
  {
    "id": "c-078-B",
    "question_id": "q-dbsec-078",
    "choice_key": "B",
    "choice_text": "multipart/form-data",
    "sequence_order": 2
  },
  {
    "id": "c-078-C",
    "question_id": "q-dbsec-078",
    "choice_key": "C",
    "choice_text": "text/plain",
    "sequence_order": 3
  },
  {
    "id": "c-078-D",
    "question_id": "q-dbsec-078",
    "choice_key": "D",
    "choice_text": "application/json",
    "sequence_order": 4
  },
  {
    "id": "c-079-A",
    "question_id": "q-dbsec-079",
    "choice_key": "A",
    "choice_text": "ป้องกันไม่ให้เบราว์เซอร์ทำการจดจำหรือเติมรหัสผ่านอัตโนมัติบนเครื่องคอมพิวเตอร์สาธารณะ",
    "sequence_order": 1
  },
  {
    "id": "c-079-B",
    "question_id": "q-dbsec-079",
    "choice_key": "B",
    "choice_text": "ปิดการทำงานของแป้นพิมพ์ภาษาไทย",
    "sequence_order": 2
  },
  {
    "id": "c-079-C",
    "question_id": "q-dbsec-079",
    "choice_key": "C",
    "choice_text": "ทำให้รหัสผ่านไม่ถูกส่งไปยังฐานข้อมูล",
    "sequence_order": 3
  },
  {
    "id": "c-079-D",
    "question_id": "q-dbsec-079",
    "choice_key": "D",
    "choice_text": "ลบตัวอักษรที่พิมพ์ผิดทิ้งทันที",
    "sequence_order": 4
  },
  {
    "id": "c-080-A",
    "question_id": "q-dbsec-080",
    "choice_key": "A",
    "choice_text": "ตรวจสอบรูปแบบข้อมูลฝั่ง Client ด้วย Regular Expression บังคับให้ผู้ใช้กรอกตัวเลข 0-9 ความยาว 10 หลักเท่านั้น (เช่น เบอร์โทรศัพท์)",
    "sequence_order": 1
  },
  {
    "id": "c-080-B",
    "question_id": "q-dbsec-080",
    "choice_key": "B",
    "choice_text": "เปลี่ยนสีพื้นหลังของช่องกรอกเป็นสีดำ",
    "sequence_order": 2
  },
  {
    "id": "c-080-C",
    "question_id": "q-dbsec-080",
    "choice_key": "C",
    "choice_text": "ทำการสุ่มตัวเลข 10 หลักขึ้นมาให้ผู้ใช้",
    "sequence_order": 3
  },
  {
    "id": "c-080-D",
    "question_id": "q-dbsec-080",
    "choice_key": "D",
    "choice_text": "ทำให้ช่องกรอกข้อมูลนี้ไม่สามารถแก้ไขได้",
    "sequence_order": 4
  },
  {
    "id": "c-021-A",
    "question_id": "q-dbsec-021",
    "choice_key": "A",
    "choice_text": "$_SERVER",
    "sequence_order": 1
  },
  {
    "id": "c-021-B",
    "question_id": "q-dbsec-021",
    "choice_key": "B",
    "choice_text": "$_GLOBALS",
    "sequence_order": 2
  },
  {
    "id": "c-021-C",
    "question_id": "q-dbsec-021",
    "choice_key": "C",
    "choice_text": "$_ENV",
    "sequence_order": 3
  },
  {
    "id": "c-021-D",
    "question_id": "q-dbsec-021",
    "choice_key": "D",
    "choice_text": "$_REQUEST",
    "sequence_order": 4
  },
  {
    "id": "c-022-A",
    "question_id": "q-dbsec-022",
    "choice_key": "A",
    "choice_text": "htmlspecialchars($input, ENT_QUOTES, 'UTF-8')",
    "sequence_order": 1
  },
  {
    "id": "c-022-B",
    "question_id": "q-dbsec-022",
    "choice_key": "B",
    "choice_text": "addslashes($input)",
    "sequence_order": 2
  },
  {
    "id": "c-022-C",
    "question_id": "q-dbsec-022",
    "choice_key": "C",
    "choice_text": "urlencode($input)",
    "sequence_order": 3
  },
  {
    "id": "c-022-D",
    "question_id": "q-dbsec-022",
    "choice_key": "D",
    "choice_text": "md5($input)",
    "sequence_order": 4
  },
  {
    "id": "c-023-A",
    "question_id": "q-dbsec-023",
    "choice_key": "A",
    "choice_text": "=== จะตรวจสอบทั้งค่า (Value) และชนิดข้อมูล (Type) โดยไม่มี Type Juggling ป้องกันข้อผิดพลาดเช่น \"0e123\" == \"0e456\"",
    "sequence_order": 1
  },
  {
    "id": "c-023-B",
    "question_id": "q-dbsec-023",
    "choice_key": "B",
    "choice_text": "=== จะทำการแปลงสตริงเป็นตัวเลขก่อนเปรียบเทียบเสมอ",
    "sequence_order": 2
  },
  {
    "id": "c-023-C",
    "question_id": "q-dbsec-023",
    "choice_key": "C",
    "choice_text": "== มีความปลอดภัยสูงกว่าเพราะรองรับชนิดข้อมูลที่ยืดหยุ่นกว่า",
    "sequence_order": 3
  },
  {
    "id": "c-023-D",
    "question_id": "q-dbsec-023",
    "choice_key": "D",
    "choice_text": "=== ใช้เปรียบเทียบได้เฉพาะค่าตัวเลข (Integer) เท่านั้น",
    "sequence_order": 4
  },
  {
    "id": "c-024-A",
    "question_id": "q-dbsec-024",
    "choice_key": "A",
    "choice_text": "บังคับให้ตรวจสอบ Type ของพารามิเตอร์และ Return value ของฟังก์ชันอย่างเคร่งครัด หากไม่ตรงจะโยน TypeError ทันที",
    "sequence_order": 1
  },
  {
    "id": "c-024-B",
    "question_id": "q-dbsec-024",
    "choice_key": "B",
    "choice_text": "ทำการปิดการเชื่อมต่อฐานข้อมูลทั้งหมดในไฟล์นั้น",
    "sequence_order": 2
  },
  {
    "id": "c-024-C",
    "question_id": "q-dbsec-024",
    "choice_key": "C",
    "choice_text": "บังคับให้ต้องประกาศตัวแปรทุกตัวด้วยคีย์เวิร์ด var",
    "sequence_order": 3
  },
  {
    "id": "c-024-D",
    "question_id": "q-dbsec-024",
    "choice_key": "D",
    "choice_text": "ปิดการแจ้งเตือน Error ทุกชนิดในระบบ",
    "sequence_order": 4
  },
  {
    "id": "c-025-A",
    "question_id": "q-dbsec-025",
    "choice_key": "A",
    "choice_text": "ตัดช่องว่าง (Whitespace), การขึ้นบรรทัดใหม่ และแท็บ ที่อยู่หน้าสุดและท้ายสุดของข้อความออก",
    "sequence_order": 1
  },
  {
    "id": "c-025-B",
    "question_id": "q-dbsec-025",
    "choice_key": "B",
    "choice_text": "ลบแท็ก HTML ทั้งหมดออกจากข้อความ",
    "sequence_order": 2
  },
  {
    "id": "c-025-C",
    "question_id": "q-dbsec-025",
    "choice_key": "C",
    "choice_text": "แปลงตัวอักษรภาษาอังกฤษทั้งหมดเป็นตัวพิมพ์ใหญ่",
    "sequence_order": 3
  },
  {
    "id": "c-025-D",
    "question_id": "q-dbsec-025",
    "choice_key": "D",
    "choice_text": "ตัดคำหยาบออกจากข้อความอัตโนมัติ",
    "sequence_order": 4
  },
  {
    "id": "c-026-A",
    "question_id": "q-dbsec-026",
    "choice_key": "A",
    "choice_text": "เครื่องหมายจุด (.) เช่น $fullName = $firstName . \" \" . $lastName;",
    "sequence_order": 1
  },
  {
    "id": "c-026-B",
    "question_id": "q-dbsec-026",
    "choice_key": "B",
    "choice_text": "เครื่องหมายบวก (+)",
    "sequence_order": 2
  },
  {
    "id": "c-026-C",
    "question_id": "q-dbsec-026",
    "choice_key": "C",
    "choice_text": "เครื่องหมายแอมเพอร์แซนด์ (&)",
    "sequence_order": 3
  },
  {
    "id": "c-026-D",
    "question_id": "q-dbsec-026",
    "choice_key": "D",
    "choice_text": "เครื่องหมายลูกศร (->)",
    "sequence_order": 4
  },
  {
    "id": "c-027-A",
    "question_id": "q-dbsec-027",
    "choice_key": "A",
    "choice_text": "คืนค่า false",
    "sequence_order": 1
  },
  {
    "id": "c-027-B",
    "question_id": "q-dbsec-027",
    "choice_key": "B",
    "choice_text": "โยน Exception และหยุดการทำงานทันที",
    "sequence_order": 2
  },
  {
    "id": "c-027-C",
    "question_id": "q-dbsec-027",
    "choice_key": "C",
    "choice_text": "คืนค่าเป็นสตริงว่าง \"\"",
    "sequence_order": 3
  },
  {
    "id": "c-027-D",
    "question_id": "q-dbsec-027",
    "choice_key": "D",
    "choice_text": "คืนค่าเป็นตัวเลข 0",
    "sequence_order": 4
  },
  {
    "id": "c-028-A",
    "question_id": "q-dbsec-028",
    "choice_key": "A",
    "choice_text": "<?php echo $variable; ?>",
    "sequence_order": 1
  },
  {
    "id": "c-028-B",
    "question_id": "q-dbsec-028",
    "choice_key": "B",
    "choice_text": "<?php print_r($variable); ?>",
    "sequence_order": 2
  },
  {
    "id": "c-028-C",
    "question_id": "q-dbsec-028",
    "choice_key": "C",
    "choice_text": "<?php var_dump($variable); ?>",
    "sequence_order": 3
  },
  {
    "id": "c-028-D",
    "question_id": "q-dbsec-028",
    "choice_key": "D",
    "choice_text": "<?php return $variable; ?>",
    "sequence_order": 4
  },
  {
    "id": "c-029-A",
    "question_id": "q-dbsec-029",
    "choice_key": "A",
    "choice_text": "เพื่อป้องกันการเกิดข้อผิดพลาด PHP Warning: Undefined array key เมื่อผู้ใช้ไม่ได้ส่งค่านั้นมา",
    "sequence_order": 1
  },
  {
    "id": "c-029-B",
    "question_id": "q-dbsec-029",
    "choice_key": "B",
    "choice_text": "เพื่อเข้ารหัสข้อมูลตัวแปรนั้นเป็น MD5",
    "sequence_order": 2
  },
  {
    "id": "c-029-C",
    "question_id": "q-dbsec-029",
    "choice_key": "C",
    "choice_text": "เพื่อบังคับให้ตัวแปรนั้นต้องเป็นตัวเลขเสมอ",
    "sequence_order": 3
  },
  {
    "id": "c-029-D",
    "question_id": "q-dbsec-029",
    "choice_key": "D",
    "choice_text": "เพื่อลบตัวแปรนั้นออกจากหน่วยความจำของเซิร์ฟเวอร์",
    "sequence_order": 4
  },
  {
    "id": "c-030-A",
    "question_id": "q-dbsec-030",
    "choice_key": "A",
    "choice_text": "require_once จะโยน Fatal Error และหยุดการทำงานของสคริปต์ทันที ส่วน include จะส่งเพียง E_WARNING และสคริปต์ยังคงรันต่อไป",
    "sequence_order": 1
  },
  {
    "id": "c-030-B",
    "question_id": "q-dbsec-030",
    "choice_key": "B",
    "choice_text": "require_once ใช้สำหรับไฟล์รูปภาพ ส่วน include ใช้สำหรับไฟล์ข้อความ",
    "sequence_order": 2
  },
  {
    "id": "c-030-C",
    "question_id": "q-dbsec-030",
    "choice_key": "C",
    "choice_text": "ทั้งสองฟังก์ชันทำงานเหมือนกันทุกประการ",
    "sequence_order": 3
  },
  {
    "id": "c-030-D",
    "question_id": "q-dbsec-030",
    "choice_key": "D",
    "choice_text": "include จะหยุดการทำงานทันที แต่ require_once จะพยายามดาวน์โหลดไฟล์จากอินเทอร์เน็ต",
    "sequence_order": 4
  },
  {
    "id": "c-081-A",
    "question_id": "q-dbsec-081",
    "choice_key": "A",
    "choice_text": "เพื่อไม่ให้แสดงข้อผิดพลาดบนหน้าจอให้ผู้ใช้ทั่วไปหรือผู้โจมตีเห็น แต่ยังบันทึกข้อผิดพลาดลง Error Log เพื่อให้ผู้ดูแลระบบตรวจสอบได้",
    "sequence_order": 1
  },
  {
    "id": "c-081-B",
    "question_id": "q-dbsec-081",
    "choice_key": "B",
    "choice_text": "เพื่อปิดการทำงานของ PHP ชั่วคราว",
    "sequence_order": 2
  },
  {
    "id": "c-081-C",
    "question_id": "q-dbsec-081",
    "choice_key": "C",
    "choice_text": "เพื่อเพิ่มความเร็วในการเชื่อมต่ออินเทอร์เน็ต",
    "sequence_order": 3
  },
  {
    "id": "c-081-D",
    "question_id": "q-dbsec-081",
    "choice_key": "D",
    "choice_text": "เพื่อสั่งให้เซิร์ฟเวอร์ลบไฟล์ที่ Error ทิ้งอัตโนมัติ",
    "sequence_order": 4
  },
  {
    "id": "c-082-A",
    "question_id": "q-dbsec-082",
    "choice_key": "A",
    "choice_text": "Path ที่ตั้งชั่วคราวของไฟล์ที่อัปโหลดขึ้นมาบน Server ก่อนที่จะย้ายไปยังโฟลเดอร์ปลายทางด้วย move_uploaded_file()",
    "sequence_order": 1
  },
  {
    "id": "c-082-B",
    "question_id": "q-dbsec-082",
    "choice_key": "B",
    "choice_text": "ชื่อไฟล์ดั้งเดิมของผู้ใช้บนเครื่อง Client",
    "sequence_order": 2
  },
  {
    "id": "c-082-C",
    "question_id": "q-dbsec-082",
    "choice_key": "C",
    "choice_text": "รหัสข้อผิดพลาดของการอัปโหลด",
    "sequence_order": 3
  },
  {
    "id": "c-082-D",
    "question_id": "q-dbsec-082",
    "choice_key": "D",
    "choice_text": "ขนาดไฟล์ในหน่วยกิโลไบต์",
    "sequence_order": 4
  },
  {
    "id": "c-083-A",
    "question_id": "q-dbsec-083",
    "choice_key": "A",
    "choice_text": "เพราะการแปลงเป็น Integer จะตัดอักขระพิเศษ คำสั่ง SQL และสตริงทั้งหมดทิ้ง เหลือเพียงค่าตัวเลขจำนวนเต็มเท่านั้น",
    "sequence_order": 1
  },
  {
    "id": "c-083-B",
    "question_id": "q-dbsec-083",
    "choice_key": "B",
    "choice_text": "เพราะจะทำให้ตัวแปรนั้นกลายเป็นรหัสผ่าน",
    "sequence_order": 2
  },
  {
    "id": "c-083-C",
    "question_id": "q-dbsec-083",
    "choice_key": "C",
    "choice_text": "เพราะตัวแปรจะถูกบันทึกลงในคุกกี้อัตโนมัติ",
    "sequence_order": 3
  },
  {
    "id": "c-083-D",
    "question_id": "q-dbsec-083",
    "choice_key": "D",
    "choice_text": "เพราะทำให้คำสั่ง SELECT ทำงานได้เฉพาะผู้ดูแลระบบ",
    "sequence_order": 4
  },
  {
    "id": "c-084-A",
    "question_id": "q-dbsec-084",
    "choice_key": "A",
    "choice_text": "เพราะ strip_tags() ไม่สามารถป้องกัน XSS ที่อยู่ใน Event Handler เช่น <img src=\"x\" onerror=\"alert(1)\"> หรือใน Attribute context ได้",
    "sequence_order": 1
  },
  {
    "id": "c-084-B",
    "question_id": "q-dbsec-084",
    "choice_key": "B",
    "choice_text": "เพราะ strip_tags() ใช้ได้เฉพาะกับตัวเลข",
    "sequence_order": 2
  },
  {
    "id": "c-084-C",
    "question_id": "q-dbsec-084",
    "choice_key": "C",
    "choice_text": "เพราะ strip_tags() จะลบตัวอักษรภาษาไทยทิ้งทั้งหมด",
    "sequence_order": 3
  },
  {
    "id": "c-084-D",
    "question_id": "q-dbsec-084",
    "choice_key": "D",
    "choice_text": "เพราะ strip_tags() ทำให้เกิด SQL Injection",
    "sequence_order": 4
  },
  {
    "id": "c-085-A",
    "question_id": "q-dbsec-085",
    "choice_key": "A",
    "choice_text": "json_encode() แปลง PHP Array/Object ให้เป็น JSON String ส่วน json_decode(..., true) แปลง JSON String กลับมาเป็น Associative Array",
    "sequence_order": 1
  },
  {
    "id": "c-085-B",
    "question_id": "q-dbsec-085",
    "choice_key": "B",
    "choice_text": "json_encode() ทำการเข้ารหัสไฟล์ PHP เป็น Base64 ส่วน json_decode() ทำการถอดรหัส",
    "sequence_order": 2
  },
  {
    "id": "c-085-C",
    "question_id": "q-dbsec-085",
    "choice_key": "C",
    "choice_text": "ทั้งสองคำสั่งใช้สำหรับบีบอัดไฟล์ ZIP",
    "sequence_order": 3
  },
  {
    "id": "c-085-D",
    "question_id": "q-dbsec-085",
    "choice_key": "D",
    "choice_text": "json_encode() ลบข้อมูลทั้งหมดทิ้ง",
    "sequence_order": 4
  },
  {
    "id": "c-031-A",
    "question_id": "q-dbsec-031",
    "choice_key": "A",
    "choice_text": "รองรับฐานข้อมูลหลายยี่ห้อ (Database Agnostic), รองรับ OOP, และมี Prepared Statements ในตัว",
    "sequence_order": 1
  },
  {
    "id": "c-031-B",
    "question_id": "q-dbsec-031",
    "choice_key": "B",
    "choice_text": "สามารถทำงานได้โดยไม่ต้องติดตั้งเซิร์ฟเวอร์ MySQL",
    "sequence_order": 2
  },
  {
    "id": "c-031-C",
    "question_id": "q-dbsec-031",
    "choice_key": "C",
    "choice_text": "ทำงานเร็วกว่าการเขียน SQL ปกติ 100 เท่า",
    "sequence_order": 3
  },
  {
    "id": "c-031-D",
    "question_id": "q-dbsec-031",
    "choice_key": "D",
    "choice_text": "ทำการเข้ารหัสข้อมูลในฮาร์ดดิสก์ให้อัตโนมัติ",
    "sequence_order": 4
  },
  {
    "id": "c-032-A",
    "question_id": "q-dbsec-032",
    "choice_key": "A",
    "choice_text": "โครงสร้างคำสั่ง SQL จะถูกคอมไพล์ล่วงหน้าบน Database Engine ทำให้ข้อมูลจากผู้ใช้ถูกมองเป็น Data Literal เสมอ ไม่สามารถเปลี่ยนไวยากรณ์คำสั่งได้",
    "sequence_order": 1
  },
  {
    "id": "c-032-B",
    "question_id": "q-dbsec-032",
    "choice_key": "B",
    "choice_text": "Prepared Statements จะลบอักขระพิเศษทั้งหมดออกจากสตริง",
    "sequence_order": 2
  },
  {
    "id": "c-032-C",
    "question_id": "q-dbsec-032",
    "choice_key": "C",
    "choice_text": "Prepared Statements ทำการแฮชคำสั่งด้วย MD5 ก่อนส่งไปยัง MySQL",
    "sequence_order": 3
  },
  {
    "id": "c-032-D",
    "question_id": "q-dbsec-032",
    "choice_key": "D",
    "choice_text": "ระบบจะไม่อนุญาตให้รับค่าตัวแปรจากภายนอกเข้ามาเลย",
    "sequence_order": 4
  },
  {
    "id": "c-033-A",
    "question_id": "q-dbsec-033",
    "choice_key": "A",
    "choice_text": "ค้นหาผู้ใช้ที่มีชื่อ username ตรงกับสตริง \"' OR 1=1 --\" อย่างตรงไปตรงมา และไม่เกิด SQL Injection",
    "sequence_order": 1
  },
  {
    "id": "c-033-B",
    "question_id": "q-dbsec-033",
    "choice_key": "B",
    "choice_text": "ดึงข้อมูลผู้ใช้ทุกคนในระบบออกมาทั้งหมดเนื่องจากเงื่อนไข 1=1 เป็นจริง",
    "sequence_order": 2
  },
  {
    "id": "c-033-C",
    "question_id": "q-dbsec-033",
    "choice_key": "C",
    "choice_text": "เกิด Syntax Error และเซิร์ฟเวอร์ MySQL หยุดทำงานทันที",
    "sequence_order": 3
  },
  {
    "id": "c-033-D",
    "question_id": "q-dbsec-033",
    "choice_key": "D",
    "choice_text": "ระบบจะทำการลบตาราง users ทิ้งอัตโนมัติ",
    "sequence_order": 4
  },
  {
    "id": "c-040-A",
    "question_id": "q-dbsec-040",
    "choice_key": "A",
    "choice_text": "รองรับอักขระสากลรวมถึง Emoji และป้องกันช่องโหว่การโจมตี SQL Injection ผ่านเทคนิค Multibyte Encoding (GBK / Big5)",
    "sequence_order": 1
  },
  {
    "id": "c-040-B",
    "question_id": "q-dbsec-040",
    "choice_key": "B",
    "choice_text": "บังคับให้ฐานข้อมูลจำกัดขนาดตารางไม่เกิน 4GB",
    "sequence_order": 2
  },
  {
    "id": "c-040-C",
    "question_id": "q-dbsec-040",
    "choice_key": "C",
    "choice_text": "ทำให้การเชื่อมต่อเปลี่ยนไปใช้โปรโตคอล Bluetooth",
    "sequence_order": 3
  },
  {
    "id": "c-040-D",
    "question_id": "q-dbsec-040",
    "choice_key": "D",
    "choice_text": "เป็นคำสั่งสำรองข้อมูลอัตโนมัติทุก 4 นาที",
    "sequence_order": 4
  },
  {
    "id": "c-034-A",
    "question_id": "q-dbsec-034",
    "choice_key": "A",
    "choice_text": "fetch() จะดึงข้อมูลทีละ 1 แถว (Row) ส่วน fetchAll() จะดึงข้อมูลทุกแถวที่ตรงกับเงื่อนไขมาเก็บไว้ใน Array ทั้งหมด",
    "sequence_order": 1
  },
  {
    "id": "c-034-B",
    "question_id": "q-dbsec-034",
    "choice_key": "B",
    "choice_text": "fetch() ใช้สำหรับคำสั่ง INSERT ส่วน fetchAll() ใช้สำหรับคำสั่ง DELETE",
    "sequence_order": 2
  },
  {
    "id": "c-034-C",
    "question_id": "q-dbsec-034",
    "choice_key": "C",
    "choice_text": "fetchAll() ทำงานได้เฉพาะกับตารางที่มีข้อมูลไม่เกิน 5 แถว",
    "sequence_order": 3
  },
  {
    "id": "c-034-D",
    "question_id": "q-dbsec-034",
    "choice_key": "D",
    "choice_text": "fetch() ทำการเข้ารหัสข้อมูลที่ดึงมาด้วยรหัสผ่าน",
    "sequence_order": 4
  },
  {
    "id": "c-035-A",
    "question_id": "q-dbsec-035",
    "choice_key": "A",
    "choice_text": "Positional Placeholder (ตัวแทนตำแหน่งสำหรับผูกค่าตัวแปร)",
    "sequence_order": 1
  },
  {
    "id": "c-035-B",
    "question_id": "q-dbsec-035",
    "choice_key": "B",
    "choice_text": "Wildcard สำหรับค้นหาคำ",
    "sequence_order": 2
  },
  {
    "id": "c-035-C",
    "question_id": "q-dbsec-035",
    "choice_key": "C",
    "choice_text": "เครื่องหมายบังคับลบข้อมูล",
    "sequence_order": 3
  },
  {
    "id": "c-035-D",
    "question_id": "q-dbsec-035",
    "choice_key": "D",
    "choice_text": "คำสั่งเพิ่ม Primary Key",
    "sequence_order": 4
  },
  {
    "id": "c-036-A",
    "question_id": "q-dbsec-036",
    "choice_key": "A",
    "choice_text": "bindParam() ผูกตัวแปรแบบ Reference (อ่านค่าตอน execute()) ส่วน bindValue() ผูกค่าข้อมูลทันที ณ จุดที่เรียกคำสั่ง",
    "sequence_order": 1
  },
  {
    "id": "c-036-B",
    "question_id": "q-dbsec-036",
    "choice_key": "B",
    "choice_text": "bindParam() ใช้กับสตริง ส่วน bindValue() ใช้กับตัวเลขเท่านั้น",
    "sequence_order": 2
  },
  {
    "id": "c-036-C",
    "question_id": "q-dbsec-036",
    "choice_key": "C",
    "choice_text": "bindValue() บังคับให้ข้อมูลต้องไม่ซ้ำกับในตาราง",
    "sequence_order": 3
  },
  {
    "id": "c-036-D",
    "question_id": "q-dbsec-036",
    "choice_key": "D",
    "choice_text": "ทั้งสองคำสั่งทำงานเหมือนกันทุกประการ",
    "sequence_order": 4
  },
  {
    "id": "c-037-A",
    "question_id": "q-dbsec-037",
    "choice_key": "A",
    "choice_text": "คืนค่ารหัส ID ล่าสุดที่เป็น Auto-Increment ที่เพิ่งถูก INSERT ลงในฐานข้อมูล",
    "sequence_order": 1
  },
  {
    "id": "c-037-B",
    "question_id": "q-dbsec-037",
    "choice_key": "B",
    "choice_text": "คืนค่าจำนวนแถวทั้งหมดในตาราง",
    "sequence_order": 2
  },
  {
    "id": "c-037-C",
    "question_id": "q-dbsec-037",
    "choice_key": "C",
    "choice_text": "คืนค่ารหัส Session ID ของผู้ใช้",
    "sequence_order": 3
  },
  {
    "id": "c-037-D",
    "question_id": "q-dbsec-037",
    "choice_key": "D",
    "choice_text": "ลบแถวสุดท้ายที่เพิ่งเพิ่มเข้าไป",
    "sequence_order": 4
  },
  {
    "id": "c-038-A",
    "question_id": "q-dbsec-038",
    "choice_key": "A",
    "choice_text": "ผู้โจมตีใช้คำสั่ง UNION SELECT เพื่อรวมผลลัพธ์จากตารางอื่น (เช่น ตารางรหัสผ่าน) เข้ากับผลลัพธ์ของ Query เดิมและแสดงผลออกมาทางหน้าจอ",
    "sequence_order": 1
  },
  {
    "id": "c-038-B",
    "question_id": "q-dbsec-038",
    "choice_key": "B",
    "choice_text": "ผู้โจมตีทำให้ฐานข้อมูลทำงานหนักจน CPU ทำงาน 100%",
    "sequence_order": 2
  },
  {
    "id": "c-038-C",
    "question_id": "q-dbsec-038",
    "choice_key": "C",
    "choice_text": "ผู้โจมตีทำการส่งอีเมลขยะเข้าไปในตาราง",
    "sequence_order": 3
  },
  {
    "id": "c-038-D",
    "question_id": "q-dbsec-038",
    "choice_key": "D",
    "choice_text": "ผู้โจมตีทำการเปลี่ยนชื่อผู้ดูแลระบบเป็นภาษาอื่น",
    "sequence_order": 4
  },
  {
    "id": "c-039-A",
    "question_id": "q-dbsec-039",
    "choice_key": "A",
    "choice_text": "CREATE TABLE users ( id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) NOT NULL );",
    "sequence_order": 1
  },
  {
    "id": "c-039-B",
    "question_id": "q-dbsec-039",
    "choice_key": "B",
    "choice_text": "MAKE TABLE users ( id NUMBER AUTO, username TEXT );",
    "sequence_order": 2
  },
  {
    "id": "c-039-C",
    "question_id": "q-dbsec-039",
    "choice_key": "C",
    "choice_text": "NEW TABLE users ( id PRIMARY KEY, username STRING );",
    "sequence_order": 3
  },
  {
    "id": "c-039-D",
    "question_id": "q-dbsec-039",
    "choice_key": "D",
    "choice_text": "INSERT TABLE users ( id AUTO, username VARCHAR );",
    "sequence_order": 4
  },
  {
    "id": "c-086-A",
    "question_id": "q-dbsec-086",
    "choice_key": "A",
    "choice_text": "บังคับให้ใช้ Prepared Statements แบบ Native ของ Database Engine จริงๆ แทนการ Emulate สตริงฝั่ง PHP ช่วยป้องกันช่องโหว่ SQL Injection บางกรณีที่หลบหลีกผ่าน Encoding ได้",
    "sequence_order": 1
  },
  {
    "id": "c-086-B",
    "question_id": "q-dbsec-086",
    "choice_key": "B",
    "choice_text": "ทำให้ฐานข้อมูลปิดการใช้งานรหัสผ่าน",
    "sequence_order": 2
  },
  {
    "id": "c-086-C",
    "question_id": "q-dbsec-086",
    "choice_key": "C",
    "choice_text": "ลบตารางทั้งหมดที่ไม่มีการใช้งานออก",
    "sequence_order": 3
  },
  {
    "id": "c-086-D",
    "question_id": "q-dbsec-086",
    "choice_key": "D",
    "choice_text": "สั่งให้บันทึกคำสั่ง SQL ลงในไฟล์ Text",
    "sequence_order": 4
  },
  {
    "id": "c-087-A",
    "question_id": "q-dbsec-087",
    "choice_key": "A",
    "choice_text": "$stmt = $pdo->prepare(\"SELECT * FROM products WHERE name LIKE :name\"); $stmt->execute([\":name\" => \"%\" . $keyword . \"%\"]);",
    "sequence_order": 1
  },
  {
    "id": "c-087-B",
    "question_id": "q-dbsec-087",
    "choice_key": "B",
    "choice_text": "$stmt = $pdo->prepare(\"SELECT * FROM products WHERE name LIKE %:name%\");",
    "sequence_order": 2
  },
  {
    "id": "c-087-C",
    "question_id": "q-dbsec-087",
    "choice_key": "C",
    "choice_text": "$stmt = $pdo->prepare(\"SELECT * FROM products WHERE name LIKE '%\" . $keyword . \"%'\");",
    "sequence_order": 3
  },
  {
    "id": "c-087-D",
    "question_id": "q-dbsec-087",
    "choice_key": "D",
    "choice_text": "$stmt = $pdo->prepare(\"SELECT * FROM products WHERE name = LIKE(?)\");",
    "sequence_order": 4
  },
  {
    "id": "c-088-A",
    "question_id": "q-dbsec-088",
    "choice_key": "A",
    "choice_text": "เพราะ Prepared Statement Parameter Binding ใช้ได้เฉพาะกับค่า Literal Values เท่านั้น ไม่สามารถใช้กับ Identifier เช่น ชื่อ Column หรือคีย์เวิร์ด ASC/DESC ได้ จึงต้องใช้วิธี Whitelist Validation",
    "sequence_order": 1
  },
  {
    "id": "c-088-B",
    "question_id": "q-dbsec-088",
    "choice_key": "B",
    "choice_text": "เพราะ MySQL ไม่อนุญาตให้เรียงลำดับข้อมูลเกิน 10 รายการ",
    "sequence_order": 2
  },
  {
    "id": "c-088-C",
    "question_id": "q-dbsec-088",
    "choice_key": "C",
    "choice_text": "เพราะคำสั่ง ORDER BY ทำงานเฉพาะบนเครื่อง Client",
    "sequence_order": 3
  },
  {
    "id": "c-088-D",
    "question_id": "q-dbsec-088",
    "choice_key": "D",
    "choice_text": "เพราะจะทำให้ข้อมูลในตารางสลับลำดับกันถาวร",
    "sequence_order": 4
  },
  {
    "id": "c-089-A",
    "question_id": "q-dbsec-089",
    "choice_key": "A",
    "choice_text": "ผู้โจมตีแทรกคำสั่งหน่วงเวลา เช่น SLEEP(5) หากหน้าเว็บตอบสนองช้าลง 5 วินาที แสดงว่าเงื่อนไขเป็นจริงและเซิร์ฟเวอร์มีช่องโหว่ SQL Injection",
    "sequence_order": 1
  },
  {
    "id": "c-089-B",
    "question_id": "q-dbsec-089",
    "choice_key": "B",
    "choice_text": "ผู้โจมตีทำการเปลี่ยนเวลาบนนาฬิกาของเซิร์ฟเวอร์",
    "sequence_order": 2
  },
  {
    "id": "c-089-C",
    "question_id": "q-dbsec-089",
    "choice_key": "C",
    "choice_text": "ผู้โจมตีทำการโจมตีเฉพาะช่วงเวลากลางดึก",
    "sequence_order": 3
  },
  {
    "id": "c-089-D",
    "question_id": "q-dbsec-089",
    "choice_key": "D",
    "choice_text": "ผู้โจมตีส่งอีเมลให้เซิร์ฟเวอร์นับถอยหลัง",
    "sequence_order": 4
  },
  {
    "id": "c-090-A",
    "question_id": "q-dbsec-090",
    "choice_key": "A",
    "choice_text": "DROP TABLE ลบทั้งโครงสร้างตารางและข้อมูลทิ้งทั้งหมด ส่วน TRUNCATE TABLE ลบเฉพาะข้อมูลทั้งหมดในตารางแต่ยังคงโครงสร้างตารางเดิมไว้",
    "sequence_order": 1
  },
  {
    "id": "c-090-B",
    "question_id": "q-dbsec-090",
    "choice_key": "B",
    "choice_text": "DROP TABLE ใช้สำหรับแก้ไขชื่อตาราง",
    "sequence_order": 2
  },
  {
    "id": "c-090-C",
    "question_id": "q-dbsec-090",
    "choice_key": "C",
    "choice_text": "TRUNCATE TABLE ทำการสำรองข้อมูลตารางเก็บไว้",
    "sequence_order": 3
  },
  {
    "id": "c-090-D",
    "question_id": "q-dbsec-090",
    "choice_key": "D",
    "choice_text": "ทั้งสองคำสั่งทำงานเหมือนกันทุกประการ",
    "sequence_order": 4
  },
  {
    "id": "c-041-A",
    "question_id": "q-dbsec-041",
    "choice_key": "A",
    "choice_text": "คำสั่งจะทำงานกับแถวข้อมูลทุกแถว (All Rows) ในตารางทั้งหมด ส่งผลให้ข้อมูลทั้งตารางถูกเปลี่ยนหรือลบหายหมด",
    "sequence_order": 1
  },
  {
    "id": "c-041-B",
    "question_id": "q-dbsec-041",
    "choice_key": "B",
    "choice_text": "ระบบ MySQL จะปฏิเสธคำสั่งและไม่ทำอะไรเลย",
    "sequence_order": 2
  },
  {
    "id": "c-041-C",
    "question_id": "q-dbsec-041",
    "choice_key": "C",
    "choice_text": "จะแก้ไขหรือลบเฉพาะแถวแรกสุด (Row 1) เท่านั้น",
    "sequence_order": 3
  },
  {
    "id": "c-041-D",
    "question_id": "q-dbsec-041",
    "choice_key": "D",
    "choice_text": "ระบบจะถามการยืนยันบนหน้าจอ Terminal ของ Server ก่อน",
    "sequence_order": 4
  },
  {
    "id": "c-042-A",
    "question_id": "q-dbsec-042",
    "choice_key": "A",
    "choice_text": "เมื่อเกิด Error ในคำสั่ง SQL ระบบจะโยน PDOException ออกมา ทำให้สามารถดักจับด้วยบล็อก try-catch และทำ Database Rollback ได้อย่างปลอดภัย",
    "sequence_order": 1
  },
  {
    "id": "c-042-B",
    "question_id": "q-dbsec-042",
    "choice_key": "B",
    "choice_text": "ทำให้ Database ซ่อมแซมตารางที่พังให้อัตโนมัติ",
    "sequence_order": 2
  },
  {
    "id": "c-042-C",
    "question_id": "q-dbsec-042",
    "choice_key": "C",
    "choice_text": "บังคับให้คำสั่ง SQL ทุกคำสั่งทำงานเร็วขึ้นเป็น 2 เท่า",
    "sequence_order": 3
  },
  {
    "id": "c-042-D",
    "question_id": "q-dbsec-042",
    "choice_key": "D",
    "choice_text": "ปิดการแจ้งเตือน Error ทั้งหมดและไม่บันทึก Log ใดๆ",
    "sequence_order": 4
  },
  {
    "id": "c-043-A",
    "question_id": "q-dbsec-043",
    "choice_key": "A",
    "choice_text": "เพราะข้อความ Error อาจเปิดเผยโครงสร้างตาราง, ชื่อคอลัมน์, เวอร์ชันฐานข้อมูล หรือโค้ด SQL ซึ่งแฮกเกอร์ใช้เป็นข้อมูลในการเจาะระบบต่อได้",
    "sequence_order": 1
  },
  {
    "id": "c-043-B",
    "question_id": "q-dbsec-043",
    "choice_key": "B",
    "choice_text": "เพราะทำให้หน้าเว็บโหลดช้าลงอย่างมาก",
    "sequence_order": 2
  },
  {
    "id": "c-043-C",
    "question_id": "q-dbsec-043",
    "choice_key": "C",
    "choice_text": "เพราะเบราว์เซอร์จะบล็อกหน้าเว็บเป็นสีแดงทันที",
    "sequence_order": 3
  },
  {
    "id": "c-043-D",
    "question_id": "q-dbsec-043",
    "choice_key": "D",
    "choice_text": "เพราะผู้ใช้จะไม่เข้าใจภาษาอังกฤษ",
    "sequence_order": 4
  },
  {
    "id": "c-044-A",
    "question_id": "q-dbsec-044",
    "choice_key": "A",
    "choice_text": "ใช้ HTTP Method POST ร่วมกับปุ่มยืนยัน (Confirmation Dialog) และส่งคำขอไปประมวลผลใน delete.php พร้อม Prepared Statements",
    "sequence_order": 1
  },
  {
    "id": "c-044-B",
    "question_id": "q-dbsec-044",
    "choice_key": "B",
    "choice_text": "สร้างเป็นลิงก์ <a href=\"delete.php?id=1\"> เพื่อให้คลิกแล้วลบได้ทันที",
    "sequence_order": 2
  },
  {
    "id": "c-044-C",
    "question_id": "q-dbsec-044",
    "choice_key": "C",
    "choice_text": "ให้ผู้ใช้พิมพ์รหัสผ่านของฐานข้อมูล MySQL ทุกครั้งก่อนลบ",
    "sequence_order": 3
  },
  {
    "id": "c-044-D",
    "question_id": "q-dbsec-044",
    "choice_key": "D",
    "choice_text": "อนุญาตให้ลบข้อมูลได้เฉพาะผ่านโปรแกรม phpMyAdmin เท่านั้น",
    "sequence_order": 4
  },
  {
    "id": "c-045-A",
    "question_id": "q-dbsec-045",
    "choice_key": "A",
    "choice_text": "ใช้ครอบข้อมูลทุกครั้งก่อนนำค่าจากฐานข้อมูลหรือตัวแปรไปแสดงผล (Echo) ในแท็ก HTML เพื่อป้องกัน XSS",
    "sequence_order": 1
  },
  {
    "id": "c-045-B",
    "question_id": "q-dbsec-045",
    "choice_key": "B",
    "choice_text": "ใช้แฮชรหัสผ่านก่อนบันทึกลงฐานข้อมูล",
    "sequence_order": 2
  },
  {
    "id": "c-045-C",
    "question_id": "q-dbsec-045",
    "choice_key": "C",
    "choice_text": "ใช้ตรวจสอบว่าข้อมูลเป็นตัวเลขจำนวนเต็มหรือไม่",
    "sequence_order": 3
  },
  {
    "id": "c-045-D",
    "question_id": "q-dbsec-045",
    "choice_key": "D",
    "choice_text": "ใช้บีบอัดไฟล์ภาพก่อนอัปโหลด",
    "sequence_order": 4
  },
  {
    "id": "c-046-A",
    "question_id": "q-dbsec-046",
    "choice_key": "A",
    "choice_text": "จำนวนแถวของข้อมูลที่ได้รับผลกระทบหรือถูกเปลี่ยนแปลงจากการรันคำสั่ง SQL ล่าสุด",
    "sequence_order": 1
  },
  {
    "id": "c-046-B",
    "question_id": "q-dbsec-046",
    "choice_key": "B",
    "choice_text": "จำนวนคอลัมน์ทั้งหมดของตาราง",
    "sequence_order": 2
  },
  {
    "id": "c-046-C",
    "question_id": "q-dbsec-046",
    "choice_key": "C",
    "choice_text": "เวลาที่ใช้ในการประมวลผลคำสั่ง",
    "sequence_order": 3
  },
  {
    "id": "c-046-D",
    "question_id": "q-dbsec-046",
    "choice_key": "D",
    "choice_text": "จำนวนผู้ใช้ที่กำลังออนไลน์อยู่ในระบบ",
    "sequence_order": 4
  },
  {
    "id": "c-047-A",
    "question_id": "q-dbsec-047",
    "choice_key": "A",
    "choice_text": "edit.php (ดึงข้อมูลเดิมมาแสดงใน Form) -> ส่งข้อมูลผ่าน POST ไปยัง update.php (ตรวจสอบความถูกต้อง, รัน UPDATE ด้วย Prepared Statements และ Redirect กลับ)",
    "sequence_order": 1
  },
  {
    "id": "c-047-B",
    "question_id": "q-dbsec-047",
    "choice_key": "B",
    "choice_text": "update.php แสดงฟอร์ม -> ส่งข้อมูลไปบันทึกที่ index.php โดยตรง",
    "sequence_order": 2
  },
  {
    "id": "c-047-C",
    "question_id": "q-dbsec-047",
    "choice_key": "C",
    "choice_text": "ให้ผู้ใช้เปิดไฟล์ config.php แล้วแก้ไขค่าตัวแปรโดยตรง",
    "sequence_order": 3
  },
  {
    "id": "c-047-D",
    "question_id": "q-dbsec-047",
    "choice_key": "D",
    "choice_text": "ส่งข้อมูลแก้ไขทั้งหมดผ่านทางอีเมลของผู้ดูแลระบบ",
    "sequence_order": 4
  },
  {
    "id": "c-048-A",
    "question_id": "q-dbsec-048",
    "choice_key": "A",
    "choice_text": "เมื่อต้องทำงานกับชุดคำสั่ง SQL หลายคำสั่งที่เกี่ยวเนื่องกัน (เช่น การตัดเงินและเพิ่มยอดเงิน) หากมีคำสั่งใดล้มเหลว จะต้องยกเลิกผลการทำงานทั้งหมดเพื่อรักษาความถูกต้องของข้อมูล (ACID)",
    "sequence_order": 1
  },
  {
    "id": "c-048-B",
    "question_id": "q-dbsec-048",
    "choice_key": "B",
    "choice_text": "เมื่อต้องการให้คำสั่ง SQL ทำงานเฉพาะเวลากลางคืน",
    "sequence_order": 2
  },
  {
    "id": "c-048-C",
    "question_id": "q-dbsec-048",
    "choice_key": "C",
    "choice_text": "เมื่อต้องการแปลงรหัสผ่านเป็นตัวพิมพ์ใหญ่",
    "sequence_order": 3
  },
  {
    "id": "c-048-D",
    "question_id": "q-dbsec-048",
    "choice_key": "D",
    "choice_text": "เมื่อต้องการล้างแคชของเบราว์เซอร์",
    "sequence_order": 4
  },
  {
    "id": "c-049-A",
    "question_id": "q-dbsec-049",
    "choice_key": "A",
    "choice_text": "ป้องกันไม่ให้เบราว์เซอร์ส่งข้อมูลซ้ำ (Duplicate Form Submission) เมื่อผู้ใช้กดปุ่ม Refresh (F5) หน้านั้น",
    "sequence_order": 1
  },
  {
    "id": "c-049-B",
    "question_id": "q-dbsec-049",
    "choice_key": "B",
    "choice_text": "ทำการปิดเบราว์เซอร์ของผู้ใช้ทันที",
    "sequence_order": 2
  },
  {
    "id": "c-049-C",
    "question_id": "q-dbsec-049",
    "choice_key": "C",
    "choice_text": "ล้างข้อมูลในตารางฐานข้อมูลทั้งหมด",
    "sequence_order": 3
  },
  {
    "id": "c-049-D",
    "question_id": "q-dbsec-049",
    "choice_key": "D",
    "choice_text": "ทำการรีสตาร์ตเซิร์ฟเวอร์ MySQL",
    "sequence_order": 4
  },
  {
    "id": "c-050-A",
    "question_id": "q-dbsec-050",
    "choice_key": "A",
    "choice_text": "mb_strlen() นับความยาวตามจำนวนตัวอักษรจริง (Character Count) ส่วน strlen() นับตามจำนวนไบต์ (ซึ่งอักษรไทย 1 ตัวกินพื้นที่ 3 ไบต์ใน UTF-8)",
    "sequence_order": 1
  },
  {
    "id": "c-050-B",
    "question_id": "q-dbsec-050",
    "choice_key": "B",
    "choice_text": "mb_strlen() ใช้งานได้เฉพาะบนระบบปฏิบัติการ Mac",
    "sequence_order": 2
  },
  {
    "id": "c-050-C",
    "question_id": "q-dbsec-050",
    "choice_key": "C",
    "choice_text": "strlen() ปลอดภัยกว่าเพราะคำนวณด้วยอัลกอริทึม SHA-256",
    "sequence_order": 3
  },
  {
    "id": "c-050-D",
    "question_id": "q-dbsec-050",
    "choice_key": "D",
    "choice_text": "ทั้งสองฟังก์ชันคืนค่าตัวเลขที่เท่ากันเสมอ",
    "sequence_order": 4
  },
  {
    "id": "c-091-A",
    "question_id": "q-dbsec-091",
    "choice_key": "A",
    "choice_text": "Soft Delete เป็นการซ่อนข้อมูลไม่ให้แสดงบนหน้าเว็บแต่ข้อมูลยังคงอยู่ในฐานข้อมูลสำหรับการ Audit หรือ Restore ส่วน Hard Delete จะลบแถวข้อมูลออกจากฮาร์ดดิสก์ถาวร",
    "sequence_order": 1
  },
  {
    "id": "c-091-B",
    "question_id": "q-dbsec-091",
    "choice_key": "B",
    "choice_text": "Soft Delete ใช้เวลาลบเร็วกว่า 100 เท่า",
    "sequence_order": 2
  },
  {
    "id": "c-091-C",
    "question_id": "q-dbsec-091",
    "choice_key": "C",
    "choice_text": "Hard Delete ใช้เฉพาะกับผู้ดูแลระบบ",
    "sequence_order": 3
  },
  {
    "id": "c-091-D",
    "question_id": "q-dbsec-091",
    "choice_key": "D",
    "choice_text": "ทั้งสองวิธีให้ผลลัพธ์เหมือนกันทุกประการ",
    "sequence_order": 4
  },
  {
    "id": "c-092-A",
    "question_id": "q-dbsec-092",
    "choice_key": "A",
    "choice_text": "ข้ามข้อมูล 20 รายการแรก แล้วดึงข้อมูลถัดไปจำนวน 10 รายการ (หน้า 3)",
    "sequence_order": 1
  },
  {
    "id": "c-092-B",
    "question_id": "q-dbsec-092",
    "choice_key": "B",
    "choice_text": "ดึงข้อมูล 20 รายการแรก แล้วลบ 10 รายการหลัง",
    "sequence_order": 2
  },
  {
    "id": "c-092-C",
    "question_id": "q-dbsec-092",
    "choice_key": "C",
    "choice_text": "ดึงข้อมูลทั้งหมด 200 รายการ",
    "sequence_order": 3
  },
  {
    "id": "c-092-D",
    "question_id": "q-dbsec-092",
    "choice_key": "D",
    "choice_text": "ทำการสุ่มข้อมูล 10 รายการจาก 20 ตาราง",
    "sequence_order": 4
  },
  {
    "id": "c-093-A",
    "question_id": "q-dbsec-093",
    "choice_key": "A",
    "choice_text": "ตรวจสอบ MIME Type ด้วย finfo_file(), สุ่มตั้งชื่อไฟล์ใหม่ด้วย UUID/Random String, จำกัดขนาดไฟล์ และบันทึกไว้นอก Web Root Directory",
    "sequence_order": 1
  },
  {
    "id": "c-093-B",
    "question_id": "q-dbsec-093",
    "choice_key": "B",
    "choice_text": "บันทึกไฟล์ด้วยชื่อเดิมของผู้ใช้ไว้ในโฟลเดอร์ root ของเว็บ",
    "sequence_order": 2
  },
  {
    "id": "c-093-C",
    "question_id": "q-dbsec-093",
    "choice_key": "C",
    "choice_text": "ตรวจสอบเฉพาะนามสกุลไฟล์จาก $_FILES['name'] เพียงอย่างเดียว",
    "sequence_order": 3
  },
  {
    "id": "c-093-D",
    "question_id": "q-dbsec-093",
    "choice_key": "D",
    "choice_text": "อนุญาตให้อัปโหลดไฟล์ .php เพื่อให้เว็บรันได้เร็วขึ้น",
    "sequence_order": 4
  },
  {
    "id": "c-094-A",
    "question_id": "q-dbsec-094",
    "choice_key": "A",
    "choice_text": "เพราะแม้จะส่ง Header Redirect แล้ว แต่สคริปต์ PHP บรรทัดถัดไปยังคงประมวลผลต่อไปจนจบไฟล์ ซึ่งอาจทำให้โค้ดที่ไม่ควรทำงานถูกรันต่อ",
    "sequence_order": 1
  },
  {
    "id": "c-094-B",
    "question_id": "q-dbsec-094",
    "choice_key": "B",
    "choice_text": "เพื่อปิดการทำงานของฐานข้อมูล",
    "sequence_order": 2
  },
  {
    "id": "c-094-C",
    "question_id": "q-dbsec-094",
    "choice_key": "C",
    "choice_text": "เพื่อให้เบราว์เซอร์ลบประวัติการเข้าชม",
    "sequence_order": 3
  },
  {
    "id": "c-094-D",
    "question_id": "q-dbsec-094",
    "choice_key": "D",
    "choice_text": "เป็นกฎไวยากรณ์บังคับของ HTML",
    "sequence_order": 4
  },
  {
    "id": "c-095-A",
    "question_id": "q-dbsec-095",
    "choice_key": "A",
    "choice_text": "Atomicity, Consistency, Isolation, Durability",
    "sequence_order": 1
  },
  {
    "id": "c-095-B",
    "question_id": "q-dbsec-095",
    "choice_key": "B",
    "choice_text": "Access, Control, Identity, Database",
    "sequence_order": 2
  },
  {
    "id": "c-095-C",
    "question_id": "q-dbsec-095",
    "choice_key": "C",
    "choice_text": "Authentication, Cryptography, Integrity, Decryption",
    "sequence_order": 3
  },
  {
    "id": "c-095-D",
    "question_id": "q-dbsec-095",
    "choice_key": "D",
    "choice_text": "Array, Class, Interface, Data",
    "sequence_order": 4
  },
  {
    "id": "c-051-A",
    "question_id": "q-dbsec-051",
    "choice_key": "A",
    "choice_text": "Authentication คือการยืนยันว่าคุณคือใคร (Login) ส่วน Authorization คือการตรวจสอบว่าคุณมีสิทธิ์ทำอะไรได้บ้าง (Permissions/Roles)",
    "sequence_order": 1
  },
  {
    "id": "c-051-B",
    "question_id": "q-dbsec-051",
    "choice_key": "B",
    "choice_text": "Authentication ใช้กับระบบฐานข้อมูล ส่วน Authorization ใช้กับเว็บเบราว์เซอร์",
    "sequence_order": 2
  },
  {
    "id": "c-051-C",
    "question_id": "q-dbsec-051",
    "choice_key": "C",
    "choice_text": "Authentication เกิดขึ้นตอน Logout ส่วน Authorization เกิดขึ้นตอน Login",
    "sequence_order": 3
  },
  {
    "id": "c-051-D",
    "question_id": "q-dbsec-051",
    "choice_key": "D",
    "choice_text": "ทั้งสองคำมีความหมายและกระบวนการทำงานเหมือนกันทุกประการ",
    "sequence_order": 4
  },
  {
    "id": "c-052-A",
    "question_id": "q-dbsec-052",
    "choice_key": "A",
    "choice_text": "เพราะ md5 และ sha1 เป็นฟังก์ชันที่คำนวณเร็วเกินไป ไม่มี Work Factor ทำให้ถูกถอดรหัสด้วย Rainbow Table หรือ GPU Brute-force ได้ภายในไม่กี่วินาที",
    "sequence_order": 1
  },
  {
    "id": "c-052-B",
    "question_id": "q-dbsec-052",
    "choice_key": "B",
    "choice_text": "เพราะ md5 ไม่สามารถจัดเก็บในคอลัมน์ VARCHAR ได้",
    "sequence_order": 2
  },
  {
    "id": "c-052-C",
    "question_id": "q-dbsec-052",
    "choice_key": "C",
    "choice_text": "เพราะ md5 ใช้งานได้เฉพาะบนระบบปฏิบัติการ Windows เท่านั้น",
    "sequence_order": 3
  },
  {
    "id": "c-052-D",
    "question_id": "q-dbsec-052",
    "choice_key": "D",
    "choice_text": "เพราะ PHP 8 ได้ตัดฟังก์ชัน md5 ออกจากตัวภาษาแล้ว",
    "sequence_order": 4
  },
  {
    "id": "c-053-A",
    "question_id": "q-dbsec-053",
    "choice_key": "A",
    "choice_text": "เพราะ bcrypt จะสร้าง Cryptographically Secure Random Salt ขนาด 22 ตัวอักษร และฝังรวมไว้ในสตริงผลลัพธ์ 60 ตัวอักษรพร้อมกับ Cost และ Hash อยู่แล้ว",
    "sequence_order": 1
  },
  {
    "id": "c-053-B",
    "question_id": "q-dbsec-053",
    "choice_key": "B",
    "choice_text": "เพราะ bcrypt ไม่จำเป็นต้องใช้ Salt ในการคำนวณความปลอดภัย",
    "sequence_order": 2
  },
  {
    "id": "c-053-C",
    "question_id": "q-dbsec-053",
    "choice_key": "C",
    "choice_text": "เพราะ Salt จะถูกบันทึกไว้ใน RAM ของเครื่องเซิร์ฟเวอร์ตลอดกาล",
    "sequence_order": 3
  },
  {
    "id": "c-053-D",
    "question_id": "q-dbsec-053",
    "choice_key": "D",
    "choice_text": "เพราะฐานข้อมูล MySQL มีระบบสร้าง Salt ในตัวอยู่แล้ว",
    "sequence_order": 4
  },
  {
    "id": "c-054-A",
    "question_id": "q-dbsec-054",
    "choice_key": "A",
    "choice_text": "password_verify($passwordInput, $hashedPasswordFromDB)",
    "sequence_order": 1
  },
  {
    "id": "c-054-B",
    "question_id": "q-dbsec-054",
    "choice_key": "B",
    "choice_text": "if (md5($passwordInput) == $hashedPasswordFromDB)",
    "sequence_order": 2
  },
  {
    "id": "c-054-C",
    "question_id": "q-dbsec-054",
    "choice_key": "C",
    "choice_text": "password_check($passwordInput, $hashedPasswordFromDB)",
    "sequence_order": 3
  },
  {
    "id": "c-054-D",
    "question_id": "q-dbsec-054",
    "choice_key": "D",
    "choice_text": "strcmp($passwordInput, $hashedPasswordFromDB)",
    "sequence_order": 4
  },
  {
    "id": "c-055-A",
    "question_id": "q-dbsec-055",
    "choice_key": "A",
    "choice_text": "$_SESSION = []; ล้างตัวแปร -> ลบคุกกี้ Session บนเบราว์เซอร์ -> เรียก session_destroy();",
    "sequence_order": 1
  },
  {
    "id": "c-055-B",
    "question_id": "q-dbsec-055",
    "choice_key": "B",
    "choice_text": "เรียกเพียง header(\"Location: login.php\");",
    "sequence_order": 2
  },
  {
    "id": "c-055-C",
    "question_id": "q-dbsec-055",
    "choice_key": "C",
    "choice_text": "ลบตาราง users ในฐานข้อมูลทิ้ง",
    "sequence_order": 3
  },
  {
    "id": "c-055-D",
    "question_id": "q-dbsec-055",
    "choice_key": "D",
    "choice_text": "ปิดแท็บเบราว์เซอร์โดยไม่ต้องเขียนโค้ดใดๆ",
    "sequence_order": 4
  },
  {
    "id": "c-056-A",
    "question_id": "q-dbsec-056",
    "choice_key": "A",
    "choice_text": "if (empty($_SESSION['user_id'])) { header('Location: login.php'); exit; }",
    "sequence_order": 1
  },
  {
    "id": "c-056-B",
    "question_id": "q-dbsec-056",
    "choice_key": "B",
    "choice_text": "if (isset($_GET['admin'])) { echo \"Welcome\"; }",
    "sequence_order": 2
  },
  {
    "id": "c-056-C",
    "question_id": "q-dbsec-056",
    "choice_key": "C",
    "choice_text": "if ($_COOKIE['logged_in'] === 'yes')",
    "sequence_order": 3
  },
  {
    "id": "c-056-D",
    "question_id": "q-dbsec-056",
    "choice_key": "D",
    "choice_text": "if ($password === '1234')",
    "sequence_order": 4
  },
  {
    "id": "c-057-A",
    "question_id": "q-dbsec-057",
    "choice_key": "A",
    "choice_text": "ความยาว 60 ตัวอักษร (ขึ้นต้นด้วย $2y$) และควรตั้งขนาดคอลัมน์เป็น VARCHAR(255)",
    "sequence_order": 1
  },
  {
    "id": "c-057-B",
    "question_id": "q-dbsec-057",
    "choice_key": "B",
    "choice_text": "ความยาว 32 ตัวอักษร และตั้งเป็น CHAR(32)",
    "sequence_order": 2
  },
  {
    "id": "c-057-C",
    "question_id": "q-dbsec-057",
    "choice_key": "C",
    "choice_text": "ความยาว 128 ตัวอักษร และตั้งเป็น TEXT",
    "sequence_order": 3
  },
  {
    "id": "c-057-D",
    "question_id": "q-dbsec-057",
    "choice_key": "D",
    "choice_text": "ความยาวไม่แน่นอนขึ้นอยู่กับความยาวรหัสผ่านเดิม",
    "sequence_order": 4
  },
  {
    "id": "c-058-A",
    "question_id": "q-dbsec-058",
    "choice_key": "A",
    "choice_text": "ควบคุมจำนวนรอบการคำนวณ Work Factor (2^cost รอบ) เพื่อทำให้การคำนวณแฮชช้าลงอย่างตั้งใจ ชะลอการโจมตีแบบ Brute-force",
    "sequence_order": 1
  },
  {
    "id": "c-058-B",
    "question_id": "q-dbsec-058",
    "choice_key": "B",
    "choice_text": "กำหนดค่าใช้จ่ายรายเดือนของเซิร์ฟเวอร์ MySQL",
    "sequence_order": 2
  },
  {
    "id": "c-058-C",
    "question_id": "q-dbsec-058",
    "choice_key": "C",
    "choice_text": "กำหนดจำนวนหลักของรหัสผ่านขั้นต่ำที่ผู้ใช้ต้องตั้ง",
    "sequence_order": 3
  },
  {
    "id": "c-058-D",
    "question_id": "q-dbsec-058",
    "choice_key": "D",
    "choice_text": "กำหนดระยะเวลาที่รหัสผ่านจะหมดอายุในฐานข้อมูล",
    "sequence_order": 4
  },
  {
    "id": "c-059-A",
    "question_id": "q-dbsec-059",
    "choice_key": "A",
    "choice_text": "\"ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง\" (Generic Error Message)",
    "sequence_order": 1
  },
  {
    "id": "c-059-B",
    "question_id": "q-dbsec-059",
    "choice_key": "B",
    "choice_text": "\"ชื่อผู้ใช้นี้ถูกต้อง แต่รหัสผ่านผิด\"",
    "sequence_order": 2
  },
  {
    "id": "c-059-C",
    "question_id": "q-dbsec-059",
    "choice_key": "C",
    "choice_text": "\"ไม่พบบัญชีชื่อผู้ใช้นี้ในระบบ\"",
    "sequence_order": 3
  },
  {
    "id": "c-059-D",
    "question_id": "q-dbsec-059",
    "choice_key": "D",
    "choice_text": "\"รหัสผ่านของคุณขาดตัวอักษรพิเศษ\"",
    "sequence_order": 4
  },
  {
    "id": "c-060-A",
    "question_id": "q-dbsec-060",
    "choice_key": "A",
    "choice_text": "ตรวจสอบว่าแฮชเดิมในฐานข้อมูลสร้างขึ้นด้วยอัลกอริทึมหรือ Cost ที่ล้าสมัยหรือไม่ เพื่อสร้างแฮชใหม่ที่มีความปลอดภัยสูงขึ้นให้อัตโนมัติเมื่อผู้ใช้ Login สำเร็จ",
    "sequence_order": 1
  },
  {
    "id": "c-060-B",
    "question_id": "q-dbsec-060",
    "choice_key": "B",
    "choice_text": "บังคับให้ผู้ใช้ต้องเปลี่ยนรหัสผ่านใหม่ทุก 90 วัน",
    "sequence_order": 2
  },
  {
    "id": "c-060-C",
    "question_id": "q-dbsec-060",
    "choice_key": "C",
    "choice_text": "ตรวจสอบว่ารหัสผ่านของผู้ใช้เคยรั่วไหลบนอินเทอร์เน็ตหรือไม่",
    "sequence_order": 3
  },
  {
    "id": "c-060-D",
    "question_id": "q-dbsec-060",
    "choice_key": "D",
    "choice_text": "ลบรหัสผ่านออกจากฐานข้อมูลเมื่อไม่มีการใช้งาน",
    "sequence_order": 4
  },
  {
    "id": "c-096-A",
    "question_id": "q-dbsec-096",
    "choice_key": "A",
    "choice_text": "การตรวจสอบสิทธิ์การเข้าถึง (Authorization) ป้องกันไม่ให้ผู้ใช้ทั่วไปเข้าถึงฟังก์ชันของผู้ดูแลระบบ",
    "sequence_order": 1
  },
  {
    "id": "c-096-B",
    "question_id": "q-dbsec-096",
    "choice_key": "B",
    "choice_text": "การตรวจสอบความเร็วอินเทอร์เน็ตของผู้ใช้",
    "sequence_order": 2
  },
  {
    "id": "c-096-C",
    "question_id": "q-dbsec-096",
    "choice_key": "C",
    "choice_text": "การล้างประวัติการค้นหาของเบราว์เซอร์",
    "sequence_order": 3
  },
  {
    "id": "c-096-D",
    "question_id": "q-dbsec-096",
    "choice_key": "D",
    "choice_text": "การแปลงรหัสผ่านเป็นตัวพิมพ์ใหญ่",
    "sequence_order": 4
  },
  {
    "id": "c-097-A",
    "question_id": "q-dbsec-097",
    "choice_key": "A",
    "choice_text": "ความยาวของรหัสผ่าน (Password Length เช่น 12-16 ตัวอักษรขึ้นไป หรือ Passphrase) มากกว่าการบังคับเปลี่ยนรหัสผ่านบ่อยๆ",
    "sequence_order": 1
  },
  {
    "id": "c-097-B",
    "question_id": "q-dbsec-097",
    "choice_key": "B",
    "choice_text": "การบังคับให้เปลี่ยนรหัสผ่านใหม่ทุก 15 วัน",
    "sequence_order": 2
  },
  {
    "id": "c-097-C",
    "question_id": "q-dbsec-097",
    "choice_key": "C",
    "choice_text": "การห้ามใช้ตัวอักษรภาษาอังกฤษ",
    "sequence_order": 3
  },
  {
    "id": "c-097-D",
    "question_id": "q-dbsec-097",
    "choice_key": "D",
    "choice_text": "การตั้งรหัสผ่านไม่เกิน 6 ตัวอักษรเพื่อให้จำง่าย",
    "sequence_order": 4
  },
  {
    "id": "c-098-A",
    "question_id": "q-dbsec-098",
    "choice_key": "A",
    "choice_text": "PHPSESSID",
    "sequence_order": 1
  },
  {
    "id": "c-098-B",
    "question_id": "q-dbsec-098",
    "choice_key": "B",
    "choice_text": "USER_TOKEN",
    "sequence_order": 2
  },
  {
    "id": "c-098-C",
    "question_id": "q-dbsec-098",
    "choice_key": "C",
    "choice_text": "AUTH_KEY",
    "sequence_order": 3
  },
  {
    "id": "c-098-D",
    "question_id": "q-dbsec-098",
    "choice_key": "D",
    "choice_text": "PHP_COOKIE",
    "sequence_order": 4
  },
  {
    "id": "c-099-A",
    "question_id": "q-dbsec-099",
    "choice_key": "A",
    "choice_text": "เป็น Memory-Hard Function ที่ปรับแต่งการใช้ RAM (Memory Cost) ได้ ทำให้ทนทานต่อการโจมตีด้วยชิป ASIC และ GPU อย่างมีประสิทธิภาพยิ่งขึ้น",
    "sequence_order": 1
  },
  {
    "id": "c-099-B",
    "question_id": "q-dbsec-099",
    "choice_key": "B",
    "choice_text": "ทำงานได้โดยไม่ต้องใช้ไฟฟ้า",
    "sequence_order": 2
  },
  {
    "id": "c-099-C",
    "question_id": "q-dbsec-099",
    "choice_key": "C",
    "choice_text": "สามารถถอดรหัสรหัสผ่านกลับมาเป็นข้อความเดิมได้เสมอ",
    "sequence_order": 3
  },
  {
    "id": "c-099-D",
    "question_id": "q-dbsec-099",
    "choice_key": "D",
    "choice_text": "ใช้งานได้เฉพาะกับฐานข้อมูล NoSQL",
    "sequence_order": 4
  },
  {
    "id": "c-100-A",
    "question_id": "q-dbsec-100",
    "choice_key": "A",
    "choice_text": "session_unset() ล้างตัวแปรทั้งหมดในอาร์เรย์ $_SESSION ส่วน session_destroy() ทำลายไฟล์ที่จัดเก็บ Session บนดิสก์ของเซิร์ฟเวอร์",
    "sequence_order": 1
  },
  {
    "id": "c-100-B",
    "question_id": "q-dbsec-100",
    "choice_key": "B",
    "choice_text": "session_unset() ลบฐานข้อมูลทิ้ง ส่วน session_destroy() ปิดเครื่องเซิร์ฟเวอร์",
    "sequence_order": 2
  },
  {
    "id": "c-100-C",
    "question_id": "q-dbsec-100",
    "choice_key": "C",
    "choice_text": "ทั้งสองคำสั่งทำงานเหมือนกันทุกประการ",
    "sequence_order": 3
  },
  {
    "id": "c-100-D",
    "question_id": "q-dbsec-100",
    "choice_key": "D",
    "choice_text": "session_destroy() ใช้เฉพาะตอนล็อกอิน",
    "sequence_order": 4
  },
  {
    "id": "c-061-A",
    "question_id": "q-dbsec-061",
    "choice_key": "A",
    "choice_text": "ผู้โจมตีกำหนด Session ID ให้เหยื่อใช้ก่อน เมื่อเหยื่อล็อกอินสำเร็จ ผู้โจมตีจะเข้าใช้บัญชีนั้นได้ ป้องกันโดยเรียก session_regenerate_id(true) หลัง Login",
    "sequence_order": 1
  },
  {
    "id": "c-061-B",
    "question_id": "q-dbsec-061",
    "choice_key": "B",
    "choice_text": "ผู้โจมตีทำการส่งรหัสผ่านสุ่มจำนวนมาก ป้องกันโดยการจำกัดความยาวรหัสผ่าน",
    "sequence_order": 2
  },
  {
    "id": "c-061-C",
    "question_id": "q-dbsec-061",
    "choice_key": "C",
    "choice_text": "ผู้โจมตีทำการดักจับรหัสผ่านผ่าน Wi-Fi ป้องกันโดยการปิด Wi-Fi",
    "sequence_order": 3
  },
  {
    "id": "c-061-D",
    "question_id": "q-dbsec-061",
    "choice_key": "D",
    "choice_text": "ผู้โจมตีทำการขโมยคุกกี้ผ่านทางอีเมล ป้องกันโดยการไม่เปิดอีเมล",
    "sequence_order": 4
  },
  {
    "id": "c-062-A",
    "question_id": "q-dbsec-062",
    "choice_key": "A",
    "choice_text": "ป้องกันไม่ให้สคริปต์ JavaScript ฝั่งไคลเอนต์ (เช่น document.cookie) เข้าถึงคุกกี้ได้ ช่วยตัดวงจรการขโมย Session จากการโจมตี XSS",
    "sequence_order": 1
  },
  {
    "id": "c-062-B",
    "question_id": "q-dbsec-062",
    "choice_key": "B",
    "choice_text": "บังคับให้ส่งข้อมูลคุกกี้ผ่านสายแลนเท่านั้น",
    "sequence_order": 2
  },
  {
    "id": "c-062-C",
    "question_id": "q-dbsec-062",
    "choice_key": "C",
    "choice_text": "ทำให้คุกกี้ไม่มีวันหมดอายุ",
    "sequence_order": 3
  },
  {
    "id": "c-062-D",
    "question_id": "q-dbsec-062",
    "choice_key": "D",
    "choice_text": "ทำการเข้ารหัสฮาร์ดดิสก์ของผู้ใช้งาน",
    "sequence_order": 4
  },
  {
    "id": "c-063-A",
    "question_id": "q-dbsec-063",
    "choice_key": "A",
    "choice_text": "CSRF อาศัยการที่เบราว์เซอร์แนบ Session Cookie ไปกับคำขอข้ามโดเมนอัตโนมัติ ซึ่ง CSRF Token ที่สุ่มขึ้นมาเฉพาะ Session และถูกซ่อนในฟอร์ม ผู้โจมตีไม่สามารถล่วงรู้หรือปลอมแปลงได้",
    "sequence_order": 1
  },
  {
    "id": "c-063-B",
    "question_id": "q-dbsec-063",
    "choice_key": "B",
    "choice_text": "CSRF อาศัยช่องโหว่ของการเปิดพอร์ต 80 ของเซิร์ฟเวอร์",
    "sequence_order": 2
  },
  {
    "id": "c-063-C",
    "question_id": "q-dbsec-063",
    "choice_key": "C",
    "choice_text": "CSRF คือการยิงรหัสผ่านรัวๆ ใส่หน้า Login",
    "sequence_order": 3
  },
  {
    "id": "c-063-D",
    "question_id": "q-dbsec-063",
    "choice_key": "D",
    "choice_text": "CSRF Token ใช้สำหรับแปลงคำสั่ง SQL ให้เป็นตัวเลข",
    "sequence_order": 4
  },
  {
    "id": "c-064-A",
    "question_id": "q-dbsec-064",
    "choice_key": "A",
    "choice_text": "Idle Timeout นับเวลาจากกิจกรรมล่าสุด (เช่น ไม่ขยับเกิน 5 นาทีให้หลุด) ส่วน Absolute Timeout บังคับให้ Session หมดอายุเมื่อถึงเวลาสูงสุด (เช่น ครบ 8 ชั่วโมง) ไม่ว่าจะมีการใช้งานต่อเนื่องหรือไม่",
    "sequence_order": 1
  },
  {
    "id": "c-064-B",
    "question_id": "q-dbsec-064",
    "choice_key": "B",
    "choice_text": "Idle Timeout ใช้เฉพาะวันหยุด ส่วน Absolute Timeout ใช้ในวันทำงาน",
    "sequence_order": 2
  },
  {
    "id": "c-064-C",
    "question_id": "q-dbsec-064",
    "choice_key": "C",
    "choice_text": "Idle Timeout ลบฐานข้อมูลทิ้ง ส่วน Absolute Timeout ลบเฉพาะบัญชีผู้ใช้",
    "sequence_order": 3
  },
  {
    "id": "c-064-D",
    "question_id": "q-dbsec-064",
    "choice_key": "D",
    "choice_text": "ทั้งสองระบบเป็นชื่อเรียกของเทคโนโลยีเดียวกัน",
    "sequence_order": 4
  },
  {
    "id": "c-065-A",
    "question_id": "q-dbsec-065",
    "choice_key": "A",
    "choice_text": "เบราว์เซอร์จะไม่ส่งคุกกี้นี้ไปกับคำขอใดๆ ที่มาจากลิงก์หรือเว็บไซต์ภายนอก (Cross-Site Request) เลย ช่วยตัดการโจมตี CSRF ได้อย่างสมบูรณ์",
    "sequence_order": 1
  },
  {
    "id": "c-065-B",
    "question_id": "q-dbsec-065",
    "choice_key": "B",
    "choice_text": "ทำให้คุกกี้สามารถเปิดอ่านได้เฉพาะบนโปรแกรม Notepad เท่านั้น",
    "sequence_order": 2
  },
  {
    "id": "c-065-C",
    "question_id": "q-dbsec-065",
    "choice_key": "C",
    "choice_text": "บังคับให้รหัสผ่านของผู้ใช้ต้องมีความยาวเกิน 16 ตัวอักษร",
    "sequence_order": 3
  },
  {
    "id": "c-065-D",
    "question_id": "q-dbsec-065",
    "choice_key": "D",
    "choice_text": "จำกัดให้ผู้ใช้เข้าเว็บไซต์ได้เพียงวันละ 1 ครั้ง",
    "sequence_order": 4
  },
  {
    "id": "c-066-A",
    "question_id": "q-dbsec-066",
    "choice_key": "A",
    "choice_text": "Stored XSS จะฝังโค้ดอันตราย (Malicious Script) ลงในฐานข้อมูลถาวร และจะรันบนเครื่องของเหยื่อทุกคนที่เปิดดูหน้านั้น ส่วน Reflected XSS จะสะท้อนผ่าน URL/Parameter ในคำขอเดียว",
    "sequence_order": 1
  },
  {
    "id": "c-066-B",
    "question_id": "q-dbsec-066",
    "choice_key": "B",
    "choice_text": "Stored XSS ทำงานได้เฉพาะบนมือถือ ส่วน Reflected XSS ทำงานบนคอมพิวเตอร์",
    "sequence_order": 2
  },
  {
    "id": "c-066-C",
    "question_id": "q-dbsec-066",
    "choice_key": "C",
    "choice_text": "Stored XSS โจมตีผ่านอีเมล ส่วน Reflected XSS โจมตีผ่าน Wi-Fi",
    "sequence_order": 3
  },
  {
    "id": "c-066-D",
    "question_id": "q-dbsec-066",
    "choice_key": "D",
    "choice_text": "Stored XSS ไม่สามารถขโมยคุกกี้ได้",
    "sequence_order": 4
  },
  {
    "id": "c-067-A",
    "question_id": "q-dbsec-067",
    "choice_key": "A",
    "choice_text": "Brute-force Attacks และ Credential Stuffing",
    "sequence_order": 1
  },
  {
    "id": "c-067-B",
    "question_id": "q-dbsec-067",
    "choice_key": "B",
    "choice_text": "SQL Injection",
    "sequence_order": 2
  },
  {
    "id": "c-067-C",
    "question_id": "q-dbsec-067",
    "choice_key": "C",
    "choice_text": "Cross-Site Scripting (XSS)",
    "sequence_order": 3
  },
  {
    "id": "c-067-D",
    "question_id": "q-dbsec-067",
    "choice_key": "D",
    "choice_text": "DNS Spoofing",
    "sequence_order": 4
  },
  {
    "id": "c-068-A",
    "question_id": "q-dbsec-068",
    "choice_key": "A",
    "choice_text": "ป้องกันไม่ให้เบราว์เซอร์แคชหน้าข้อมูลส่วนตัวไว้ ทำให้เมื่อผู้ใช้กด Logout แล้วคนอื่นมากดปุ่ม \"Back\" จะไม่สามารถดูข้อมูลส่วนตัวย้อนหลังได้",
    "sequence_order": 1
  },
  {
    "id": "c-068-B",
    "question_id": "q-dbsec-068",
    "choice_key": "B",
    "choice_text": "บังคับให้ดาวน์โหลดหน้าเว็บใหม่อย่างรวดเร็วโดยไม่ต้องต่อเน็ต",
    "sequence_order": 2
  },
  {
    "id": "c-068-C",
    "question_id": "q-dbsec-068",
    "choice_key": "C",
    "choice_text": "ลบรหัสผ่านของผู้ใช้ออกจากฐานข้อมูล",
    "sequence_order": 3
  },
  {
    "id": "c-068-D",
    "question_id": "q-dbsec-068",
    "choice_key": "D",
    "choice_text": "ทำการปิดแท็บเบราว์เซอร์อัตโนมัติ",
    "sequence_order": 4
  },
  {
    "id": "c-069-A",
    "question_id": "q-dbsec-069",
    "choice_key": "A",
    "choice_text": "ต้องเรียกใช้งาน \"ก่อนหน้า\" การสั่ง session_start() เสมอ",
    "sequence_order": 1
  },
  {
    "id": "c-069-B",
    "question_id": "q-dbsec-069",
    "choice_key": "B",
    "choice_text": "เรียกใช้งานหลังจาก session_destroy() เท่านั้น",
    "sequence_order": 2
  },
  {
    "id": "c-069-C",
    "question_id": "q-dbsec-069",
    "choice_key": "C",
    "choice_text": "เรียกใช้งานในไฟล์ HTML ภายนอก",
    "sequence_order": 3
  },
  {
    "id": "c-069-D",
    "question_id": "q-dbsec-069",
    "choice_key": "D",
    "choice_text": "เรียกใช้งานเฉพาะเมื่อผู้ใช้กดปุ่ม Logout",
    "sequence_order": 4
  },
  {
    "id": "c-070-A",
    "question_id": "q-dbsec-070",
    "choice_key": "A",
    "choice_text": "เพราะเป็นกลไกฝั่งเบราว์เซอร์ที่จำกัดแหล่งที่มาของสคริปต์ที่อนุญาตให้รันได้ ทำให้แม้เว็บจะมีช่องโหว่ XSS สคริปต์ของผู้โจมตีก็จะไม่ถูกประมวลผล",
    "sequence_order": 1
  },
  {
    "id": "c-070-B",
    "question_id": "q-dbsec-070",
    "choice_key": "B",
    "choice_text": "เพราะ CSP ทำหน้าที่เป็นไฟร์วอลล์บล็อกการเชื่อมต่อ Wi-Fi ที่ไม่ปลอดภัย",
    "sequence_order": 2
  },
  {
    "id": "c-070-C",
    "question_id": "q-dbsec-070",
    "choice_key": "C",
    "choice_text": "เพราะ CSP ป้องกันไม่ให้ฐานข้อมูล MySQL เกิด Crash",
    "sequence_order": 3
  },
  {
    "id": "c-070-D",
    "question_id": "q-dbsec-070",
    "choice_key": "D",
    "choice_text": "เพราะ CSP ทำการแฮชรหัสผ่านของผู้ใช้ด้วยความเร็วสูง",
    "sequence_order": 4
  },
  {
    "id": "c-101-A",
    "question_id": "q-dbsec-101",
    "choice_key": "A",
    "choice_text": "เพราะ textContent จะมองข้อมูลเป็น Plain Text ล้วนๆ เสมอ และไม่แปลงสตริงนั้นเป็น HTML Elements หรือประมวลผลแท็ก <script>",
    "sequence_order": 1
  },
  {
    "id": "c-101-B",
    "question_id": "q-dbsec-101",
    "choice_key": "B",
    "choice_text": "เพราะ textContent ทำงานเร็วกว่า 1,000 เท่า",
    "sequence_order": 2
  },
  {
    "id": "c-101-C",
    "question_id": "q-dbsec-101",
    "choice_key": "C",
    "choice_text": "เพราะ textContent จะเข้ารหัสข้อมูลด้วย SSL",
    "sequence_order": 3
  },
  {
    "id": "c-101-D",
    "question_id": "q-dbsec-101",
    "choice_key": "D",
    "choice_text": "เพราะ innerHTML ไม่รองรับภาษาไทย",
    "sequence_order": 4
  },
  {
    "id": "c-102-A",
    "question_id": "q-dbsec-102",
    "choice_key": "A",
    "choice_text": "Lax จะยอมส่ง Cookie เมื่อผู้ใช้คลิกลิงก์ธรรมดา (GET Top-Level Nav) มาจากเว็บอื่น แต่จะไม่ส่งเมื่อเป็น POST หรือ Iframe ส่วน Strict จะไม่ส่ง Cookie ในทุกกรณีที่มาจากเว็บอื่น",
    "sequence_order": 1
  },
  {
    "id": "c-102-B",
    "question_id": "q-dbsec-102",
    "choice_key": "B",
    "choice_text": "Lax ใช้กับมือถือ ส่วน Strict ใช้กับคอมพิวเตอร์",
    "sequence_order": 2
  },
  {
    "id": "c-102-C",
    "question_id": "q-dbsec-102",
    "choice_key": "C",
    "choice_text": "Lax ไม่อนุญาตให้ใช้ HTTPS",
    "sequence_order": 3
  },
  {
    "id": "c-102-D",
    "question_id": "q-dbsec-102",
    "choice_key": "D",
    "choice_text": "ทั้งสองค่ามีการทำงานเหมือนกันทุกประการ",
    "sequence_order": 4
  },
  {
    "id": "c-103-A",
    "question_id": "q-dbsec-103",
    "choice_key": "A",
    "choice_text": "บังคับให้เบราว์เซอร์สื่อสารกับเว็บไซต์ผ่านโปรโตคอล HTTPS เสมอ ป้องกันการโจมตีแบบ SSL Stripping และการดักจับ Session Cookie บนเครือข่ายที่ไม่ปลอดภัย",
    "sequence_order": 1
  },
  {
    "id": "c-103-B",
    "question_id": "q-dbsec-103",
    "choice_key": "B",
    "choice_text": "ลบไฟล์แคชทั้งหมดเมื่อเปิดเว็บครบ 1 ปี",
    "sequence_order": 2
  },
  {
    "id": "c-103-C",
    "question_id": "q-dbsec-103",
    "choice_key": "C",
    "choice_text": "บังคับให้ผู้ใช้ล็อกอินใหม่ทุก 30 วินาที",
    "sequence_order": 3
  },
  {
    "id": "c-103-D",
    "question_id": "q-dbsec-103",
    "choice_key": "D",
    "choice_text": "ปิดกั้นการเข้าชมจากต่างประเทศ",
    "sequence_order": 4
  },
  {
    "id": "c-104-A",
    "question_id": "q-dbsec-104",
    "choice_key": "A",
    "choice_text": "ตรวจสอบความถูกต้องของไฟล์สคริปต์ที่โหลดจาก CDN ภายนอก หากไฟล์บน CDN ถูกแฮกหรือดัดแปลง เบราว์เซอร์จะปฏิเสธการรันสคริปต์นั้นทันที",
    "sequence_order": 1
  },
  {
    "id": "c-104-B",
    "question_id": "q-dbsec-104",
    "choice_key": "B",
    "choice_text": "เพิ่มความเร็วในการโหลด CDN ขึ้น 10 เท่า",
    "sequence_order": 2
  },
  {
    "id": "c-104-C",
    "question_id": "q-dbsec-104",
    "choice_key": "C",
    "choice_text": "บังคับให้สคริปต์โหลดเฉพาะตอนกลางวัน",
    "sequence_order": 3
  },
  {
    "id": "c-104-D",
    "question_id": "q-dbsec-104",
    "choice_key": "D",
    "choice_text": "แปลงสคริปต์เป็นภาษาไทย",
    "sequence_order": 4
  },
  {
    "id": "c-105-A",
    "question_id": "q-dbsec-105",
    "choice_key": "A",
    "choice_text": "การโจมตีแบบอัตโนมัติด้วยบอท (Automated Bot Attacks), Brute-force Login และการสแปมข้อมูลผ่านฟอร์ม",
    "sequence_order": 1
  },
  {
    "id": "c-105-B",
    "question_id": "q-dbsec-105",
    "choice_key": "B",
    "choice_text": "การเกิดไฟดับในห้องเซิร์ฟเวอร์",
    "sequence_order": 2
  },
  {
    "id": "c-105-C",
    "question_id": "q-dbsec-105",
    "choice_key": "C",
    "choice_text": "การเกิดข้อผิดพลาดของ Hard Disk",
    "sequence_order": 3
  },
  {
    "id": "c-105-D",
    "question_id": "q-dbsec-105",
    "choice_key": "D",
    "choice_text": "การโจมตีไวรัสคอมพิวเตอร์ทางแฟลชไดรฟ์",
    "sequence_order": 4
  }
];

export const dbSecAnswerKeys: QuestionAnswerKey[] = [
  {
    "id": "k-001",
    "question_id": "q-dbsec-001",
    "correct_choice_key": "A",
    "explanation": "Web Server มีหน้าที่รับ HTTP Request จากไคลเอนต์ ประมวลผลร่วมกับ Application Server และส่ง HTTP Response กลับไป"
  },
  {
    "id": "k-002",
    "question_id": "q-dbsec-002",
    "correct_choice_key": "A",
    "explanation": "แท็ก <main> เป็น Semantic tag ที่ระบุเนื้อหาหลักที่เป็นเอกลักษณ์ของหน้านั้น และตามมาตรฐานควรมีเพียงแท็กเดียวต่อหน้า"
  },
  {
    "id": "k-003",
    "question_id": "q-dbsec-003",
    "correct_choice_key": "A",
    "explanation": "403 Forbidden หมายถึงเซิร์ฟเวอร์เข้าใจคำขอแต่ปฏิเสธสิทธิ์การเข้าถึง ส่วน 404 Not Found หมายถึงไม่พบทรัพยากร"
  },
  {
    "id": "k-004",
    "question_id": "q-dbsec-004",
    "correct_choice_key": "A",
    "explanation": "HTTP Status Code กลุ่ม 5xx บ่งชี้ว่าเกิดข้อผิดพลาดในฝั่งเซิร์ฟเวอร์ เช่น Exception ในโค้ดหรือฐานข้อมูลขัดข้อง"
  },
  {
    "id": "k-005",
    "question_id": "q-dbsec-005",
    "correct_choice_key": "A",
    "explanation": "<!DOCTYPE html> เป็น Document Type Declaration บังคับให้เบราว์เซอร์เรนเดอร์ในโหมด Standards Mode ตามมาตรฐาน HTML5"
  },
  {
    "id": "k-006",
    "question_id": "q-dbsec-006",
    "correct_choice_key": "A",
    "explanation": "UTF-8 เป็นมาตรฐาน Charset สากลที่ป้องกันปัญหาตัวอักษรภาษาไทยเพี้ยน และป้องกันการโจมตี Charset Encoding XSS (เช่น UTF-7)"
  },
  {
    "id": "k-007",
    "question_id": "q-dbsec-007",
    "correct_choice_key": "A",
    "explanation": "HTTP ออกแบบมาเป็น Stateless protocol ทำให้เว็บแอปพลิเคชันต้องใช้กลไก Cookie และ Session ในการจดจำผู้ใช้ระหว่าง Request"
  },
  {
    "id": "k-008",
    "question_id": "q-dbsec-008",
    "correct_choice_key": "A",
    "explanation": "<span>, <a>, <strong>, <em> เป็น Inline elements ซึ่งจะเรียงตัวต่อกันในแนวนอนโดยไม่ตัดขึ้นบรรทัดใหม่"
  },
  {
    "id": "k-009",
    "question_id": "q-dbsec-009",
    "correct_choice_key": "A",
    "explanation": "3-Tier Architecture ประกอบด้วย Presentation Tier (UI), Logic Tier (Application Server เช่น PHP) และ Data Tier (Database)"
  },
  {
    "id": "k-010",
    "question_id": "q-dbsec-010",
    "correct_choice_key": "A",
    "explanation": "HTTPS เข้ารหัสข้อมูล Transport Layer ด้วย TLS/SSL บนพอร์ต 443 เพื่อป้องกันการดักฟัง (Sniffing) และดัดแปลงข้อมูล (MitM)"
  },
  {
    "id": "k-071",
    "question_id": "q-dbsec-071",
    "correct_choice_key": "A",
    "explanation": "Content-Type header ระบุ Media Type (MIME) ของเนื้อหา เช่น text/html, application/json ช่วยให้ไคลเอนต์ทราบวิธีการประมวลผลข้อมูล"
  },
  {
    "id": "k-072",
    "question_id": "q-dbsec-072",
    "correct_choice_key": "A",
    "explanation": "Referer Header ระบุที่อยู่ URL ของหน้าก่อนหน้าที่ส่งคำขอมา ซึ่งนำมาใช้ในการวิเคราะห์ Traffic หรือป้องกัน CSRF เบื้องต้นได้"
  },
  {
    "id": "k-073",
    "question_id": "q-dbsec-073",
    "correct_choice_key": "A",
    "explanation": "<nav> เป็น Semantic Element สำหรับรวบรวมลิงก์การนำทางหลักของเว็บไซต์ ช่วยเรื่อง Accessibility และ SEO"
  },
  {
    "id": "k-074",
    "question_id": "q-dbsec-074",
    "correct_choice_key": "A",
    "explanation": "301 Moved Permanently สั่งให้แคช URL ใหม่ถาวร ส่วน 302 Found เป็นการ Redirect ชั่วคราว (เช่น หลัง Login สำเร็จหรือ PRG Pattern)"
  },
  {
    "id": "k-075",
    "question_id": "q-dbsec-075",
    "correct_choice_key": "A",
    "explanation": "แอตทริบิวต์ alt ให้ข้อความบรรยายภาพสำหรับผู้พิการทางสายตา (Screen Reader) และแสดงผลเมื่อรูปภาพโหลดล้มเหลว"
  },
  {
    "id": "k-011",
    "question_id": "q-dbsec-011",
    "correct_choice_key": "A",
    "explanation": "Method GET จะนำพารามิเตอร์ต่อท้าย URL ในรูป Query String ทำให้ปรากฏในเบราว์เซอร์ History, แคช และ Server Access Logs"
  },
  {
    "id": "k-012",
    "question_id": "q-dbsec-012",
    "correct_choice_key": "A",
    "explanation": "การอัปโหลดไฟล์ใน HTML Form ต้องระบุ method=\"POST\" และ enctype=\"multipart/form-data\""
  },
  {
    "id": "k-013",
    "question_id": "q-dbsec-013",
    "correct_choice_key": "A",
    "explanation": "Idempotency คือคุณสมบัติที่การส่งคำขอซ้ำหลายครั้งจะได้ผลลัพธ์ต่อสถานะเซิร์ฟเวอร์เหมือนการส่งครั้งเดียว (เช่น GET, PUT, DELETE)"
  },
  {
    "id": "k-014",
    "question_id": "q-dbsec-014",
    "correct_choice_key": "A",
    "explanation": "แอตทริบิวต์ name ในฟอร์มทำหน้าที่เป็น Key ในการดึงข้อมูล เช่น <input name=\"email\"> จะถูกรับใน PHP ผ่าน $_POST['email']"
  },
  {
    "id": "k-015",
    "question_id": "q-dbsec-015",
    "correct_choice_key": "A",
    "explanation": "แอตทริบิวต์ for ใน <label> ที่ตรงกับ id ของ <input> ช่วยเพิ่ม Accessibility ให้ผู้ใช้คลิกข้อความแล้วเคอร์เซอร์จะกระโดดเข้าช่องทันที"
  },
  {
    "id": "k-016",
    "question_id": "q-dbsec-016",
    "correct_choice_key": "A",
    "explanation": "Method GET เหมาะกับการค้นหา (Search/Filter) เพราะสามารถแชร์ลิงก์หรือ Bookmark ผลการค้นหาได้ และเป็น Safe Method"
  },
  {
    "id": "k-017",
    "question_id": "q-dbsec-017",
    "correct_choice_key": "A",
    "explanation": "Radio Button (<input type=\"radio\">) ที่มีชื่อ name เดียวกัน จะอนุญาตให้เลือกได้เพียงค่าเดียวในกลุ่มนั้น"
  },
  {
    "id": "k-018",
    "question_id": "q-dbsec-018",
    "correct_choice_key": "A",
    "explanation": "Client-side validation สามารถถูกบายพาสได้ง่ายมากด้วยเครื่องมืออย่าง cURL, Postman หรือการแก้ DOM เซิร์ฟเวอร์จึงต้องทำ Server-side validation เสมอ"
  },
  {
    "id": "k-019",
    "question_id": "q-dbsec-019",
    "correct_choice_key": "A",
    "explanation": "Hidden input ซ่อนจาก UI ทั่วไปแต่ผู้ใช้สามารถ Inspect แก้ไขค่าได้ง่าย ห้ามใช้เก็บข้อมูล Critical เช่น ราคาสินค้า หรือ Role"
  },
  {
    "id": "k-020",
    "question_id": "q-dbsec-020",
    "correct_choice_key": "A",
    "explanation": "Method POST จะส่งข้อมูลในส่วน Request Message Body ซึ่งแยกออกจาก URL และรองรับขนาดข้อมูลที่ใหญ่กว่า"
  },
  {
    "id": "k-076",
    "question_id": "q-dbsec-076",
    "correct_choice_key": "A",
    "explanation": "การใส่วงเล็บเหลี่ยม [] ปิดท้ายชื่อแอตทริบิวต์ name (เช่น hobbies[]) จะทำให้ PHP แปลงค่านั้นเป็น Array ใน $_POST['hobbies'] อัตโนมัติ"
  },
  {
    "id": "k-077",
    "question_id": "q-dbsec-077",
    "correct_choice_key": "A",
    "explanation": "<textarea> เป็น Multi-line input element ค่าเริ่มต้นระบุใน <textarea>Default</textarea> ไม่ใช้แอตทริบิวต์ value"
  },
  {
    "id": "k-078",
    "question_id": "q-dbsec-078",
    "correct_choice_key": "A",
    "explanation": "ค่าเริ่มต้นของ form enctype คือ application/x-www-form-urlencoded ซึ่งแปลงช่องว่างเป็น + และอักขระพิเศษเป็น %HEX"
  },
  {
    "id": "k-079",
    "question_id": "q-dbsec-079",
    "correct_choice_key": "A",
    "explanation": "autocomplete=\"off\" แนะนำให้เบราว์เซอร์ไม่บันทึกค่าที่ผู้ใช้กรอกลงในแคชประวัติฟอร์ม ช่วยเพิ่มความเป็นส่วนตัวบนอุปกรณ์สาธารณะ"
  },
  {
    "id": "k-080",
    "question_id": "q-dbsec-080",
    "correct_choice_key": "A",
    "explanation": "pattern attribute ใช้ Regular Expression ตรวจสอบความถูกต้องของ Input เบื้องต้นในฝั่งเบราว์เซอร์ก่อนส่งฟอร์ม"
  },
  {
    "id": "k-021",
    "question_id": "q-dbsec-021",
    "correct_choice_key": "A",
    "explanation": "$_SERVER ใน PHP เก็บข้อมูลเกี่ยวกับ Server Environment, Headers, Client IP ($_SERVER['REMOTE_ADDR']) และ Request Method"
  },
  {
    "id": "k-022",
    "question_id": "q-dbsec-022",
    "correct_choice_key": "A",
    "explanation": "htmlspecialchars() แปลงอักขระพิเศษ <, >, &, \", ' เป็น HTML Entities ช่วยป้องกัน XSS เมื่อแสดงผลข้อมูลจากผู้ใช้"
  },
  {
    "id": "k-023",
    "question_id": "q-dbsec-023",
    "correct_choice_key": "A",
    "explanation": "=== ตรวจสอบทั้งค่าและชนิดข้อมูล ป้องกัน Type Juggling Vulnerabilities ที่เกิดจาก == ในภาษา PHP"
  },
  {
    "id": "k-024",
    "question_id": "q-dbsec-024",
    "correct_choice_key": "A",
    "explanation": "declare(strict_types=1) เปิดโหมด Strict Typing ใน PHP เพื่อป้องกันข้อผิดพลาดจากการแปลงชนิดข้อมูลอัตโนมัติ"
  },
  {
    "id": "k-025",
    "question_id": "q-dbsec-025",
    "correct_choice_key": "A",
    "explanation": "trim() ใช้ตัด White space ด้านหน้าและด้านหลังสตริงออก เพื่อป้องกันปัญหาเว้นวรรคส่วนเกินในการตรวจสอบข้อมูล"
  },
  {
    "id": "k-026",
    "question_id": "q-dbsec-026",
    "correct_choice_key": "A",
    "explanation": "ภาษา PHP ใช้เครื่องหมายจุด (.) ในการต่อข้อความ (String Concatenation) ขณะที่เครื่องหมาย + ใช้สำหรับการคำนวณตัวเลข"
  },
  {
    "id": "k-027",
    "question_id": "q-dbsec-027",
    "correct_choice_key": "A",
    "explanation": "filter_var() ร่วมกับ FILTER_VALIDATE_EMAIL จะคืนค่าข้อมูลอีเมลที่ถูกต้อง หรือคืนค่า false หากรูปแบบไม่ถูกต้อง"
  },
  {
    "id": "k-028",
    "question_id": "q-dbsec-028",
    "correct_choice_key": "A",
    "explanation": "<?= $var ?> เป็น Short open tag สำหรับแสดงผล มีความหมายเทียบเท่ากับ <?php echo $var; ?>"
  },
  {
    "id": "k-029",
    "question_id": "q-dbsec-029",
    "correct_choice_key": "A",
    "explanation": "การใช้ ?? หรือ isset() ช่วยป้องกันข้อผิดพลาด E_WARNING / Undefined array key เมื่อ Key นั้นไม่ได้ถูกส่งมาใน Request"
  },
  {
    "id": "k-030",
    "question_id": "q-dbsec-030",
    "correct_choice_key": "A",
    "explanation": "require_once จะหยุดการทำงานด้วย Fatal Error เมื่อไม่พบไฟล์ เหมาะกับไฟล์สำคัญเช่น config.php/database.php ส่วน include แค่แจ้งเตือน Warning"
  },
  {
    "id": "k-081",
    "question_id": "q-dbsec-081",
    "correct_choice_key": "A",
    "explanation": "การปิด display_errors บน Production ช่วยป้องกัน Information Disclosure และเปิด log_errors เพื่อบันทึกข้อผิดพลาดไว้ตรวจสอบภายใน"
  },
  {
    "id": "k-082",
    "question_id": "q-dbsec-082",
    "correct_choice_key": "A",
    "explanation": "tmp_name คือ Temporary File Path ที่เซิร์ฟเวอร์สร้างขึ้นเพื่อเก็บไฟล์ชั่วคราว ก่อนถูกย้ายด้วย move_uploaded_file()"
  },
  {
    "id": "k-083",
    "question_id": "q-dbsec-083",
    "correct_choice_key": "A",
    "explanation": "Type Casting เช่น (int)$id บังคับให้ค่ากลายเป็นตัวเลขบริสุทธิ์ ตัดอักขระแทรกแซง SQL ทั้งหมดทิ้งได้อย่างเด็ดขาด"
  },
  {
    "id": "k-084",
    "question_id": "q-dbsec-084",
    "correct_choice_key": "A",
    "explanation": "strip_tags() มักมีข้อผิดพลาดกับ Broken HTML tags หรือ Event Handler แนะนำให้ใช้ htmlspecialchars() แทนสำหรับ Output Encoding"
  },
  {
    "id": "k-085",
    "question_id": "q-dbsec-085",
    "correct_choice_key": "A",
    "explanation": "json_encode แปลง PHP Data Structure เป็น JSON string ส่วน json_decode(..., true) แปลง JSON string เป็น Associative Array"
  },
  {
    "id": "k-031",
    "question_id": "q-dbsec-031",
    "correct_choice_key": "A",
    "explanation": "PDO รองรับฐานข้อมูลหลากหลายค่ายแบบสากลและมีฟังก์ชัน Prepared Statements ป้องกัน SQL Injection ในตัว"
  },
  {
    "id": "k-032",
    "question_id": "q-dbsec-032",
    "correct_choice_key": "A",
    "explanation": "Prepared Statements คอมไพล์โครงสร้างคำสั่ง SQL ล่วงหน้า ทำให้ Input จากผู้ใช้ถูกประมวลผลเป็นเพียง Data Literal เสมอ ไม่สามารถเปลี่ยนไวยากรณ์ของ SQL ได้"
  },
  {
    "id": "k-033",
    "question_id": "q-dbsec-033",
    "correct_choice_key": "A",
    "explanation": "เมื่อใช้ Parameter Binding ข้อความ \"' OR 1=1 --\" จะถูกมองเป็นชื่อ username ธรรมดา ไม่สามารถลัดเงื่อนไขได้ จึงปลอดภัย 100%"
  },
  {
    "id": "k-040",
    "question_id": "q-dbsec-040",
    "correct_choice_key": "A",
    "explanation": "การระบุ charset=utf8mb4 ใน DSN ทำให้ Client กับ Server สื่อสารกันด้วยชุดอักขระเดียวกัน ป้องกัน Multibyte SQLi Bypass"
  },
  {
    "id": "k-034",
    "question_id": "q-dbsec-034",
    "correct_choice_key": "A",
    "explanation": "fetch() อ่านข้อมูลทีละ Record เหมาะกับการวนลูป while หรือดึงข้อมูลรายการเดียว ส่วน fetchAll() อ่านข้อมูลทุก Record ลงใน Array"
  },
  {
    "id": "k-035",
    "question_id": "q-dbsec-035",
    "correct_choice_key": "A",
    "explanation": "เครื่องหมาย ? ใน Prepared Statements ทำหน้าที่เป็น Positional Placeholder สำหรับ Bind ค่าตัวแปรตามลำดับ"
  },
  {
    "id": "k-036",
    "question_id": "q-dbsec-036",
    "correct_choice_key": "A",
    "explanation": "bindParam() ผูกตัวแปรด้วย Reference ค่าจะถูกอ่านตอนสั่ง execute() ส่วน bindValue() ผูกค่า Value ทันที"
  },
  {
    "id": "k-037",
    "question_id": "q-dbsec-037",
    "correct_choice_key": "A",
    "explanation": "lastInsertId() ใช้ดึงค่า Auto-Increment ID ของแถวที่เพิ่งถูกเพิ่มด้วยคำสั่ง INSERT ล่าสุดในการเชื่อมต่อนั้น"
  },
  {
    "id": "k-038",
    "question_id": "q-dbsec-038",
    "correct_choice_key": "A",
    "explanation": "UNION-based SQLi ใช้โอเปอเรเตอร์ UNION รวมข้อมูลจากตารางลับ (เช่น ข้อมูล credentials ใน schema) ออกมาแสดงผลร่วมกับ Query หลัก"
  },
  {
    "id": "k-039",
    "question_id": "q-dbsec-039",
    "correct_choice_key": "A",
    "explanation": "CREATE TABLE ตามมาตรฐาน SQL กำหนดคอลัมน์ Primary Key ด้วย INT AUTO_INCREMENT PRIMARY KEY"
  },
  {
    "id": "k-086",
    "question_id": "q-dbsec-086",
    "correct_choice_key": "A",
    "explanation": "ATTR_EMULATE_PREPARES => false ปิดการจำลอง Prepared Statement ใน PHP และส่ง Parameter แยกไปยัง MySQL Engine โดยตรง"
  },
  {
    "id": "k-087",
    "question_id": "q-dbsec-087",
    "correct_choice_key": "A",
    "explanation": "เครื่องหมาย % ต้องนำมาต่อเข้ากับสตริงของตัวแปรก่อนส่งเข้าไปใน Parameter Binding ไม่สามารถเขียน %:name% ใน SQL query string ได้"
  },
  {
    "id": "k-088",
    "question_id": "q-dbsec-088",
    "correct_choice_key": "A",
    "explanation": "Identifier (ชื่อคอลัมน์/ตาราง) ไม่สามารถ Bind ผ่าน Parameter ได้ ต้องใช้ Allowlist / Whitelist Validation ก่อนต่อใน SQL string"
  },
  {
    "id": "k-089",
    "question_id": "q-dbsec-089",
    "correct_choice_key": "A",
    "explanation": "Time-based Blind SQLi ตรวจจับช่องโหว่โดยวัดเวลาการตอบสนองเมื่อแทรกฟังก์ชันหน่วงเวลา (เช่น SLEEP) เพื่อดึงข้อมูลออกมาทีละบิต"
  },
  {
    "id": "k-090",
    "question_id": "q-dbsec-090",
    "correct_choice_key": "A",
    "explanation": "DROP TABLE ทำลายตารางและ Schema ทิ้งทั้งหมด ส่วน TRUNCATE ล้างข้อมูลทั้งหมดในตารางแต่ยังคงโครงสร้างตารางไว้"
  },
  {
    "id": "k-041",
    "question_id": "q-dbsec-041",
    "correct_choice_key": "A",
    "explanation": "คำสั่ง UPDATE หรือ DELETE ใน SQL หากไม่มี WHERE clause จะกระทบข้อมูลทุกแถวในตาราง"
  },
  {
    "id": "k-042",
    "question_id": "q-dbsec-042",
    "correct_choice_key": "A",
    "explanation": "PDO::ERRMODE_EXCEPTION ทำให้ PDO โยน Exception เมื่อคำสั่ง SQL ล้มเหลว ช่วยให้ดักจับด้วย try-catch และสั่ง rollback ได้อย่างถูกต้อง"
  },
  {
    "id": "k-043",
    "question_id": "q-dbsec-043",
    "correct_choice_key": "A",
    "explanation": "การแสดง Raw Exception Message บน Production อาจเปิดเผย Schema, Table Name, File Path ซึ่งแฮกเกอร์ใช้เป็นข้อมูลในการโจมตีต่อ"
  },
  {
    "id": "k-044",
    "question_id": "q-dbsec-044",
    "correct_choice_key": "A",
    "explanation": "การลบข้อมูลเป็น State-changing action ห้ามใช้ลิงก์ GET (เสี่ยงต่อ Web Crawler และ CSRF) ต้องใช้ Form POST พร้อม Confirmation"
  },
  {
    "id": "k-045",
    "question_id": "q-dbsec-045",
    "correct_choice_key": "A",
    "explanation": "ฟังก์ชัน h() เป็น Sanitization Helper มาตรฐานสำหรับ Output Encoding ข้อมูลก่อนเรนเดอร์ลงใน HTML view"
  },
  {
    "id": "k-046",
    "question_id": "q-dbsec-046",
    "correct_choice_key": "A",
    "explanation": "rowCount() คืนค่าจำนวน Rows Affected หลังคำสั่ง UPDATE, DELETE หรือ INSERT"
  },
  {
    "id": "k-047",
    "question_id": "q-dbsec-047",
    "correct_choice_key": "A",
    "explanation": "Standard CRUD update flow: edit.php โหลดข้อมูลเดิมใส่ Form -> ผู้ใช้กดบันทึก -> ส่ง POST ไปยัง update.php ประมวลผลและ Redirect"
  },
  {
    "id": "k-048",
    "question_id": "q-dbsec-048",
    "correct_choice_key": "A",
    "explanation": "Transactions รับประกันคุณสมบัติ ACID โดยหากมี Operation ใดล้มเหลว สามารถเรียก rollBack() เพื่อย้อนสถานะข้อมูลกลับได้"
  },
  {
    "id": "k-049",
    "question_id": "q-dbsec-049",
    "correct_choice_key": "A",
    "explanation": "PRG Pattern (Post/Redirect/Get) ป้องกันการ Re-submit ฟอร์มซ้ำเมื่อผู้ใช้กด Refresh หน้าเว็บ"
  },
  {
    "id": "k-050",
    "question_id": "q-dbsec-050",
    "correct_choice_key": "A",
    "explanation": "ตัวอักษรไทยใน UTF-8 ใช้ 3 bytes ต่อตัว strlen() จะนับไบต์ ขณะที่ mb_strlen(..., \"UTF-8\") จะนับจำนวนตัวอักษรจริง"
  },
  {
    "id": "k-091",
    "question_id": "q-dbsec-091",
    "correct_choice_key": "A",
    "explanation": "Soft Delete เก็บข้อมูลไว้ใน DB โดยเปลี่ยน Flag เพื่อรองรับการกู้คืนและประวัติการตรวจสอบ (Audit Trail) ขณะที่ Hard Delete ลบข้อมูลจริง"
  },
  {
    "id": "k-092",
    "question_id": "q-dbsec-092",
    "correct_choice_key": "A",
    "explanation": "LIMIT กำหนดจำนวนแถวที่จะดึง (Page Size) ส่วน OFFSET กำหนดจำนวนแถวที่จะข้าม (Skip = (Page - 1) * PageSize)"
  },
  {
    "id": "k-093",
    "question_id": "q-dbsec-093",
    "correct_choice_key": "A",
    "explanation": "Secure File Upload ต้องตรวจ Content ด้วย finfo, สุ่มชื่อใหม่ตัด path traversal, บังคับประเภทไฟล์ และจัดเก็บนอก Directory ที่รัน PHP ได้"
  },
  {
    "id": "k-094",
    "question_id": "q-dbsec-094",
    "correct_choice_key": "A",
    "explanation": "header() เพียงส่ง HTTP header แต่ PHP execution ยังไม่หยุด การใส่ exit; บังคับยุติการทำงาน ป้องกัน Execution After Redirect (EAR Vulnerability)"
  },
  {
    "id": "k-095",
    "question_id": "q-dbsec-095",
    "correct_choice_key": "A",
    "explanation": "ACID รับประกันความถูกต้องของ Database Transactions: Atomicity (ทั้งหมดหรือไม่ทำเลย), Consistency, Isolation, Durability (บันทึกถาวร)"
  },
  {
    "id": "k-051",
    "question_id": "q-dbsec-051",
    "correct_choice_key": "A",
    "explanation": "Authentication = ใครเป็นผู้ใช้งาน (Who you are), Authorization = มีสิทธิ์เข้าถึงอะไรได้บ้าง (What you can do)"
  },
  {
    "id": "k-052",
    "question_id": "q-dbsec-052",
    "correct_choice_key": "A",
    "explanation": "MD5 และ SHA-1 ออกแบบมาเพื่อ Checksum มีความเร็วสูงมาก จึงถูกเจาะด้วย Rainbow Tables และ GPU Brute-force ได้อย่างง่ายดาย"
  },
  {
    "id": "k-053",
    "question_id": "q-dbsec-053",
    "correct_choice_key": "A",
    "explanation": "password_hash() สร้าง Salt แบบสุ่มขนาด 22 ตัวอักษรและบันทึกรวมไว้ในแฮชสตริง 60 ตัวอักษรอยู่แล้ว จึงไม่ต้องเก็บ Salt แยก"
  },
  {
    "id": "k-054",
    "question_id": "q-dbsec-054",
    "correct_choice_key": "A",
    "explanation": "password_verify() เป็นฟังก์ชันมาตรฐานที่ตรวจสอบรหัสผ่านกับแฮช โดยใช้ Constant-time algorithm ป้องกัน Timing Attack"
  },
  {
    "id": "k-055",
    "question_id": "q-dbsec-055",
    "correct_choice_key": "A",
    "explanation": "การ Logout ที่ถูกต้อง: 1. ล้างอาร์เรย์ $_SESSION = [] 2. ลบ Cookie PHPSESSID ฝั่งไคลเอนต์ 3. สั่ง session_destroy() ทำลายไฟล์ Session ฝั่งเซิร์ฟเวอร์"
  },
  {
    "id": "k-056",
    "question_id": "q-dbsec-056",
    "correct_choice_key": "A",
    "explanation": "auth_check.php ต้องตรวจสอบว่ามี Session ระบุตัวตนผู้ใช้หรือไม่ ถ้าไม่มีต้องสั่ง Redirect ไปหน้า Login ทันทีและต้องมี exit;"
  },
  {
    "id": "k-057",
    "question_id": "q-dbsec-057",
    "correct_choice_key": "A",
    "explanation": "bcrypt hash มีความยาว 60 chars มาตรฐาน (เช่น $2y$10$...) แต่แนะนำให้สร้างคอลัมน์ VARCHAR(255) เพื่อรองรับอัลกอริทึมใหม่ในอนาคต (เช่น Argon2id)"
  },
  {
    "id": "k-058",
    "question_id": "q-dbsec-058",
    "correct_choice_key": "A",
    "explanation": "Cost parameter ใน bcrypt กำหนด Work factor (2^cost iterations) เพื่อชะลอการคำนวณ ป้องกันการโจมตีด้วย Hardware ถอดรหัสรหัสผ่าน"
  },
  {
    "id": "k-059",
    "question_id": "q-dbsec-059",
    "correct_choice_key": "A",
    "explanation": "การแจ้ง Generic Error ป้องกันการเกิด User Enumeration Vulnerability ที่ช่วยให้ผู้ไม่หวังดีทราบว่ามี Username นั้นอยู่ในระบบหรือไม่"
  },
  {
    "id": "k-060",
    "question_id": "q-dbsec-060",
    "correct_choice_key": "A",
    "explanation": "password_needs_rehash() ช่วยให้อัปเกรดความแข็งแกร่งของ Password Hash ในฐานข้อมูลอัตโนมัติเมื่อระบบปรับเพิ่ม Cost Factor"
  },
  {
    "id": "k-096",
    "question_id": "q-dbsec-096",
    "correct_choice_key": "A",
    "explanation": "RBAC (Role-Based Access Control) คือกลไก Authorization ตรวจสอบบทบาทผู้ใช้ว่ามีสิทธิ์กระทำการใดๆ ในระบบหรือไม่"
  },
  {
    "id": "k-097",
    "question_id": "q-dbsec-097",
    "correct_choice_key": "A",
    "explanation": "มาตรฐานสมัยใหม่ (NIST SP 800-63B) เน้นความยาวของรหัสผ่าน (Length) และการใช้ Passphrase มากกว่าการบังคับเปลี่ยนรหัสผ่านเป็นประจำ"
  },
  {
    "id": "k-098",
    "question_id": "q-dbsec-098",
    "correct_choice_key": "A",
    "explanation": "PHP Session Cookie เริ่มต้นมีชื่อว่า PHPSESSID ทำหน้าที่ถือ Session Token เพื่อจับคู่กับไฟล์เซสชันบนเซิร์ฟเวอร์"
  },
  {
    "id": "k-099",
    "question_id": "q-dbsec-099",
    "correct_choice_key": "A",
    "explanation": "Argon2id เป็น Memory-Hard Hashing ที่ป้องกันการเจาะด้วยชิปฮาร์ดแวร์ขนาน (GPU/ASIC) และได้รับรางวัลชนะเลิศ Password Hashing Competition"
  },
  {
    "id": "k-100",
    "question_id": "q-dbsec-100",
    "correct_choice_key": "A",
    "explanation": "session_unset() เคลียร์ค่าตัวแปรใน $_SESSION ในหน่วยความจำ ขณะที่ session_destroy() ลบไฟล์ Session Storage บนดิสก์"
  },
  {
    "id": "k-061",
    "question_id": "q-dbsec-061",
    "correct_choice_key": "A",
    "explanation": "Session Fixation ป้องกันได้โดยการเรียก session_regenerate_id(true) ทันทีที่ผู้ใช้ล็อกอินสำเร็จ เพื่อสร้าง ID ใหม่และทำลาย ID เก่าทิ้ง"
  },
  {
    "id": "k-062",
    "question_id": "q-dbsec-062",
    "correct_choice_key": "A",
    "explanation": "HttpOnly Flag ป้องกันไม่ให้ JavaScript ฝั่ง Client อ่านค่าคุกกี้ได้ ช่วยสกัดกั้นการขโมย Session ID จากการโจมตี XSS"
  },
  {
    "id": "k-063",
    "question_id": "q-dbsec-063",
    "correct_choice_key": "A",
    "explanation": "CSRF ป้องกันได้ด้วย CSRF Token ที่สุ่มขึ้นมาเฉพาะ Session และฝังในฟอร์ม ซึ่งเว็บไซต์ของผู้โจมตีไม่สามารถเข้าถึงหรือคาดเดาค่านี้ได้"
  },
  {
    "id": "k-064",
    "question_id": "q-dbsec-064",
    "correct_choice_key": "A",
    "explanation": "Idle Timeout วัดจาก Inactivity time ส่วน Absolute Timeout กำหนดอายุขัยสูงสุดของ Session เพื่อบังคับ Re-authentication เป็นระยะ"
  },
  {
    "id": "k-065",
    "question_id": "q-dbsec-065",
    "correct_choice_key": "A",
    "explanation": "SameSite=Strict บล็อกการส่ง Cookie ไปกับ Cross-site request ทุกประเภท ป้องกันการโจมตี CSRF ได้อย่างสมบูรณ์แบบ"
  },
  {
    "id": "k-066",
    "question_id": "q-dbsec-066",
    "correct_choice_key": "A",
    "explanation": "Stored XSS ฝังสคริปต์ลงใน Data Store (เช่น โพสต์เว็บบอร์ด/คอมเมนต์) ส่งผลกระทบต่อเหยื่อทุกคนที่เปิดดูหน้านั้น"
  },
  {
    "id": "k-067",
    "question_id": "q-dbsec-067",
    "correct_choice_key": "A",
    "explanation": "Rate Limiting & Account Lockout ป้องกันการเดารหัสผ่านแบบ Brute-force และการสุ่มรหัสผ่านอัตโนมัติ"
  },
  {
    "id": "k-068",
    "question_id": "q-dbsec-068",
    "correct_choice_key": "A",
    "explanation": "Cache-Control: no-store ป้องกัน Browser Back Button History Caching ทำให้หลัง Logout ข้อมูล Sensitive จะไม่หลงเหลือในแคชของเครื่องสาธารณะ"
  },
  {
    "id": "k-069",
    "question_id": "q-dbsec-069",
    "correct_choice_key": "A",
    "explanation": "session_set_cookie_params() ต้องถูกตั้งค่าก่อนที่ session_start() จะถูกประมวลผล เพื่อให้ Cookie Headers ที่ส่งออกไปมีแฟล็กความปลอดภัยครบถ้วน"
  },
  {
    "id": "k-070",
    "question_id": "q-dbsec-070",
    "correct_choice_key": "A",
    "explanation": "Content Security Policy (CSP) เป็น HTTP Header ที่จำกัดการโหลดทรัพยากรและบล็อก Inline Scripts ช่วยตัดวงจร XSS ถึงแม้จะมีช่องโหว่ในโค้ด"
  },
  {
    "id": "k-101",
    "question_id": "q-dbsec-101",
    "correct_choice_key": "A",
    "explanation": "textContent ป้องกัน DOM XSS เพราะเบราว์เซอร์จะแสดงผลเป็น Text Literal ล้วนๆ โดยไม่ Parse HTML Tags เหมือน innerHTML"
  },
  {
    "id": "k-102",
    "question_id": "q-dbsec-102",
    "correct_choice_key": "A",
    "explanation": "SameSite=Lax ส่ง Cookie เฉพาะ Safe Top-Level GET Navigation จากเว็บอื่น (ทำให้ผู้ใช้ไม่หลุดจากระบบเมื่อกดลิงก์) แต่บล็อก POST Cross-Site Request"
  },
  {
    "id": "k-103",
    "question_id": "q-dbsec-103",
    "correct_choice_key": "A",
    "explanation": "HSTS Header บังคับให้เบราว์เซอร์เชื่อมต่อผ่าน HTTPS เสมอ ป้องกัน Man-in-the-Middle และ SSL Stripping Attacks"
  },
  {
    "id": "k-104",
    "question_id": "q-dbsec-104",
    "correct_choice_key": "A",
    "explanation": "Subresource Integrity (SRI) ใช้ Hash ตรวจสอบความถูกต้องของสคริปต์จาก Third-party CDN ป้องกัน Supply-chain attacks"
  },
  {
    "id": "k-105",
    "question_id": "q-dbsec-105",
    "correct_choice_key": "A",
    "explanation": "CAPTCHA แยกแยะมนุษย์ออกจากบอท ช่วยสกัดกั้น Automated Brute-force, Credential Stuffing และ Form Spamming"
  },
  {
    "id": "k-dbsec-fib-001",
    "question_id": "q-dbsec-fib-001",
    "correct_blank_answers": {
      "blank_1": "prepare()",
      "blank_2": "bindParam()",
      "blank_3": "execute()",
      "blank_4": "SQL Injection"
    },
    "explanation": "วงจรการทำงานของ PDO Prepared Statement: prepare() -> bindParam() -> execute() ป้องกัน SQL Injection"
  },
  {
    "id": "k-dbsec-fib-002",
    "question_id": "q-dbsec-fib-002",
    "correct_blank_answers": {
      "blank_1": "HttpOnly",
      "blank_2": "Secure",
      "blank_3": "session_regenerate_id(true)",
      "blank_4": "Session Fixation"
    },
    "explanation": "แฟล็ก HttpOnly กัน XSS, แฟล็ก Secure บังคับ HTTPS, และ session_regenerate_id(true) ป้องกัน Session Fixation"
  },
  {
    "id": "k-dbsec-fib-003",
    "question_id": "q-dbsec-fib-003",
    "correct_blank_answers": {
      "blank_1": "password_hash()",
      "blank_2": "password_verify()",
      "blank_3": "PASSWORD_DEFAULT",
      "blank_4": "Brute-force Attack"
    },
    "explanation": "การใช้งานชุดฟังก์ชัน Password Hashing API ในภาษา PHP"
  },
  {
    "id": "k-dbsec-mat-001",
    "question_id": "q-dbsec-mat-001",
    "correct_matching": {
      "p1": "ใช้ PDO Prepared Statements ร่วมกับ Parameter Binding",
      "p2": "กรองข้อมูลขาออกด้วย htmlspecialchars(..., ENT_QUOTES, \"UTF-8\")",
      "p3": "สร้างและตรวจสอบ Anti-CSRF Token ที่ฝังในแบบฟอร์ม",
      "p4": "เรียก session_regenerate_id(true) ทันทีเมื่อผู้ใช้ล็อกอินผ่าน"
    },
    "explanation": "การจับคู่ภัยคุกคามทางเว็บกับมาตรการป้องกันที่ตรงจุด"
  },
  {
    "id": "k-dbsec-mat-002",
    "question_id": "q-dbsec-mat-002",
    "correct_matching": {
      "p1": "สร้างแฮชรหัสผ่านอย่างปลอดภัยด้วยอัลกอริทึม bcrypt พร้อม Auto-Salt",
      "p2": "ตรวจสอบรหัสผ่าน Plaintext กับ Hash ในฐานข้อมูลแบบ Constant-Time",
      "p3": "ตรวจสอบว่าแฮชเดิมควรถูกอัปเกรดเป็นอัลกอริทึมหรือ Cost ใหม่หรือไม่",
      "p4": "ตัวเลขกำหนดจำนวนรอบการคำนวณ (Work Factor) เพื่อชะลอการแฮก Brute-force"
    },
    "explanation": "การจับคู่ฟังก์ชันการจัดการรหัสผ่านใน PHP (password_hash, password_verify, password_needs_rehash, cost factor)"
  }
];

export const dbSecSources: QuestionSource[] = [
  {
    "id": "src-001",
    "question_id": "q-dbsec-001",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      3,
      4
    ],
    "evidence_text": "Client-Server Architecture and Web Server role in processing HTTP requests and returning responses."
  },
  {
    "id": "src-002",
    "question_id": "q-dbsec-002",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      12,
      14
    ],
    "evidence_text": "HTML5 Semantic Tags: <main>, <header>, <footer>, <nav>, <article>, <section>."
  },
  {
    "id": "src-003",
    "question_id": "q-dbsec-003",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      8,
      10
    ],
    "evidence_text": "HTTP Status codes 200 OK, 301/302 Redirect, 403 Forbidden, 404 Not Found, 500 Internal Error."
  },
  {
    "id": "src-004",
    "question_id": "q-dbsec-004",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      8,
      10
    ],
    "evidence_text": "HTTP 5xx indicates server-side processing errors and exceptions."
  },
  {
    "id": "src-005",
    "question_id": "q-dbsec-005",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      11,
      13
    ],
    "evidence_text": "HTML5 Doctype declaration enforces Standards Mode rendering."
  },
  {
    "id": "src-006",
    "question_id": "q-dbsec-006",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      11,
      13
    ],
    "evidence_text": "UTF-8 charset declaration in <head> for universal multilingual text support and security."
  },
  {
    "id": "src-007",
    "question_id": "q-dbsec-007",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      5,
      7
    ],
    "evidence_text": "HTTP Stateless nature requires Cookie and Session mechanisms for state tracking."
  },
  {
    "id": "src-008",
    "question_id": "q-dbsec-008",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      18,
      22
    ],
    "evidence_text": "HTML Inline elements vs Block elements classification."
  },
  {
    "id": "src-009",
    "question_id": "q-dbsec-009",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      6,
      9
    ],
    "evidence_text": "3-Tier Architecture: Presentation Tier, Logic Tier, Data Tier."
  },
  {
    "id": "src-010",
    "question_id": "q-dbsec-010",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      7,
      10
    ],
    "evidence_text": "HTTPS TLS/SSL encryption for data confidentiality and integrity."
  },
  {
    "id": "src-071",
    "question_id": "q-dbsec-071",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      9,
      12
    ],
    "evidence_text": "HTTP Content-Type response header and MIME types."
  },
  {
    "id": "src-072",
    "question_id": "q-dbsec-072",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      8,
      11
    ],
    "evidence_text": "HTTP Request Headers: Host, User-Agent, Referer, Accept."
  },
  {
    "id": "src-073",
    "question_id": "q-dbsec-073",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      13,
      16
    ],
    "evidence_text": "HTML5 <nav> tag for major navigation blocks."
  },
  {
    "id": "src-074",
    "question_id": "q-dbsec-074",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      8,
      10
    ],
    "evidence_text": "HTTP 301 vs 302 redirection status codes."
  },
  {
    "id": "src-075",
    "question_id": "q-dbsec-075",
    "file_name": "1-พื้นฐาน Web Application และ HTML.pdf",
    "page_numbers": [
      20,
      24
    ],
    "evidence_text": "HTML image tag alt attribute for accessibility and fallback display."
  },
  {
    "id": "src-011",
    "question_id": "q-dbsec-011",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      15,
      18
    ],
    "evidence_text": "GET method exposes parameters in URL Query String, logged in history and server logs, unsuited for sensitive data."
  },
  {
    "id": "src-012",
    "question_id": "q-dbsec-012",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      22,
      25
    ],
    "evidence_text": "Form file upload requires method=\"POST\" and enctype=\"multipart/form-data\"."
  },
  {
    "id": "src-013",
    "question_id": "q-dbsec-013",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      19,
      21
    ],
    "evidence_text": "HTTP Idempotent methods: GET, PUT, DELETE produce same server side effects when repeated."
  },
  {
    "id": "src-014",
    "question_id": "q-dbsec-014",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      5,
      8
    ],
    "evidence_text": "Input name attribute serves as variable key in $_GET/$_POST."
  },
  {
    "id": "src-015",
    "question_id": "q-dbsec-015",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      8,
      11
    ],
    "evidence_text": "HTML Form label for attribute association with input id for accessibility."
  },
  {
    "id": "src-016",
    "question_id": "q-dbsec-016",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      16,
      19
    ],
    "evidence_text": "Appropriate use cases for GET: search, pagination, bookmarkable read-only queries."
  },
  {
    "id": "src-017",
    "question_id": "q-dbsec-017",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      9,
      12
    ],
    "evidence_text": "Radio button groups sharing the same name attribute for single-choice selection."
  },
  {
    "id": "src-018",
    "question_id": "q-dbsec-018",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      28,
      32
    ],
    "evidence_text": "Client-side validation bypass vulnerability; strict requirement for Server-side validation."
  },
  {
    "id": "src-019",
    "question_id": "q-dbsec-019",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      12,
      14
    ],
    "evidence_text": "Hidden inputs security risks: tampering via DevTools."
  },
  {
    "id": "src-020",
    "question_id": "q-dbsec-020",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      17,
      20
    ],
    "evidence_text": "POST data placement in HTTP Request Body."
  },
  {
    "id": "src-076",
    "question_id": "q-dbsec-076",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      10,
      13
    ],
    "evidence_text": "Array inputs in HTML forms using brackets name=\"item[]\"."
  },
  {
    "id": "src-077",
    "question_id": "q-dbsec-077",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      11,
      14
    ],
    "evidence_text": "HTML <textarea> syntax and multi-line input handling."
  },
  {
    "id": "src-078",
    "question_id": "q-dbsec-078",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      22,
      24
    ],
    "evidence_text": "Form enctype default: application/x-www-form-urlencoded."
  },
  {
    "id": "src-079",
    "question_id": "q-dbsec-079",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      14,
      16
    ],
    "evidence_text": "Form autocomplete attribute security and privacy considerations."
  },
  {
    "id": "src-080",
    "question_id": "q-dbsec-080",
    "file_name": "2-HTML Form และการส่งข้อมูล GET POST.pdf",
    "page_numbers": [
      26,
      30
    ],
    "evidence_text": "HTML5 Form pattern attribute validation using Regular Expressions."
  },
  {
    "id": "src-021",
    "question_id": "q-dbsec-021",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      14,
      18
    ],
    "evidence_text": "PHP Superglobals: $_GET, $_POST, $_SERVER, $_SESSION, $_COOKIE."
  },
  {
    "id": "src-022",
    "question_id": "q-dbsec-022",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      30,
      34
    ],
    "evidence_text": "htmlspecialchars() sanitization to prevent Cross-Site Scripting (XSS)."
  },
  {
    "id": "src-023",
    "question_id": "q-dbsec-023",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      22,
      26
    ],
    "evidence_text": "Strict equality (===) vs loose equality (==) and type juggling security issues."
  },
  {
    "id": "src-024",
    "question_id": "q-dbsec-024",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      38,
      42
    ],
    "evidence_text": "declare(strict_types=1) directive for strict type enforcement."
  },
  {
    "id": "src-025",
    "question_id": "q-dbsec-025",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      28,
      31
    ],
    "evidence_text": "PHP trim() function for stripping leading/trailing whitespace."
  },
  {
    "id": "src-026",
    "question_id": "q-dbsec-026",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      10,
      13
    ],
    "evidence_text": "PHP dot (.) string concatenation operator."
  },
  {
    "id": "src-027",
    "question_id": "q-dbsec-027",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      32,
      36
    ],
    "evidence_text": "filter_var() email validation function behavior."
  },
  {
    "id": "src-028",
    "question_id": "q-dbsec-028",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      11,
      14
    ],
    "evidence_text": "PHP short echo tag syntax <?= ?> equivalent to <?php echo ?>."
  },
  {
    "id": "src-029",
    "question_id": "q-dbsec-029",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      24,
      27
    ],
    "evidence_text": "PHP isset() and null coalescing operator (??) for safe parameter retrieval."
  },
  {
    "id": "src-030",
    "question_id": "q-dbsec-030",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      40,
      44
    ],
    "evidence_text": "require_once vs include error handling difference (Fatal Error vs Warning)."
  },
  {
    "id": "src-081",
    "question_id": "q-dbsec-081",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      45,
      48
    ],
    "evidence_text": "PHP error reporting configuration: display_errors=0 vs log_errors=1 for production security."
  },
  {
    "id": "src-082",
    "question_id": "q-dbsec-082",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      34,
      38
    ],
    "evidence_text": "PHP $_FILES superglobal structure (name, type, tmp_name, error, size)."
  },
  {
    "id": "src-083",
    "question_id": "q-dbsec-083",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      26,
      30
    ],
    "evidence_text": "Type casting (int) as a lightweight numeric sanitization technique."
  },
  {
    "id": "src-084",
    "question_id": "q-dbsec-084",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      31,
      35
    ],
    "evidence_text": "strip_tags() limitations compared to htmlspecialchars() for XSS defense."
  },
  {
    "id": "src-085",
    "question_id": "q-dbsec-085",
    "file_name": "3-PHP.pdf",
    "page_numbers": [
      36,
      40
    ],
    "evidence_text": "PHP JSON serialization and deserialization functions."
  },
  {
    "id": "src-031",
    "question_id": "q-dbsec-031",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      12,
      16
    ],
    "evidence_text": "PDO architecture, database driver abstraction, OOP and Prepared Statements."
  },
  {
    "id": "src-032",
    "question_id": "q-dbsec-032",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      35,
      42
    ],
    "evidence_text": "Prepared Statements & parameter binding eliminate SQL Injection by pre-compiling SQL grammar."
  },
  {
    "id": "src-033",
    "question_id": "q-dbsec-033",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      44,
      48
    ],
    "evidence_text": "Parameter binding treats payload \"' OR 1=1 --\" strictly as literal data."
  },
  {
    "id": "src-040",
    "question_id": "q-dbsec-040",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      18,
      22
    ],
    "evidence_text": "PDO DSN charset=utf8mb4 specification for full Unicode and encoding safety."
  },
  {
    "id": "src-034",
    "question_id": "q-dbsec-034",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      28,
      32
    ],
    "evidence_text": "PDO fetch vs fetchAll behavior and associative array return types."
  },
  {
    "id": "src-035",
    "question_id": "q-dbsec-035",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      36,
      40
    ],
    "evidence_text": "Positional placeholders (?) vs Named placeholders (:name) in Prepared Statements."
  },
  {
    "id": "src-036",
    "question_id": "q-dbsec-036",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      46,
      50
    ],
    "evidence_text": "PDO bindParam (by reference) vs bindValue (by value) mechanism."
  },
  {
    "id": "src-037",
    "question_id": "q-dbsec-037",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      52,
      55
    ],
    "evidence_text": "PDO lastInsertId() method usage for retrieving auto-increment primary keys."
  },
  {
    "id": "src-038",
    "question_id": "q-dbsec-038",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      40,
      45
    ],
    "evidence_text": "Union-based SQL Injection anatomy and extraction technique."
  },
  {
    "id": "src-039",
    "question_id": "q-dbsec-039",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      8,
      12
    ],
    "evidence_text": "SQL Table creation syntax, data types, and primary key constraints."
  },
  {
    "id": "src-086",
    "question_id": "q-dbsec-086",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      20,
      24
    ],
    "evidence_text": "PDO ATTR_EMULATE_PREPARES option and native prepared statements."
  },
  {
    "id": "src-087",
    "question_id": "q-dbsec-087",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      42,
      46
    ],
    "evidence_text": "SQL LIKE wildcard parameter binding pattern in PDO."
  },
  {
    "id": "src-088",
    "question_id": "q-dbsec-088",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      48,
      52
    ],
    "evidence_text": "Dynamic SQL identifier handling (ORDER BY, column names) via allowlist validation."
  },
  {
    "id": "src-089",
    "question_id": "q-dbsec-089",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      41,
      45
    ],
    "evidence_text": "Time-based Blind SQL Injection principles."
  },
  {
    "id": "src-090",
    "question_id": "q-dbsec-090",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      9,
      13
    ],
    "evidence_text": "SQL DDL commands: DROP vs TRUNCATE vs DELETE."
  },
  {
    "id": "src-041",
    "question_id": "q-dbsec-041",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      8,
      14
    ],
    "evidence_text": "UPDATE and DELETE without WHERE clause affects all rows in the database table."
  },
  {
    "id": "src-042",
    "question_id": "q-dbsec-042",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      25,
      30
    ],
    "evidence_text": "PDO::ERRMODE_EXCEPTION for robust exception handling and transactional rollback."
  },
  {
    "id": "src-043",
    "question_id": "q-dbsec-043",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      32,
      38
    ],
    "evidence_text": "Information disclosure prevention by suppressing raw database error messages in production."
  },
  {
    "id": "src-044",
    "question_id": "q-dbsec-044",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      15,
      20
    ],
    "evidence_text": "Safe deletion workflow using POST requests and user confirmation."
  },
  {
    "id": "src-045",
    "question_id": "q-dbsec-045",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      26,
      29
    ],
    "evidence_text": "Helper function h() implementation for output escaping in views."
  },
  {
    "id": "src-046",
    "question_id": "q-dbsec-046",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      22,
      26
    ],
    "evidence_text": "PDOStatement rowCount() method for verifying updated/deleted rows."
  },
  {
    "id": "src-047",
    "question_id": "q-dbsec-047",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      40,
      48
    ],
    "evidence_text": "Standard CRUD file architecture (config.php, index.php, edit.php, update.php, delete.php)."
  },
  {
    "id": "src-048",
    "question_id": "q-dbsec-048",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      34,
      39
    ],
    "evidence_text": "PDO Database transactions and ACID integrity."
  },
  {
    "id": "src-049",
    "question_id": "q-dbsec-049",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      50,
      54
    ],
    "evidence_text": "Post/Redirect/Get (PRG) design pattern in web forms."
  },
  {
    "id": "src-050",
    "question_id": "q-dbsec-050",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      27,
      30
    ],
    "evidence_text": "Multibyte string handling mb_strlen vs strlen in UTF-8."
  },
  {
    "id": "src-091",
    "question_id": "q-dbsec-091",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      18,
      22
    ],
    "evidence_text": "Soft delete vs hard delete patterns in enterprise database design."
  },
  {
    "id": "src-092",
    "question_id": "q-dbsec-092",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      12,
      16
    ],
    "evidence_text": "SQL pagination with LIMIT and OFFSET."
  },
  {
    "id": "src-093",
    "question_id": "q-dbsec-093",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      28,
      34
    ],
    "evidence_text": "Secure file upload verification and storage best practices."
  },
  {
    "id": "src-094",
    "question_id": "q-dbsec-094",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      51,
      55
    ],
    "evidence_text": "Execution After Redirect (EAR) prevention using exit after header Location."
  },
  {
    "id": "src-095",
    "question_id": "q-dbsec-095",
    "file_name": "5-PHP MySQL 2.pdf",
    "page_numbers": [
      35,
      38
    ],
    "evidence_text": "Database Transaction ACID properties."
  },
  {
    "id": "src-051",
    "question_id": "q-dbsec-051",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      4,
      8
    ],
    "evidence_text": "Authentication (identifying users) vs Authorization (granting permissions)."
  },
  {
    "id": "src-052",
    "question_id": "q-dbsec-052",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      15,
      20
    ],
    "evidence_text": "MD5 and SHA-1 obsolescence for password storage; vulnerability to GPU rainbow table cracking."
  },
  {
    "id": "src-053",
    "question_id": "q-dbsec-053",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      22,
      28
    ],
    "evidence_text": "password_hash() with BCRYPT automatically generates cryptographic salt and embeds it in hash output."
  },
  {
    "id": "src-054",
    "question_id": "q-dbsec-054",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      12,
      16
    ],
    "evidence_text": "password_verify() usage and constant-time string comparison."
  },
  {
    "id": "src-055",
    "question_id": "q-dbsec-055",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      18,
      22
    ],
    "evidence_text": "Proper session teardown and logout implementation."
  },
  {
    "id": "src-056",
    "question_id": "q-dbsec-056",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      28,
      33
    ],
    "evidence_text": "Authentication guard script (auth_check.php) pattern."
  },
  {
    "id": "src-057",
    "question_id": "q-dbsec-057",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      24,
      27
    ],
    "evidence_text": "Bcrypt 60-character length format and database column sizing."
  },
  {
    "id": "src-058",
    "question_id": "q-dbsec-058",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      25,
      29
    ],
    "evidence_text": "Bcrypt cost parameter (work factor) calibration."
  },
  {
    "id": "src-059",
    "question_id": "q-dbsec-059",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      35,
      38
    ],
    "evidence_text": "User enumeration prevention via generic authentication error messages."
  },
  {
    "id": "src-060",
    "question_id": "q-dbsec-060",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      29,
      32
    ],
    "evidence_text": "password_needs_rehash() automated hash upgrading strategy."
  },
  {
    "id": "src-096",
    "question_id": "q-dbsec-096",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      6,
      10
    ],
    "evidence_text": "Role-Based Access Control (RBAC) authorization verification."
  },
  {
    "id": "src-097",
    "question_id": "q-dbsec-097",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      14,
      18
    ],
    "evidence_text": "Modern password policy guidelines (length over periodic rotation)."
  },
  {
    "id": "src-098",
    "question_id": "q-dbsec-098",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      16,
      19
    ],
    "evidence_text": "PHP default session cookie identifier PHPSESSID."
  },
  {
    "id": "src-099",
    "question_id": "q-dbsec-099",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      26,
      30
    ],
    "evidence_text": "Argon2id memory-hard password hashing advantages."
  },
  {
    "id": "src-100",
    "question_id": "q-dbsec-100",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      19,
      23
    ],
    "evidence_text": "session_unset() vs session_destroy() semantics."
  },
  {
    "id": "src-061",
    "question_id": "q-dbsec-061",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      10,
      18
    ],
    "evidence_text": "Session Fixation vs Session Hijacking; protection via session_regenerate_id(true)."
  },
  {
    "id": "src-062",
    "question_id": "q-dbsec-062",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      28,
      36
    ],
    "evidence_text": "Cookie security flags: HttpOnly prevents JavaScript access, Secure enforces HTTPS, SameSite mitigates CSRF."
  },
  {
    "id": "src-063",
    "question_id": "q-dbsec-063",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      44,
      55
    ],
    "evidence_text": "CSRF Synchronizer Token Pattern defense against cross-site forged requests."
  },
  {
    "id": "src-064",
    "question_id": "q-dbsec-064",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      18,
      22
    ],
    "evidence_text": "Session Timeout strategies: Idle Timeout vs Absolute Timeout."
  },
  {
    "id": "src-065",
    "question_id": "q-dbsec-065",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      30,
      34
    ],
    "evidence_text": "SameSite Cookie attributes (Strict, Lax, None) mechanics."
  },
  {
    "id": "src-066",
    "question_id": "q-dbsec-066",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      38,
      44
    ],
    "evidence_text": "Stored XSS vs Reflected XSS taxonomy and impact."
  },
  {
    "id": "src-067",
    "question_id": "q-dbsec-067",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      26,
      29
    ],
    "evidence_text": "Rate limiting and lockout thresholds for password brute-force defense."
  },
  {
    "id": "src-068",
    "question_id": "q-dbsec-068",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      66,
      68
    ],
    "evidence_text": "Cache Control headers preventing post-logout history snooping."
  },
  {
    "id": "src-069",
    "question_id": "q-dbsec-069",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      36,
      40
    ],
    "evidence_text": "session_set_cookie_params() invocation order before session_start()."
  },
  {
    "id": "src-070",
    "question_id": "q-dbsec-070",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      60,
      65
    ],
    "evidence_text": "Content Security Policy (CSP) defense in depth for mitigating XSS impact."
  },
  {
    "id": "src-101",
    "question_id": "q-dbsec-101",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      40,
      45
    ],
    "evidence_text": "DOM-based XSS mitigation using textContent instead of innerHTML."
  },
  {
    "id": "src-102",
    "question_id": "q-dbsec-102",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      32,
      36
    ],
    "evidence_text": "SameSite Lax vs Strict navigation behavior."
  },
  {
    "id": "src-103",
    "question_id": "q-dbsec-103",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      24,
      28
    ],
    "evidence_text": "HTTP Strict Transport Security (HSTS) for transport encryption enforcement."
  },
  {
    "id": "src-104",
    "question_id": "q-dbsec-104",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      62,
      66
    ],
    "evidence_text": "Subresource Integrity (SRI) validation for CDN assets."
  },
  {
    "id": "src-105",
    "question_id": "q-dbsec-105",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      48,
      52
    ],
    "evidence_text": "CAPTCHA role in defending against automated bot and brute-force attacks."
  },
  {
    "id": "src-dbsec-fib-001",
    "question_id": "q-dbsec-fib-001",
    "file_name": "4-PHP MySQL-1.pdf",
    "page_numbers": [
      35,
      45
    ],
    "evidence_text": "PDO prepare, bindParam, and execute statement lifecycle."
  },
  {
    "id": "src-dbsec-fib-002",
    "question_id": "q-dbsec-fib-002",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      20,
      35
    ],
    "evidence_text": "HttpOnly, Secure cookie flags, and session_regenerate_id(true) protection."
  },
  {
    "id": "src-dbsec-fib-003",
    "question_id": "q-dbsec-fib-003",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      20,
      28
    ],
    "evidence_text": "PHP password_hash and password_verify lifecycle."
  },
  {
    "id": "src-dbsec-mat-001",
    "question_id": "q-dbsec-mat-001",
    "file_name": "7-Session Security and Login Protection.pdf",
    "page_numbers": [
      5,
      60
    ],
    "evidence_text": "Web security threats (SQLi, XSS, CSRF, Session Fixation) and mitigation patterns."
  },
  {
    "id": "src-dbsec-mat-002",
    "question_id": "q-dbsec-mat-002",
    "file_name": "6-PHP Login_Logout.pdf",
    "page_numbers": [
      20,
      32
    ],
    "evidence_text": "PHP password hashing functions and bcrypt work factor."
  }
];
