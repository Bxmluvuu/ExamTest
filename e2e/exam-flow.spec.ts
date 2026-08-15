import { test, expect } from '@playwright/test';

test.describe('Learner App vs Admin Console Separation E2E Flows', () => {

  test('1. Student Authentication, Dashboard & Strict UI Separation', async ({ page }, testInfo) => {
    // Navigate to Login page
    await page.goto('/login');
    await expect(page.getByText('เข้าสู่ระบบ ExamPlatform')).toBeVisible();

    // Click Student Demo Login
    await page.locator('button:has-text("เข้าเป็น Student")').click();

    // Verify redirected to /dashboard
    await page.waitForURL('**/dashboard');
    await expect(page).toHaveTitle(/ExamPlatform/);

    // Verify Learner Desktop Navigation
    if (!testInfo.project.name.includes('mobile')) {
      const sidebar = page.locator('aside[aria-label="Learner Navigation"]');
      await expect(sidebar).toBeVisible();
      await expect(sidebar.getByText('ภาพรวม', { exact: true })).toBeVisible();
      await expect(sidebar.getByText('วิชาของฉัน', { exact: true })).toBeVisible();
      await expect(sidebar.getByText('ฝึกทำข้อสอบ', { exact: true })).toBeVisible();
      await expect(sidebar.getByText('ประวัติการสอบ', { exact: true })).toBeVisible();
      await expect(sidebar.getByText('ผลการเรียน & สถิติ', { exact: true })).toBeVisible();
      await expect(sidebar.getByText('ข้อที่บันทึกไว้', { exact: true })).toBeVisible();

      // Strict check: NO Admin Console management items in Learner Sidebar
      await expect(sidebar.getByText('คลังคำถาม (Question Bank)')).not.toBeVisible();
      await expect(sidebar.getByText('AI Generation Runs')).not.toBeVisible();
      await expect(sidebar.getByText('Audit Logs')).not.toBeVisible();
    } else {
      // Mobile Bottom Nav check
      const bottomNav = page.locator('nav[aria-label="Learner Mobile Bottom Navigation"]');
      await expect(bottomNav).toBeVisible();
      await expect(bottomNav.getByText('ภาพรวม')).toBeVisible();
      await expect(bottomNav.getByText('วิชา')).toBeVisible();
      await expect(bottomNav.getByText('ฝึกทำ')).toBeVisible();
      await expect(bottomNav.getByText('สถิติ')).toBeVisible();
      await expect(bottomNav.getByText('เพิ่มเติม')).toBeVisible();

      // Strict check: NO Admin tab in Learner Bottom Nav!
      await expect(bottomNav.getByText('Admin')).not.toBeVisible();
    }

    // Verify Learner Dashboard metric overview
    await expect(page.getByText('คะแนนเฉลี่ย', { exact: true })).toBeVisible();
    await expect(page.getByText('จำนวนข้อที่ฝึกฝน', { exact: true })).toBeVisible();

    // Screenshot Learner Dashboard
    await page.screenshot({ path: `test-results/learner-dashboard-${testInfo.project.name}.png`, fullPage: true });
  });

  test('2. Student Subject Workspace & Document Reading Flow', async ({ page }, testInfo) => {
    // Login as student
    await page.goto('/login');
    await page.locator('button:has-text("เข้าเป็น Student")').click();
    await page.waitForURL('**/dashboard');

    // Open Subjects list
    await page.goto('/subjects');
    await expect(page.locator('h1')).toContainText('คลังวิชาและเอกสาร');

    // Click Database Systems
    await page.goto('/subjects/database-systems');
    await expect(page.locator('h1')).toContainText('Database Systems');

    // Open Materials tab
    await page.getByRole('button', { name: /เนื้อหา & สไลด์/ }).click();
    await expect(page.locator('text=Chapter 01 - Relational Model & Schema.pdf')).toBeVisible();

    if (!testInfo.project.name.includes('mobile')) {
      await page.screenshot({ path: `test-results/learner-subject-desktop.png`, fullPage: true });
    }

    // Open PDF Document
    await page.locator('text=เปิดอ่านเอกสาร').first().click();
    await expect(page.locator('text=Lecture Slide Material')).toBeVisible();
    await expect(page.locator('text=หน้า 1 /')).toBeVisible();
  });

  test('3. Student Exam Runner in Focus Mode & Submission', async ({ page }, testInfo) => {
    // Login as student
    await page.goto('/login');
    await page.locator('button:has-text("เข้าเป็น Student")').click();
    await page.waitForURL('**/dashboard');

    // Open practice setup
    await page.goto('/practice/new?subjectId=sub-db-001&mode=exam');
    await expect(page.locator('h1')).toContainText('ตั้งค่าและเริ่มทำข้อสอบ');

    // Click Start Exam
    await page.locator('button:has-text("เริ่มทำข้อสอบ")').click();

    // Should navigate to /attempts/[id] Focus Mode
    await page.waitForURL(/\/attempts\/att-/);
    await expect(page.getByText('ข้อที่ 1', { exact: true })).toBeVisible();

    // In focus mode, sidebar and bottom nav must be hidden!
    await expect(page.locator('aside[aria-label="Learner Navigation"]')).not.toBeVisible();
    await expect(page.locator('nav[aria-label="Learner Mobile Bottom Navigation"]')).not.toBeVisible();

    if (testInfo.project.name.includes('mobile')) {
      await page.screenshot({ path: `test-results/learner-exam-mobile.png`, fullPage: true });
    }

    // Answer Question 1 (Select Choice B)
    await page.locator('div[role="radio"]').nth(1).click();
    await expect(page.locator('text=บันทึกคำตอบแล้ว')).toBeVisible();

    // Next question
    await page.locator('button:has-text("ข้อถัดไป")').click();
    await expect(page.getByText('ข้อที่ 2', { exact: true })).toBeVisible();

    // Answer Question 2
    await page.locator('div[role="radio"]').nth(0).click();

    // Submit Exam
    await page.locator('header button:has-text("ส่งข้อสอบ")').click();
    await expect(page.locator('text=ยืนยันการส่งข้อสอบ')).toBeVisible();
    await page.locator('button:has-text("ยืนยันส่งข้อสอบ")').click();

    // Should redirect to result page
    await page.waitForURL(/\/attempts\/.*\/result/);
    await expect(page.locator('text=คะแนนรวม')).toBeVisible();
    await expect(page.locator('text=เฉลยและคำอธิบายละเอียด')).toBeVisible();
  });

  test('4. Student Direct Access to /admin is BLOCKED', async ({ page }) => {
    // Login as student
    await page.goto('/login');
    await page.locator('button:has-text("เข้าเป็น Student")').click();
    await page.waitForURL('**/dashboard');

    // Student attempts to access /admin directly
    await page.goto('/admin');

    // Must be redirected to /unauthorized or /dashboard
    await page.waitForURL(url => url.pathname === '/unauthorized' || url.pathname === '/dashboard');
    if (page.url().includes('/unauthorized')) {
      await expect(page.locator('text=ไม่มีสิทธิ์เข้าถึงพื้นที่นี้')).toBeVisible();
    }
  });

  test('5. Admin Authentication, Admin Console & Operational Tools', async ({ page }, testInfo) => {
    // Navigate to Login page and login as Admin
    await page.goto('/login');
    await page.locator('button:has-text("เข้าเป็น Admin")').click();

    // Verify redirected directly to /admin
    await page.waitForURL('**/admin');
    await expect(page.locator('h1')).toContainText('ภาพรวมระบบ');

    // Verify Admin Navigation
    if (!testInfo.project.name.includes('mobile')) {
      const adminSidebar = page.locator('aside[aria-label="Admin Navigation"]');
      await expect(adminSidebar).toBeVisible();
      await expect(adminSidebar.getByText('Admin Console')).toBeVisible();
      await expect(adminSidebar.getByText('รายวิชา')).toBeVisible();
      await expect(adminSidebar.getByText('คลังคำถาม')).toBeVisible();
      await expect(adminSidebar.getByText('Exam Blueprints')).toBeVisible();
      await expect(adminSidebar.getByText('AI Generation Runs')).toBeVisible();
      await expect(adminSidebar.getByText('เปิดมุมมองผู้เรียน')).toBeVisible();

      await page.screenshot({ path: `test-results/admin-dashboard-desktop.png`, fullPage: true });
    } else {
      await page.screenshot({ path: `test-results/admin-dashboard-mobile.png`, fullPage: true });
    }

    // Open Admin Question Bank
    await page.goto('/admin/questions');
    await expect(page.locator('h1')).toContainText('คลังคำถามและจัดการข้อสอบ');
    await expect(page.locator('table')).toBeVisible();

    if (!testInfo.project.name.includes('mobile')) {
      await page.screenshot({ path: `test-results/admin-questions-desktop.png`, fullPage: true });
    } else {
      await page.screenshot({ path: `test-results/admin-questions-mobile.png`, fullPage: true });
    }

    // Open Admin Documents
    await page.goto('/admin/documents');
    await expect(page.locator('h1')).toContainText('จัดการเอกสารและสไลด์เนื้อหา');
    await expect(page.locator('table')).toBeVisible();

    if (!testInfo.project.name.includes('mobile')) {
      await page.screenshot({ path: `test-results/admin-documents-desktop.png`, fullPage: true });
    }

    // Open Admin Blueprints
    await page.goto('/admin/blueprints');
    await expect(page.locator('h1')).toContainText('จัดการ Exam Blueprints');
    await expect(page.locator('text=การจัดสรรโควตาตามพิมพ์เขียว').first()).toBeVisible();

    // Switch back to Learner View via action
    if (!testInfo.project.name.includes('mobile')) {
      await page.locator('aside[aria-label="Admin Navigation"] button:has-text("เปิดมุมมองผู้เรียน")').click();
      await page.waitForURL('**/dashboard');
      await expect(page.locator('h1')).toContainText('สวัสดี');
    }
  });

  test('6. User Registration & Password Strength Validation Flow', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByText('สร้างบัญชีผู้เรียนใหม่')).toBeVisible();

    // Fill form with weak password
    await page.locator('input[type="text"]').fill('ทดสอบ นักเรียน');
    await page.locator('input[type="email"]').fill(`newstudent_${Date.now()}@example.com`);
    await page.locator('input[type="password"]').first().fill('weak');

    // Password strength indicator appears
    await expect(page.getByText('ระดับความปลอดภัย:')).toBeVisible();

    // Fill strong password
    await page.locator('input[type="password"]').first().fill('StrongP@ssw0rd2026!');
    await page.locator('input[type="password"]').nth(1).fill('StrongP@ssw0rd2026!');

    // Submit Registration
    await page.locator('button[type="submit"]').click();
    await page.waitForURL('**/dashboard');
    await expect(page.locator('h1')).toContainText('สวัสดี');
  });

  test('7. Password Reset & Forgot Password Flow', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.getByRole('heading', { name: /รีเซ็ตรหัสผ่าน/ })).toBeVisible();

    // Fill email
    await page.locator('input[type="email"]').fill('student@example.com');
    await page.locator('button[type="submit"]').click();

    // Sent confirmation visible
    await expect(page.getByText('ส่งคำขอรีเซ็ตรหัสผ่านแล้ว!')).toBeVisible();

    // Click demo reset link
    await page.locator('a:has-text("เปิดหน้ารีเซ็ตรหัสผ่าน")').click();
    await page.waitForURL('**/reset-password?token=*');

    // Fill new password
    await page.locator('input[type="password"]').first().fill('BrandNewP@ss2026!');
    await page.locator('input[type="password"]').nth(1).fill('BrandNewP@ss2026!');
    await page.locator('button[type="submit"]').click();

    // Success notice
    await expect(page.getByText('ตั้งรหัสผ่านใหม่สำเร็จ!')).toBeVisible();
  });

  test('8. Email Verification Page Flow', async ({ page }) => {
    await page.goto('/verify-email?token=vfy_demo_test_token_123');
    await expect(page.getByText('ยืนยันที่อยู่อีเมล')).toBeVisible();

    // Click Verify
    await page.locator('button:has-text("ยืนยันอีเมลทันที")').click();
    await expect(page.getByText('ยืนยันอีเมลสำเร็จเรียบร้อย!')).toBeVisible();
  });

  test('9. Account Settings Security & Session Management Flow', async ({ page }) => {
    // Login as student
    await page.goto('/login');
    await page.locator('button:has-text("เข้าเป็น Student")').click();
    await page.waitForURL('**/dashboard');

    // Go to Settings
    await page.goto('/settings');
    await expect(page.getByText('การตั้งค่าบัญชีและความปลอดภัย')).toBeVisible();

    // Check Profile tab
    await expect(page.getByText('ข้อมูลโปรไฟล์ (Profile Details)')).toBeVisible();

    // Switch to Security Tab
    await page.getByRole('button', { name: /ความปลอดภัย & รหัสผ่าน/ }).click();
    await expect(page.getByText('เปลี่ยนรหัสผ่าน (Change Password)')).toBeVisible();

    // Switch to Sessions Tab
    await page.getByRole('button', { name: /อุปกรณ์ที่ใช้งาน/ }).click();
    await expect(page.getByText('รายการอุปกรณ์และเซสชันที่ใช้งานอยู่')).toBeVisible();
    await expect(page.getByText('อุปกรณ์ปัจจุบัน')).toBeVisible();
  });

  test('10. Admin Audit Logs & Auth Security Audit Viewer', async ({ page }) => {
    // Login as admin
    await page.goto('/login');
    await page.locator('button:has-text("เข้าเป็น Admin")').click();
    await page.waitForURL('**/admin');

    // Navigate to Audit Logs
    await page.goto('/admin/audit-logs');
    await expect(page.locator('h1')).toContainText('บันทึกประวัติการทำงานและความปลอดภัย');

    // Verify Content Logs Tab
    await expect(page.getByText('การจัดการเนื้อหาและข้อสอบ')).toBeVisible();

    // Switch to Auth Security Logs Tab
    await page.getByRole('button', { name: /ความปลอดภัย & การเข้าสู่ระบบ/ }).click();
    await expect(page.getByText('รายการบันทึกความปลอดภัยและการยืนยันตัวตน')).toBeVisible();
  });
});
