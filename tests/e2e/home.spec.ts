import { test } from '../fixtures/pages.fixture';

test('deve abrir a pagina inicial da Libri', async ({ homePage }) => {
  await homePage.goto();

  await homePage.expectLoaded();
});
