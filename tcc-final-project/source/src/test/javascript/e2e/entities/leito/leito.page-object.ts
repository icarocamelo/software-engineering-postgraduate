import { element, by, ElementFinder } from 'protractor';

export class LeitoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-leito div table .btn-danger'));
  title = element.all(by.css('jhi-leito div h2#page-heading span')).first();
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

export class LeitoUpdatePage {
  pageTitle = element(by.id('jhi-leito-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  identificacaoInput = element(by.id('field_identificacao'));

  hospitalSelect = element(by.id('field_hospital'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdentificacaoInput(identificacao: string): Promise<void> {
    await this.identificacaoInput.sendKeys(identificacao);
  }

  async getIdentificacaoInput(): Promise<string> {
    return await this.identificacaoInput.getAttribute('value');
  }

  async hospitalSelectLastOption(): Promise<void> {
    await this.hospitalSelect.all(by.tagName('option')).last().click();
  }

  async hospitalSelectOption(option: string): Promise<void> {
    await this.hospitalSelect.sendKeys(option);
  }

  getHospitalSelect(): ElementFinder {
    return this.hospitalSelect;
  }

  async getHospitalSelectedOption(): Promise<string> {
    return await this.hospitalSelect.element(by.css('option:checked')).getText();
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

export class LeitoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-leito-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-leito'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
