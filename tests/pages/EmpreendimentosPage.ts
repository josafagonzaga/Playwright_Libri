import { expect, type Page } from '@playwright/test';
import { empreendimentoLinks } from '../data/empreendimentos.data';

export class EmpreendimentosPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/empreendimentos/');
  }

  async expectLoaded() {
    await expect(this.page).toHaveTitle(/Empreendimentos.*Libri/i);
    await expect(
      this.page.getByRole('heading', { name: /^Empreendimentos$/i }).first(),
    ).toBeVisible();
  }

  async expectEmpreendimentosList() {
    for (const empreendimento of empreendimentoLinks) {
      await expect(
        this.page.getByRole('heading', { name: empreendimento.name }).first(),
      ).toBeVisible();
      expect(await this.cardLinksByHref(empreendimento.href).count()).toBeGreaterThan(0);
    }
  }

  async expectCardsNavigable() {
    for (const { href } of empreendimentoLinks) {
      await expect(this.cardLinksByHref(href).first()).toHaveAttribute(
        'href',
        new RegExp(`${href}$`),
      );
    }
  }

  corretorLink() {
    return this.page.locator('a[href="https://painel.libri.com.br/login"]').first();
  }

  async expectCorretorLink() {
    await expect(this.corretorLink()).toBeVisible();
    await expect(this.corretorLink()).toHaveAttribute(
      'href',
      /https:\/\/painel\.libri\.com\.br\/login/,
    );
  }

  private cardLinksByHref(href: string) {
    return this.page.locator(`a[href$="${href}"]`);
  }
}
