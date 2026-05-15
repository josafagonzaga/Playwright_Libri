import { expect, test } from '@playwright/test';

test.beforeEach(async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chrome', 'Acessos principais validados no desktop para evitar variacao do menu mobile.');
});

test('deve expor o acesso ao portal do cliente no menu principal', async ({ page }) => {
  await page.goto('/');

  const portalLink = page.getByRole('link', { name: /portal do cliente/i }).first();

  await expect(portalLink).toBeVisible();
  await expect(portalLink).toHaveAttribute('href', /https:\/\/portal\.libri\.com\.br\/#\/login/);
});

test('deve expor o acesso do corretor no rodape de empreendimentos', async ({ page }) => {
  await page.goto('/empreendimentos/');

  const corretorLink = page.locator('a[href="https://painel.libri.com.br/login"]').first();

  await expect(corretorLink).toBeVisible();
  await expect(corretorLink).toHaveAttribute('href', /https:\/\/painel\.libri\.com\.br\/login/);
});
