import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class PorscheContactElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCampoSolicitacao(): Locator {
    return this.page.locator('#edit-ihr-anliegen');
  }

  getCheckboxAutomotiva(): Locator {
    return this.page.locator('#edit-branchen-automobilindustrie');
  }

  getLabelAutomotiva(): Locator {
    return this.page.locator('label[for="edit-branchen-automobilindustrie"]');
  }

  getCheckboxBensConsumo(): Locator {
    return this.page.locator('#edit-branchen-konsumgter');
  }

  getLabelBensConsumo(): Locator {
    return this.page.locator('label[for="edit-branchen-konsumgter"]');
  }

  getCheckboxEstrategia(): Locator {
    return this.page.locator('#edit-leistungen-strategie-und-organisation');
  }

  getLabelEstrategia(): Locator {
    return this.page.locator(
      'label[for="edit-leistungen-strategie-und-organisation"]'
    );
  }

  getCheckboxMarcaVendas(): Locator {
    return this.page.locator('#edit-leistungen-marke-und-vertrieb');
  }

  getLabelMarcaVendas(): Locator {
    return this.page.locator('label[for="edit-leistungen-marke-und-vertrieb"]');
  }

  getCampoNome(): Locator {
    return this.page.locator('#edit-vorname');
  }

  getCampoSobrenome(): Locator {
    return this.page.locator('#edit-nachname');
  }

  getCampoEmpresa(): Locator {
    return this.page.locator('#edit-unternehmen');
  }

  getCampoCargo(): Locator {
    return this.page.locator('#edit-funktion');
  }

  getCampoEmail(): Locator {
    return this.page.locator('#edit-e-mail');
  }

  getCampoTelefone(): Locator {
    return this.page.locator('#edit-telefonnummer');
  }

  getCheckboxLigacao(): Locator {
    return this.page.locator('#edit-ich-moechte-zurueckgerufen-werden');
  }

  getLabelLigacao(): Locator {
    return this.page.locator(
      'label[for="edit-ich-moechte-zurueckgerufen-werden"]'
    );
  }

  getCampoMensagem(): Locator {
    return this.page.locator('#edit-ihre-nachricht');
  }

  getCheckboxProtecaoDados(): Locator {
    return this.page.locator('#edit-datenschutz');
  }

  getLabelProtecaoDados(): Locator {
    return this.page.locator('label[for="edit-datenschutz"]');
  }

  getBotaoEnviar(): Locator {
    return this.page.locator('#edit-actions-submit');
  }
}