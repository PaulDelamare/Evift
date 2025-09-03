import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('img', { name: 'Mockup du site EVIFT sur' })).toBeVisible();
  await page.getByText('Crée ton événement Crée ton é').click();
  await page.getByText('Rejoins un événement Accepte').click();
  await page.getByText('Accueil Qui Sommes-Nous ? Inscription/Connexion Contact').click();
  await page.getByRole('banner').getByRole('link', { name: 'Qui Sommes-Nous ?' }).click();
  await page.locator('section').filter({ hasText: 'Pourquoi Evift ? Evift, tout' }).locator('div').nth(2).click();
  await page.getByText('J\'aimerais vous faire part de ma vision du futur d\'Evift. Evift est une').click();
  await page.getByRole('banner').getByRole('link', { name: 'Inscription/Connexion' }).click();
  await expect(page.locator('input[name="email"]')).toBeEmpty();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="password"]').click();
  await page.getByRole('button', { name: 'Inscription' }).click();
  await page.getByText('Inscription Prénom* Nom*').click();
  await page.getByRole('link', { name: 'politique de confidentialité', exact: true }).click();
  await page.getByText('Politique de Confidentialité En vigueur au 12/07/2024 Cette politique de').click();
});