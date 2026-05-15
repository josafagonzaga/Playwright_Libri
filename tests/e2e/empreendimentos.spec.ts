import { expect, test } from '@playwright/test';

const empreendimentoLinks = [
  { name: /Libri One/i, href: '/libri-one/' },
  { name: /ELISIOS RESIDENCE/i, href: '/elisiosresidence/' },
  { name: /VERSA LOFT STYLE/i, href: '/versa-loft-style/' },
  { name: /hype EASY STUDIO/i, href: '/hype-easy-studios/' },
  { name: /livri freedom living/i, href: '/livri-freedom-living/' },
];

test.beforeEach(async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chrome', 'Fluxo validado no desktop para evitar variacao de menu/carrossel mobile.');
});

test('deve listar os empreendimentos da Libri', async ({ page }) => {
  await page.goto('/empreendimentos/');

  await expect(page).toHaveTitle(/Empreendimentos.*Libri/i);
  await expect(page.getByRole('heading', { name: /^Empreendimentos$/i }).first()).toBeVisible();

  for (const empreendimento of empreendimentoLinks) {
    await expect(page.getByRole('heading', { name: empreendimento.name }).first()).toBeVisible();
    expect(await page.locator(`a[href$="${empreendimento.href}"]`).count()).toBeGreaterThan(0);
  }
});

test('deve manter os cards de empreendimentos navegaveis', async ({ page }) => {
  await page.goto('/empreendimentos/');

  for (const { href } of empreendimentoLinks) {
    await expect(page.locator(`a[href$="${href}"]`).first()).toHaveAttribute('href', new RegExp(`${href}$`));
  }
});
