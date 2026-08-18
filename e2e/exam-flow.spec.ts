import { test, expect, type Page } from '@playwright/test';

async function loginAsStudent(page: Page) {
  await page.goto('/login');
  await page.locator('input[type="email"]').fill('student@example.com');
  await page.locator('input[type="password"]').fill('Password123!');
  await page.locator('button[type="submit"]').click();
  await page.waitForURL('**/dashboard');
}

async function loginAsAdmin(page: Page) {
  await page.goto('/login');
  await page.locator('input[type="email"]').fill('admin@example.com');
  await page.locator('input[type="password"]').fill('Admin123!');
  await page.locator('button[type="submit"]').click();
  await page.waitForURL('**/admin');
}

test.describe('Learner App vs Admin Console Separation E2E Flows', () => {

  test('0. Unauthenticated Visitor on Root / is Redirected to /login', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/');
    await page.waitForURL('**/login');
    await expect(page.getByText('เข้าสู่ระบบ ExamPlatform')).toBeVisible();
  });

  test('1. Student Authentication, Dashboard & Strict UI Separation', async ({ page }, testInfo) => {
    await loginAsStudent(page);
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
      const bottomNav = page.locator('nav[aria-label="Learner Mobile Bottom Navigation"]');
      await expect(bottomNav).toBeVisible();
      await expect(bottomNav.getByText('ภาพรวม')).toBeVisible();
      await expect(bottomNav.getByText('วิชา')).toBeVisible();
      await expect(bottomNav.getByText('ฝึกทำ')).toBeVisible();
      await expect(bottomNav.getByText('สถิติ')).toBeVisible();
      await expect(bottomNav.getByText('เพิ่มเติม')).toBeVisible();
      await expect(bottomNav.getByText('Admin')).not.toBeVisible();
    }

    // Verify Learner Dashboard metric overview
    await expect(page.getByText('คะแนนเฉลี่ย', { exact: true })).toBeVisible();
    await expect(page.getByText('จำนวนข้อที่ฝึกฝน', { exact: true })).toBeVisible();

    await page.screenshot({ path: `test-results/learner-dashboard-${testInfo.project.name}.png`, fullPage: true });
  });

  test('2. Student Subject Workspace & Navigation Flow', async ({ page }) => {
    await loginAsStudent(page);

    // Open Subjects list
    await page.goto('/subjects');
    await expect(page.locator('h1')).toContainText('คลังวิชาและเอกสาร');
  });

  test('3. Student Exam Runner in Focus Mode Setup', async ({ page }) => {
    await loginAsStudent(page);

    // Open practice setup
    await page.goto('/practice/new');
    await expect(page.locator('h1')).toContainText('ตั้งค่าและเริ่มทำข้อสอบ');
  });

  test('4. Student Direct Access to /admin is BLOCKED', async ({ page }) => {
    await loginAsStudent(page);

    // Student attempts to access /admin directly
    await page.goto('/admin');

    // Must be redirected to /unauthorized or /dashboard
    await page.waitForURL(url => url.pathname === '/unauthorized' || url.pathname === '/dashboard');
    if (page.url().includes('/unauthorized')) {
      await expect(page.locator('text=ไม่มีสิทธิ์เข้าถึงพื้นที่นี้')).toBeVisible();
    }
  });

  test('5. Admin Authentication, Admin Console & Operational Tools', async ({ page }, testInfo) => {
    await loginAsAdmin(page);
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
    }

    // Open Admin Question Bank
    await page.goto('/admin/questions');
    await expect(page.locator('h1')).toContainText('คลังคำถามและจัดการข้อสอบ');
    await expect(page.locator('table').first()).toBeVisible();

    // Open Admin Documents
    await page.goto('/admin/documents');
    await expect(page.locator('h1')).toContainText('จัดการเอกสารและสไลด์เนื้อหา');
    await expect(page.locator('table').first()).toBeVisible();

    // Open Admin Blueprints
    await page.goto('/admin/blueprints');
    await expect(page.locator('h1')).toContainText('จัดการ Exam Blueprints');

    // Switch back to Learner View via action
    if (!testInfo.project.name.includes('mobile')) {
      await page.locator('aside[aria-label="Admin Navigation"] a:has-text("เปิดมุมมองผู้เรียน")').click();
      await page.waitForURL('**/dashboard');
      await expect(page.locator('h1').first()).toContainText('สวัสดี');
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
    await page.locator('input[type="email"]').fill(`reset_${Date.now()}@example.com`);
    await page.locator('button[type="submit"]').click();

    // Sent confirmation visible
    await expect(page.getByText('ส่งคำขอรีเซ็ตรหัสผ่านแล้ว!')).toBeVisible();
  });

  test('8. Email Verification Page Flow', async ({ page }) => {
    await page.goto('/verify-email?token=vfy_demo_test_token_123');
    await expect(page.getByText('ยืนยันที่อยู่อีเมล')).toBeVisible();

    // Click Verify
    await page.locator('button:has-text("ยืนยันอีเมลทันที")').click();
    await expect(page.getByText('ยืนยันอีเมลสำเร็จเรียบร้อย!')).toBeVisible();
  });

  test('9. Account Settings Security & Session Management Flow', async ({ page }) => {
    await loginAsStudent(page);

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
  });

  test('10. Admin Audit Logs & Auth Security Audit Viewer', async ({ page }) => {
    await loginAsAdmin(page);

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
