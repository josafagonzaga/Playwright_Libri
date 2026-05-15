import { test } from '../fixtures/pages.fixture';

test.beforeEach(async ({}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop-chrome',
    'Fluxo validado no desktop para evitar variacao de menu/carrossel mobile.',
  );
});

test('deve listar os empreendimentos da Libri', async ({ empreendimentosPage }) => {
  await empreendimentosPage.goto();

  await empreendimentosPage.expectLoaded();
  await empreendimentosPage.expectEmpreendimentosList();
});

test('deve manter os cards de empreendimentos navegaveis', async ({ empreendimentosPage }) => {
  await empreendimentosPage.goto();

  await empreendimentosPage.expectCardsNavigable();
});
