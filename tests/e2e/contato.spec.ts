import { test } from '../fixtures/pages.fixture';

test.beforeEach(async ({}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop-chrome',
    'Contato validado no desktop para reduzir rate limit em pagina externa.',
  );
});

test('deve exibir a pagina de contato com canais de atendimento', async ({ contatoPage }) => {
  await contatoPage.goto();

  await contatoPage.expectLoaded();
  await contatoPage.expectAtendimentoLinks();
});
