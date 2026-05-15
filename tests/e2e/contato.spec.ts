import { expect, test } from '@playwright/test';

test.beforeEach(async ({}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop-chrome',
    'Contato validado no desktop para reduzir rate limit em pagina externa.',
  );
});

test('deve exibir a pagina de contato com canais de atendimento', async ({ page }) => {
  const response = await page.goto('/contato/', { waitUntil: 'domcontentloaded' });

  expect(response?.ok(), 'A pagina de contato deve responder com sucesso').toBeTruthy();
  await expect(page).toHaveTitle(/Contato|Libri/i);
  await expect(page.getByRole('heading', { name: /RELACIONAMENTO COM O CLIENTE/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /VENDAS/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Portal do Cliente/i }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Atendimento via Whatsapp/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Fale com o consultor/i })).toBeVisible();
});
