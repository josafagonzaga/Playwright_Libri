import { expect, type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async expectLoaded() {
    await expect(this.page).toHaveTitle(/Libri/);
    await expect(
      this.page.getByRole('heading', { name: /Equil[ií]brio em todos os aspectos/i }),
    ).toBeVisible();
  }

  portalClienteLink() {
    return this.page.getByRole('link', { name: /portal do cliente/i }).first();
  }

  async expectPortalClienteLink() {
    await expect(this.portalClienteLink()).toBeVisible();
    await expect(this.portalClienteLink()).toHaveAttribute(
      'href',
      /https:\/\/portal\.libri\.com\.br\/#\/login/,
    );
  }
}
