import { test } from '../fixtures/pages.fixture';

test.beforeEach(async ({}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop-chrome',
    'Higiene do site validada uma vez no desktop.',
  );
});

test('nao deve exibir a barra administrativa do WordPress para visitantes', async ({
  siteHygienePage,
}) => {
  await siteHygienePage.gotoContato();

  await siteHygienePage.expectWordPressAdminBarHidden();
});
