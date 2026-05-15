import { test } from '../fixtures/pages.fixture';

test.beforeEach(async ({}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop-chrome',
    'Acesso corretor validado no desktop porque depende de conteudo de rodape.',
  );
});

test('deve expor o acesso do corretor no rodape de empreendimentos', async ({
  empreendimentosPage,
}) => {
  await empreendimentosPage.goto();

  await empreendimentosPage.expectCorretorLink();
});
