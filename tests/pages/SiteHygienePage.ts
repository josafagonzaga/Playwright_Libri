import { expect, type Page } from '@playwright/test';

export class SiteHygienePage {
  constructor(private readonly page: Page) {}

  async gotoContato() {
    await this.page.goto('/contato/', { waitUntil: 'domcontentloaded' });
  }

  async expectWordPressAdminBarHidden() {
    await expect(this.page.locator('#wpadminbar')).toHaveCount(0);
    await expect(this.page.getByRole('toolbar', { name: /Barra de ferramentas/i })).toHaveCount(0);
  }
}
