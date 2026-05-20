import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import PorscheContactElements from '../elements/PorscheContactElements';
import BasePage from './BasePage';

type DadosContato = {
  nome: string;
  sobrenome: string;
  empresa: string;
  cargo: string;
  email: string;
  telefone: string;
  mensagem: string;
};

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

  private async preencherDadosContato(dados: DadosContato): Promise<void> {
    await this.porscheContactElements
      .getCampoSolicitacao()
      .scrollIntoViewIfNeeded();
    await this.porscheContactElements.getCampoNome().fill(dados.nome);
    await this.porscheContactElements.getCampoSobrenome().fill(dados.sobrenome);
    await this.porscheContactElements.getCampoEmpresa().fill(dados.empresa);
    await this.porscheContactElements.getCampoCargo().fill(dados.cargo);
    await this.porscheContactElements.getCampoEmail().fill(dados.email);
    await this.porscheContactElements.getCampoTelefone().fill(dados.telefone);
    await this.porscheContactElements.getCampoMensagem().fill(dados.mensagem);
    await this.porscheContactElements.getLabelProtecaoDados().click();
  }

  async preencherCenarioConsultoriaAutomotiva(): Promise<void> {
    await this.aceitarCookies();
    await this.porscheContactElements
      .getCampoSolicitacao()
      .selectOption('Beratungsanfrage');
    await this.porscheContactElements.getLabelAutomotiva().click();
    await this.porscheContactElements.getLabelEstrategia().click();
    await this.porscheContactElements.getLabelLigacao().click();

    await this.preencherDadosContato({
      nome: faker.person.firstName(),
      sobrenome: faker.person.lastName(),
      empresa: 'Empresa Automotiva E2E',
      cargo: 'Analista de Qualidade',
      email: faker.internet.email(),
      telefone: '11999999999',
      mensagem:
        'Solicito contato sobre consultoria para estrategia e organizacao automotiva.'
    });
  }

  async preencherCenarioCarreira(): Promise<void> {
    await this.aceitarCookies();
    await this.porscheContactElements
      .getCampoSolicitacao()
      .selectOption('Karriere');

    await this.preencherDadosContato({
      nome: faker.person.firstName(),
      sobrenome: faker.person.lastName(),
      empresa: 'Candidatura E2E',
      cargo: 'Pessoa candidata',
      email: faker.internet.email(),
      telefone: '21988887777',
      mensagem:
        'Gostaria de receber informacoes sobre oportunidades de carreira na Porsche Consulting Brasil.'
    });
  }

  async preencherCenarioMidia(): Promise<void> {
    await this.aceitarCookies();
    await this.porscheContactElements
      .getCampoSolicitacao()
      .selectOption('Presse');
    await this.porscheContactElements.getLabelBensConsumo().click();
    await this.porscheContactElements.getLabelMarcaVendas().click();

    await this.preencherDadosContato({
      nome: faker.person.firstName(),
      sobrenome: faker.person.lastName(),
      empresa: 'Veiculo de Midia E2E',
      cargo: 'Jornalista',
      email: faker.internet.email(),
      telefone: '31977776666',
      mensagem:
        'Solicito informacoes para uma pauta sobre transformacao de marca e vendas.'
    });
  }

  async validarCenarioConsultoriaAutomotiva(): Promise<void> {
    await expect(this.porscheContactElements.getCampoSolicitacao()).toHaveValue(
      'Beratungsanfrage'
    );
    await expect(this.porscheContactElements.getCheckboxAutomotiva()).toBeChecked();
    await expect(this.porscheContactElements.getCheckboxEstrategia()).toBeChecked();
    await expect(this.porscheContactElements.getCheckboxLigacao()).toBeChecked();
    await expect(this.porscheContactElements.getCampoEmpresa()).toHaveValue(
      'Empresa Automotiva E2E'
    );
    await expect(this.porscheContactElements.getCampoMensagem()).toHaveValue(
      'Solicito contato sobre consultoria para estrategia e organizacao automotiva.'
    );
    await expect(this.porscheContactElements.getBotaoEnviar()).toBeVisible();
  }

  async validarCenarioCarreira(): Promise<void> {
    await expect(this.porscheContactElements.getCampoSolicitacao()).toHaveValue(
      'Karriere'
    );
    await expect(this.porscheContactElements.getCheckboxLigacao()).not.toBeChecked();
    await expect(this.porscheContactElements.getCampoCargo()).toHaveValue(
      'Pessoa candidata'
    );
    await expect(this.porscheContactElements.getCampoMensagem()).toHaveValue(
      'Gostaria de receber informacoes sobre oportunidades de carreira na Porsche Consulting Brasil.'
    );
    await expect(this.porscheContactElements.getBotaoEnviar()).toBeVisible();
  }

  async validarCenarioMidia(): Promise<void> {
    await expect(this.porscheContactElements.getCampoSolicitacao()).toHaveValue(
      'Presse'
    );
    await expect(this.porscheContactElements.getCheckboxBensConsumo()).toBeChecked();
    await expect(this.porscheContactElements.getCheckboxMarcaVendas()).toBeChecked();
    await expect(this.porscheContactElements.getCampoEmpresa()).toHaveValue(
      'Veiculo de Midia E2E'
    );
    await expect(this.porscheContactElements.getCampoMensagem()).toHaveValue(
      'Solicito informacoes para uma pauta sobre transformacao de marca e vendas.'
    );
    await expect(this.porscheContactElements.getBotaoEnviar()).toBeVisible();
  }
}
