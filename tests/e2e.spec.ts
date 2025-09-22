import { test, expect } from '@playwright/test';

test('create and read note', async ({ page }) => {
  // Go to create page
  await page.goto('/create');

  // Fill in the note content
  await page.fill('textarea', 'This is a test note for E2E testing.');

  // Set max reads to 1
  await page.fill('input[type="number"]', '1');

  // Create the note
  await page.click('button:has-text("Note erstellen")');

  // Wait for the share URL to appear
  await page.waitForSelector('input[readonly]');

  // Get the share URL
  const shareUrl = await page.inputValue('input[readonly]');
  expect(shareUrl).toContain('/n/');
  expect(shareUrl).toContain('#');

  // Open the share URL in a new tab
  const newPage = await page.context().newPage();
  await newPage.goto(shareUrl);

  // Wait for the note to load
  await newPage.waitForSelector('pre');

  // Check that the content is decrypted correctly
  const content = await newPage.textContent('pre');
  expect(content).toBe('This is a test note for E2E testing.');

  // Close the new page
  await newPage.close();

  // Try to open the same URL again
  const anotherPage = await page.context().newPage();
  await anotherPage.goto(shareUrl);

  // Should show error message
  await anotherPage.waitForSelector('text=Fehler');
  const errorText = await anotherPage.textContent('p');
  expect(errorText).toContain('Note nicht gefunden oder abgelaufen');

  await anotherPage.close();
});
