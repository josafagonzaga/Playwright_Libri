import { test as base } from '@playwright/test';
import { ContatoPage } from '../pages/ContatoPage';
import { EmpreendimentosPage } from '../pages/EmpreendimentosPage';
import { HomePage } from '../pages/HomePage';
import { SiteHygienePage } from '../pages/SiteHygienePage';

type PageFixtures = {
  contatoPage: ContatoPage;
  empreendimentosPage: EmpreendimentosPage;
  homePage: HomePage;
  siteHygienePage: SiteHygienePage;
};

export const test = base.extend<PageFixtures>({
  contatoPage: async ({ page }, use) => {
    await use(new ContatoPage(page));
  },
  empreendimentosPage: async ({ page }, use) => {
    await use(new EmpreendimentosPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  siteHygienePage: async ({ page }, use) => {
    await use(new SiteHygienePage(page));
  },
});

export { expect } from '@playwright/test';
