import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import PorscheContactPage from '../support/pages/PorscheContactPage';

test.describe('Porsche Consulting', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let porscheContactPage: PorscheContactPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.porscheConsulting')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    porscheContactPage = new PorscheContactPage(page);
    await page.goto(BASE_URL);
  });

  test('Preencher formulario de contato', async ({ page }) => {
    await porscheContactPage.preencherFormularioContato();
    await porscheContactPage.validarFormularioPreenchido();
    await page.waitForTimeout(10000);
  });
});
