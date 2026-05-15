import { expect, type Page } from '@playwright/test';

export class ContatoPage {
  constructor(private readonly page: Page) {}

  async goto() {
    const response = await this.page.goto('/contato/', { waitUntil: 'domcontentloaded' });

    expect(response?.ok(), 'A pagina de contato deve responder com sucesso').toBeTruthy();
  }

  async expectLoaded() {
    await expect(this.page).toHaveTitle(/Contato|Libri/i);
    await expect(
      this.page.getByRole('heading', { name: /RELACIONAMENTO COM O CLIENTE/i }),
    ).toBeVisible();
    await expect(this.page.getByRole('heading', { name: /VENDAS/i })).toBeVisible();
  }

  async expectAtendimentoLinks() {
    await expect(this.page.getByRole('link', { name: /Portal do Cliente/i }).first()).toBeVisible();
    await expect(this.page.getByRole('link', { name: /Atendimento via Whatsapp/i })).toBeVisible();
    await expect(this.page.getByRole('link', { name: /Fale com o consultor/i })).toBeVisible();
  }
}
