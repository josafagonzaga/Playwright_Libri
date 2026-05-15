import { test } from '../fixtures/pages.fixture';

test.beforeEach(async ({}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop-chrome',
    'Acessos principais validados no desktop para evitar variacao do menu mobile.',
  );
});

test('deve expor o acesso ao portal do cliente no menu principal', async ({ homePage }) => {
  await homePage.goto();

  await homePage.expectPortalClienteLink();
});
