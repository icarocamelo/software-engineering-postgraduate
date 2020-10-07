import { element, by, ElementFinder } from 'protractor';

export class VacinaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-vacina div table .btn-danger'));
  title = element.all(by.css('jhi-vacina div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class VacinaUpdatePage {
  pageTitle = element(by.id('jhi-vacina-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomeInput = element(by.id('field_nome'));
  loteInput = element(by.id('field_lote'));
  dataAplicacaoInput = element(by.id('field_dataAplicacao'));

  cartaoVacinaSelect = element(by.id('field_cartaoVacina'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomeInput(nome: string): Promise<void> {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput(): Promise<string> {
    return await this.nomeInput.getAttribute('value');
  }

  async setLoteInput(lote: string): Promise<void> {
    await this.loteInput.sendKeys(lote);
  }

  async getLoteInput(): Promise<string> {
    return await this.loteInput.getAttribute('value');
  }

  async setDataAplicacaoInput(dataAplicacao: string): Promise<void> {
    await this.dataAplicacaoInput.sendKeys(dataAplicacao);
  }

  async getDataAplicacaoInput(): Promise<string> {
    return await this.dataAplicacaoInput.getAttribute('value');
  }

  async cartaoVacinaSelectLastOption(): Promise<void> {
    await this.cartaoVacinaSelect.all(by.tagName('option')).last().click();
  }

  async cartaoVacinaSelectOption(option: string): Promise<void> {
    await this.cartaoVacinaSelect.sendKeys(option);
  }

  getCartaoVacinaSelect(): ElementFinder {
    return this.cartaoVacinaSelect;
  }

  async getCartaoVacinaSelectedOption(): Promise<string> {
    return await this.cartaoVacinaSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class VacinaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-vacina-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-vacina'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
