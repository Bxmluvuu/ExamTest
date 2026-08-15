# ExamPlatform — Multi-Subject Content Library & Intelligent Exam Engine

ระบบเว็บแอปพลิเคชันคลังเนื้อหา สไลด์ PDF และคลังข้อสอบหลายวิชาแบบ Production-ready ออกแบบตามหลักสถาปัตยกรรมระดับองค์กร (Next.js App Router, TypeScript Strict, Supabase PostgreSQL with RLS, Server-side Scoring & Blueprint Engine)

---

## 🌟 จุดเด่นและฟีเจอร์สำคัญ (Core Features)

### 1. ระบบผู้ใช้และการควบคุมสิทธิ์ (Authentication & RBAC)
- รองรับ Role `student` (ผู้เรียน) และ `admin` (ผู้ดูแลระบบ/อาจารย์)
- Login / Register ด้วย Email & Password, รองรับ Google OAuth Provider
- Middleware & Server-side Session Guards ป้องกัน Unauthorized เข้าถึง Admin Routes
- Role Switcher ในตัวสำหรับทดสอบและสลับมุมมองระหว่าง Student และ Admin ได้ทันที

### 2. คลังวิชาและเอกสารการสอน (Subject Workspace & Private Storage)
- จัดการโครงสร้างรายวิชา บทเรียน (Chapters) และหัวข้อย่อย (Topics)
- Private Storage สำหรับไฟล์ PDF สไลด์บรรยาย และข้อสอบเก่า (Past Exams)
- Document Viewer ในระบบพร้อม Short-lived Signed URL อายุสั้น
- ตรวจจับความสมบูรณ์และ Scanned PDF (`needs_ocr` detector)
- จดจำประวัติหน้าที่อ่านล่าสุด (Reading Progress) รายบุคคล

### 3. ระบบพิมพ์เขียวและการจัดชุดข้อสอบ (Exam Blueprint Engine)
- สุ่มคำถามตาม Exam Blueprint (กำหนดสัดส่วนหัวข้อ, ความยาก Easy/Med/Hard, จำนวนข้อ, ระยะเวลา)
- โหมดการสอบครบถ้วน 4 รูปแบบ:
  1. **Exam Mode**: จำลองสอบจริงตาม Blueprint
  2. **Chapter Mode**: เลือกเจาะจงบทเรียนและหัวข้อที่ต้องการ
  3. **Weakness Mode**: เน้นหัวข้อที่ผู้ใช้มีความแม่นยำต่ำกว่าเกณฑ์เพื่อปิดจุดอ่อน
  4. **Mistakes Mode**: ทบทวนข้อที่เคยตอบผิดในอดีต
- อัลกอริทึมหลีกเลี่ยงข้อสอบที่เพิ่งทำไปล่าสุด (`avoid_recent_questions`)
- ป้องกันคำถามซ้ำใน Attempt เดียวกัน 100%
- Randomized Choice Order พร้อม Immutable Question Snapshot

### 4. ประสบการณ์ทำข้อสอบระดับ Focus Mode (Exam Experience)
- Auto-save คำตอบทุกครั้งที่คลิกเลือก พร้อมสถานะบันทึกเรียบหรู
- ระบบ Question Navigator แสดงสถานะตอบแล้ว / ยังไม่ตอบ / ติดดาว (Bookmark)
- Exam Timer นับถอยหลังพร้อมแจ้งเตือนเวลาก่อนหมด
- รีโหลดหน้าเว็บแล้วทำต่อได้ทันที (Reload & Resume)
- ยืนยันก่อนส่งข้อสอบ (Submission Confirmation) ป้องกันการส่งโดยไม่ตั้งใจ

### 5. การตรวจคะแนนและวิเคราะห์ผลลัพธ์ (Server-side Grading & Analytics)
- ตรวจคะแนนฝั่ง Server / Security Definer RPC ป้องกัน Answer Key รั่วไหล
- แสดงคะแนนรวม เปอร์เซ็นต์ความถูกต้อง และเวลาที่ใช้
- Breakdown คะแนนแยกตาม Chapter, Topic และ Difficulty
- เฉลยละเอียดพร้อม **Source Citation** (ชื่อไฟล์สไลด์, เลขหน้า, ข้อความหลักฐานอ้างอิง)
- สถิติ Score Trends แบบ Line Chart พร้อม Deterministic Recommendations

### 6. ระบบสำหรับผู้ดูแลระบบ (Admin Workspace)
- Question Bank CRUD พร้อม Search, Filter, Sort, Pagination
- Question Lifecycle: `draft` ➔ `needs_review` ➔ `approved` ➔ `published` ➔ `retired`
- Batch Operations: Publish, Approve, Retire
- Blueprint Quota Validator ตรวจสอบความพร้อมของคลังคำถามเทียบกับเกณฑ์ Blueprint
- Coverage Report เทียบกับเป้าหมาย 500 ข้อต่อวิชา
- Audit Logs บันทึกประวัติการแก้ไขและเผยแพร่ข้อสอบ

### 7. Document & AI Question Generation CLI Pipeline
- CLI Pipeline ประมวลผลเอกสารสไลด์ ➔ สกัดข้อความแยกหน้า ➔ วิเคราะห์หัวข้อ ➔ สร้างคำถามด้วย AI (OpenAI-compatible / Mock Provider) ➔ ตรวจสอบ Zod Schema & Quality Flags ➔ นำเข้า Question Bank เป็นสถานะ Draft เพื่อรอ Admin Review

