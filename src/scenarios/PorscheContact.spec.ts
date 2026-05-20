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

  test('Cenario 1 - solicitar consultoria para industria automotiva', async () => {
    await porscheContactPage.preencherCenarioConsultoriaAutomotiva();
    await porscheContactPage.validarCenarioConsultoriaAutomotiva();
  });

  test('Cenario 2 - entrar em contato sobre carreira', async () => {
    await porscheContactPage.preencherCenarioCarreira();
    await porscheContactPage.validarCenarioCarreira();
  });

  test('Cenario 3 - solicitar informacoes para midia', async () => {
    await porscheContactPage.preencherCenarioMidia();
    await porscheContactPage.validarCenarioMidia();
  });
});