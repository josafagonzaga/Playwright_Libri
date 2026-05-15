import { expect, test } from '@playwright/test';

test.beforeEach(async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chrome', 'Higiene do site validada uma vez no desktop.');
});

test('nao deve exibir a barra administrativa do WordPress para visitantes', async ({ page }) => {
  await page.goto('/contato/', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('#wpadminbar')).toHaveCount(0);
  await expect(page.getByRole('toolbar', { name: /Barra de ferramentas/i })).toHaveCount(0);
});
