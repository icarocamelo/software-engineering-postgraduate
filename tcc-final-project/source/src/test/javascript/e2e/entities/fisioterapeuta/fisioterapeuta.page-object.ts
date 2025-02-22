import { element, by, ElementFinder } from 'protractor';

export class FisioterapeutaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-fisioterapeuta div table .btn-danger'));
  title = element.all(by.css('jhi-fisioterapeuta div h2#page-heading span')).first();
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

export class FisioterapeutaUpdatePage {
  pageTitle = element(by.id('jhi-fisioterapeuta-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomeInput = element(by.id('field_nome'));
  rGInput = element(by.id('field_rG'));
  cPFInput = element(by.id('field_cPF'));
  numeroRegistroInput = element(by.id('field_numeroRegistro'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomeInput(nome: string): Promise<void> {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput(): Promise<string> {
    return await this.nomeInput.getAttribute('value');
  }

  async setRGInput(rG: string): Promise<void> {
    await this.rGInput.sendKeys(rG);
  }

  async getRGInput(): Promise<string> {
    return await this.rGInput.getAttribute('value');
  }

  async setCPFInput(cPF: string): Promise<void> {
    await this.cPFInput.sendKeys(cPF);
  }

  async getCPFInput(): Promise<string> {
    return await this.cPFInput.getAttribute('value');
  }

  async setNumeroRegistroInput(numeroRegistro: string): Promise<void> {
    await this.numeroRegistroInput.sendKeys(numeroRegistro);
  }

  async getNumeroRegistroInput(): Promise<string> {
    return await this.numeroRegistroInput.getAttribute('value');
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

export class FisioterapeutaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-fisioterapeuta-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-fisioterapeuta'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
