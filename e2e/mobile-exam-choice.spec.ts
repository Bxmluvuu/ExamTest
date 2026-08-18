import { test, expect, type Page } from '@playwright/test';

async function loginAsStudent(page: Page) {
  await page.goto('/login');
  await page.locator('input[type="email"]').fill('student@example.com');
  await page.locator('input[type="password"]').fill('Password123!');
  await page.locator('button[type="submit"]').click();
  await page.waitForURL('**/dashboard');
}

test.describe('Mobile Exam Runner Choice Selection E2E Tests', () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14 / Pixel 5 viewport

  test('Starts practice exam and verifies mobile choice selection UI', async ({ page }) => {
    await loginAsStudent(page);

    // 1. Go to practice new page
    await page.goto('/practice/new?subjectId=sub-internetworking-001');
    await expect(page.locator('h1')).toContainText('ตั้งค่าและเริ่มทำข้อสอบ');

    // 2. Click Start Exam
    const startBtn = page.getByRole('button', { name: 'เริ่มทำข้อสอบ' });
    await expect(startBtn).toBeVisible();
    await startBtn.click();

    // 3. Wait for exam runner page
    await page.waitForURL(url => url.pathname.startsWith('/attempts/'));
    
    // 4. Check question card and choices
    const questionCard = page.locator('div[role="radiogroup"], .space-y-3');
    await expect(questionCard.first()).toBeVisible({ timeout: 10000 });

    // 5. Take mobile screenshot before selection
    await page.screenshot({ path: 'test-results/mobile-exam-before-select.png', fullPage: true });

    // 6. Test choice selection
    const choiceButtons = page.locator('[role="radio"]');
    const count = await choiceButtons.count();
    
    if (count >= 4) {
      // Tap Choice A
      await choiceButtons.nth(0).click();
      await expect(choiceButtons.nth(0)).toHaveAttribute('aria-checked', 'true');
      
      // Tap Choice B
      await choiceButtons.nth(1).click();
      await expect(choiceButtons.nth(1)).toHaveAttribute('aria-checked', 'true');
      await expect(choiceButtons.nth(0)).toHaveAttribute('aria-checked', 'false');

      // Tap Choice C
      await choiceButtons.nth(2).click();
      await expect(choiceButtons.nth(2)).toHaveAttribute('aria-checked', 'true');
    }

    // 7. Take mobile screenshot after selection
    await page.screenshot({ path: 'test-results/mobile-exam-after-select.png', fullPage: true });

    // 8. Test Navigation on Mobile
    const nextBtn = page.getByRole('button', { name: /ข้อถัดไป/i });
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
    }
  });
});
