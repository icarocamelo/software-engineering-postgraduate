import { element, by, ElementFinder } from 'protractor';

export class AgendaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-agenda div table .btn-danger'));
  title = element.all(by.css('jhi-agenda div h2#page-heading span')).first();
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

export class AgendaUpdatePage {
  pageTitle = element(by.id('jhi-agenda-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dataInput = element(by.id('field_data'));

  medicoSelect = element(by.id('field_medico'));
  fisioterapeutaSelect = element(by.id('field_fisioterapeuta'));
  enfermeiroSelect = element(by.id('field_enfermeiro'));
  psicologoSelect = element(by.id('field_psicologo'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDataInput(data: string): Promise<void> {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput(): Promise<string> {
    return await this.dataInput.getAttribute('value');
  }

  async medicoSelectLastOption(): Promise<void> {
    await this.medicoSelect.all(by.tagName('option')).last().click();
  }

  async medicoSelectOption(option: string): Promise<void> {
    await this.medicoSelect.sendKeys(option);
  }

  getMedicoSelect(): ElementFinder {
    return this.medicoSelect;
  }

  async getMedicoSelectedOption(): Promise<string> {
    return await this.medicoSelect.element(by.css('option:checked')).getText();
  }

  async fisioterapeutaSelectLastOption(): Promise<void> {
    await this.fisioterapeutaSelect.all(by.tagName('option')).last().click();
  }

  async fisioterapeutaSelectOption(option: string): Promise<void> {
    await this.fisioterapeutaSelect.sendKeys(option);
  }

  getFisioterapeutaSelect(): ElementFinder {
    return this.fisioterapeutaSelect;
  }

  async getFisioterapeutaSelectedOption(): Promise<string> {
    return await this.fisioterapeutaSelect.element(by.css('option:checked')).getText();
  }

  async enfermeiroSelectLastOption(): Promise<void> {
    await this.enfermeiroSelect.all(by.tagName('option')).last().click();
  }

  async enfermeiroSelectOption(option: string): Promise<void> {
    await this.enfermeiroSelect.sendKeys(option);
  }

  getEnfermeiroSelect(): ElementFinder {
    return this.enfermeiroSelect;
  }

  async getEnfermeiroSelectedOption(): Promise<string> {
    return await this.enfermeiroSelect.element(by.css('option:checked')).getText();
  }

  async psicologoSelectLastOption(): Promise<void> {
    await this.psicologoSelect.all(by.tagName('option')).last().click();
  }

  async psicologoSelectOption(option: string): Promise<void> {
    await this.psicologoSelect.sendKeys(option);
  }

  getPsicologoSelect(): ElementFinder {
    return this.psicologoSelect;
  }

  async getPsicologoSelectedOption(): Promise<string> {
    return await this.psicologoSelect.element(by.css('option:checked')).getText();
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

export class AgendaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-agenda-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-agenda'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
