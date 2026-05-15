import { expect, test } from '@playwright/test';

test('deve abrir a pagina inicial da Libri', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Libri/);
  await expect(page.getByRole('heading', { name: /Equil[ií]brio em todos os aspectos/i })).toBeVisible();
});
