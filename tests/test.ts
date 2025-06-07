import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('banner').getByRole('link', { name: 'Inscription/Connexion' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('pauldlmre@gmail.com');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('Qwerty12!');
  await page.getByRole('button', { name: 'Connexion' }).click();
});