---

## 🛠️ Tech Stack

```text
Frontend:       Next.js 16 (App Router) + React 19
Language:       TypeScript strict
Styling:        Tailwind CSS (HSL semantic tokens & WCAG AA)
Components:     shadcn-inspired headless components, Lucide Icons
Forms & Schema: React Hook Form + Zod
Charts:         Recharts (Responsive Line Chart)
Database/Auth:  Supabase PostgreSQL, Supabase Auth, Row Level Security (RLS)
Testing:        Vitest (Unit/Integration) + Playwright (E2E Desktop & Mobile)
```

---

## 🚀 การติดตั้งและเริ่มใช้งาน (Getting Started with Bun)

### 1. โคลน Repository และติดตั้ง Dependencies
```bash
git clone <repo-url>
cd ExamTestWeb
bun install
```

### 2. ตั้งค่า Environment Variables
คัดลอกไฟล์ `.env.example` เป็น `.env.local`:
```bash
cp .env.example .env.local
```

ตั้งค่าค่าตัวแปรใน `.env.local`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Server-only Secret Key (Never expose to client)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Provider Configuration (OpenAI-compatible)
AI_API_KEY=your_openai_api_key
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
```
*(หมายเหตุ: หากไม่มี Supabase หรือ AI API Key ระบบจะทำงานผ่าน Local Resilient Fallback Engine ให้โดยอัตโนมัติ 100%)*

### 3. รัน Database Migrations & Storage Setup (บน Supabase)
นำไฟล์ SQL ในโฟลเดอร์ `supabase/migrations/` ไปรันใน Supabase SQL Editor:
1. `supabase/migrations/20260815000000_init_schema.sql` (สร้างตาราง, RLS, Indexes, Triggers, RPCs)
2. `supabase/migrations/20260815000001_storage_setup.sql` (สร้าง Storage Buckets & Policies)

### 4. รันคำสั่ง Seed ข้อมูลเริ่มต้น
```bash
bun run seed
```

### 5. เปิดเซิร์ฟเวอร์สำหรับพัฒนา (Dev Server)
```bash
bun run dev
```
เปิดบราวเซอร์ที่: `http://localhost:3000`

---

## 🧪 การทดสอบระบบ (Testing & Verification)

### รัน Typecheck & Lint
```bash
bun run typecheck
bun run lint
```

### รัน Unit & Integration Tests (Vitest)
```bash
bun run test
```

### รัน End-to-End Tests (Playwright Desktop & Mobile)
```bash
bun run test:e2e
```

---

## 🤖 การใช้งาน CLI AI Generation Pipeline

สั่งรัน Pipeline สกัดสไลด์และ Generate ข้อสอบเข้าคลังแบบ Draft:
```bash
bun run pipeline
```

---

## 📁 โครงสร้างโปรเจกต์ (Project Architecture)

```text
├── content/                     # คลังเนื้อหาและเอกสารสไลด์
│   └── subjects/
│       ├── database-systems/
│       │   ├── subject.json
│       │   ├── blueprint.json
│       │   ├── slides/
│       │   └── past-exams/
│       └── computer-networks/
├── supabase/
│   └── migrations/              # Database schema, RLS, RPCs, Storage
├── src/
│   ├── app/                     # Next.js App Router (Pages & API Routes)
│   ├── components/
│   │   ├── ui/                  # Reusable UI Atoms (Button, Card, Input, Progress)
│   │   ├── shell/               # AppShell, Sidebar, MobileNav, PageHeader
│   │   ├── learner/             # MetricStrip, SubjectCard, ExamRunner, ResultOverview
│   │   └── admin/               # QuestionTable, BlueprintValidator, EditModal
│   └── lib/
│       ├── types/               # TypeScript domain models
│       ├── supabase/            # Browser & Server Supabase clients
│       ├── blueprint-engine.ts  # Quota allocation & attempt generation
│       ├── scoring-engine.ts    # Server-side grading & breakdowns
│       ├── analytics-engine.ts  # Trends & deterministic recommendations
│       ├── question-validator.ts# Zod schemas & Jaccard duplicate detection
│       ├── pdf-extract.ts       # PDF parsing & OCR detection
│       ├── ai-adapter.ts        # AI adapter & mock provider
│       └── db-adapter.ts        # Data layer & local fallback persistence
├── tests/                       # Vitest unit & integration test suite
├── e2e/                         # Playwright end-to-end test suite
└── scripts/                     # Standalone CLI tools (seed, pipeline)
```

---

## 🛡️ Security & Integrity Highlights

- **Row Level Security (RLS)**: บังคับใช้ใน PostgreSQL ทุกตาราง
- **Answer Key Masking**: ป้องกัน `correct_choice_key` และ `explanation` รั่วไหลสู่ Client ก่อนกดยืนยันส่งข้อสอบ
- **Server-side Grading**: คำนวณคะแนนผ่าน RPC / Server logic ไม่รับค่า score/isCorrect จาก client
- **Open Redirect Guard**: ตรวจสอบ Domain และ Relative path ใน Auth callback
- **Immutable Snapshots**: ผลการสอบในอดีตไม่เปลี่ยนแปลงแม้คำถามต้นฉบับจะถูกแก้ไขภายหลัง
