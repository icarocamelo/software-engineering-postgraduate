import { element, by, ElementFinder } from 'protractor';

export class MedicamentoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-medicamento div table .btn-danger'));
  title = element.all(by.css('jhi-medicamento div h2#page-heading span')).first();
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

export class MedicamentoUpdatePage {
  pageTitle = element(by.id('jhi-medicamento-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  uUIDInput = element(by.id('field_uUID'));

  farmaciaSelect = element(by.id('field_farmacia'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUUIDInput(uUID: string): Promise<void> {
    await this.uUIDInput.sendKeys(uUID);
  }

  async getUUIDInput(): Promise<string> {
    return await this.uUIDInput.getAttribute('value');
  }

  async farmaciaSelectLastOption(): Promise<void> {
    await this.farmaciaSelect.all(by.tagName('option')).last().click();
  }

  async farmaciaSelectOption(option: string): Promise<void> {
    await this.farmaciaSelect.sendKeys(option);
  }

  getFarmaciaSelect(): ElementFinder {
    return this.farmaciaSelect;
  }

  async getFarmaciaSelectedOption(): Promise<string> {
    return await this.farmaciaSelect.element(by.css('option:checked')).getText();
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

export class MedicamentoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-medicamento-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-medicamento'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
