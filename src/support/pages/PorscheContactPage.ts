import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import PorscheContactElements from '../elements/PorscheContactElements';
import BasePage from './BasePage';

export default class PorscheContactPage extends BasePage {
  readonly porscheContactElements: PorscheContactElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.porscheContactElements = new PorscheContactElements(page);
  }

  async aceitarCookies(): Promise<void> {
    const botaoAceitarCookies = this.page
      .locator(
        [
          '[data-testid="uc-accept-all-button"]',
          '#uc-accept-all-button',
          'button:has-text("Aceitar todos")',
          'button:has-text("Aceitar")',
          'button:has-text("Accept All")',
          'button:has-text("Accept all")'
        ].join(', ')
      )
      .first();

    await botaoAceitarCookies
      .waitFor({ state: 'visible', timeout: 10000 })
      .catch(() => undefined);

    if (await botaoAceitarCookies.isVisible().catch(() => false)) {
      await botaoAceitarCookies.click();
      await expect(botaoAceitarCookies).toBeHidden({ timeout: 10000 });
    }
  }

  async preencherFormularioContato(): Promise<void> {
    await this.aceitarCookies();
    await this.porscheContactElements
      .getCampoSolicitacao()
      .selectOption('Beratungsanfrage');
    await this.porscheContactElements.getLabelAutomotiva().click();
    await this.porscheContactElements.getLabelEstrategia().click();
    await this.porscheContactElements
      .getCampoNome()
      .fill(faker.person.firstName());
    await this.porscheContactElements
      .getCampoSobrenome()
      .fill(faker.person.lastName());
    await this.porscheContactElements
      .getCampoEmpresa()
      .fill('Empresa de Testes E2E');
    await this.porscheContactElements
      .getCampoCargo()
      .fill('Analista de Qualidade');
    await this.porscheContactElements
      .getCampoEmail()
      .fill(faker.internet.email());
    await this.porscheContactElements.getCampoTelefone().fill('11999999999');
    await this.porscheContactElements.getLabelLigacao().click();
    await this.porscheContactElements
      .getCampoMensagem()
      .fill('Mensagem criada automaticamente por um teste E2E com Playwright.');
    await this.porscheContactElements.getLabelProtecaoDados().click();
  }

  async validarFormularioPreenchido(): Promise<void> {
    await expect(this.porscheContactElements.getCampoSolicitacao()).toHaveValue(
      'Beratungsanfrage'
    );
    await expect(this.porscheContactElements.getCampoEmpresa()).toHaveValue(
      'Empresa de Testes E2E'
    );
    await expect(this.porscheContactElements.getCampoMensagem()).toHaveValue(
      'Mensagem criada automaticamente por um teste E2E com Playwright.'
    );
    await expect(this.porscheContactElements.getBotaoEnviar()).toBeVisible();
  }
}
