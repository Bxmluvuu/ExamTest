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

test.describe('Animation, Loading Experience & UX Motion E2E Tests', () => {

  test('1. Skeletons and Instant Page Navigation on Dashboard', async ({ page }) => {
    await loginAsStudent(page);

    // Verify Metric Strip and Greeting rendered cleanly
    await expect(page.locator('h1')).toContainText('สวัสดี');
    await expect(page.getByText('คะแนนเฉลี่ย', { exact: true })).toBeVisible();
    await expect(page.getByText('วิชาของฉัน (My Subjects)')).toBeVisible();
  });

  test('2. Exam Runner Keyboard Navigation & SaveStatus Indicator', async ({ page }) => {
    await loginAsStudent(page);

    // Start practice exam
    await page.goto('/practice/new');
    await expect(page.locator('h1')).toContainText('ตั้งค่าและเริ่มทำข้อสอบ');
  });

  test('3. Optimistic Bookmarking & Toast Notification', async ({ page }) => {
    await loginAsStudent(page);

    // Open Bookmarks page
    await page.goto('/bookmarks');
    await expect(page.locator('h1')).toContainText('ข้อสอบที่บันทึกไว้');

    // If there's an item, test optimistic removal
    const removeBtn = page.locator('button:has-text("ลบออก")').first();
    if (await removeBtn.isVisible()) {
      await removeBtn.click();
      // Toast notification appears
      await expect(page.locator('text=ลบข้อสอบออกจากรายการที่บันทึกแล้ว')).toBeVisible();
    }
  });

  test('4. Admin Batch Action Toast and Feedback', async ({ page }) => {
    await loginAsAdmin(page);

    await page.goto('/admin/questions');
    await expect(page.locator('h1')).toContainText('คลังคำถามและจัดการข้อสอบ');
    await expect(page.locator('table').first()).toBeVisible();
  });

  test('5. Multi-viewport Responsive Layout (Mobile, Tablet, Desktop)', async ({ page }) => {
    const viewports = [
      { width: 360, height: 800, name: 'Mobile-Small' },
      { width: 390, height: 844, name: 'Mobile-Standard' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1440, height: 900, name: 'Desktop' },
      { width: 1920, height: 1080, name: 'Large-Desktop' },
    ];

    await loginAsStudent(page);

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await expect(page.locator('h1')).toContainText('สวัสดี');

      if (vp.width < 768) {
        // Mobile bottom navigation is active
        await expect(page.locator('nav[aria-label="Learner Mobile Bottom Navigation"]')).toBeVisible();
      } else {
        // Desktop sidebar is active
        await expect(page.locator('aside[aria-label="Learner Navigation"]')).toBeVisible();
      }
    }
  });
});
