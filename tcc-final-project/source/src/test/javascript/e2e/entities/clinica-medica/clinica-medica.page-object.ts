import { element, by, ElementFinder } from 'protractor';

export class ClinicaMedicaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-clinica-medica div table .btn-danger'));
  title = element.all(by.css('jhi-clinica-medica div h2#page-heading span')).first();
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

export class ClinicaMedicaUpdatePage {
  pageTitle = element(by.id('jhi-clinica-medica-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  cNPJInput = element(by.id('field_cNPJ'));
  telefoneInput = element(by.id('field_telefone'));
  cEPInput = element(by.id('field_cEP'));
  razaoSocialInput = element(by.id('field_razaoSocial'));
  nomeFantasiaInput = element(by.id('field_nomeFantasia'));
  tipoUnidadeSaudeSelect = element(by.id('field_tipoUnidadeSaude'));

  enderecoSelect = element(by.id('field_endereco'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCNPJInput(cNPJ: string): Promise<void> {
    await this.cNPJInput.sendKeys(cNPJ);
  }

  async getCNPJInput(): Promise<string> {
    return await this.cNPJInput.getAttribute('value');
  }

  async setTelefoneInput(telefone: string): Promise<void> {
    await this.telefoneInput.sendKeys(telefone);
  }

  async getTelefoneInput(): Promise<string> {
    return await this.telefoneInput.getAttribute('value');
  }

  async setCEPInput(cEP: string): Promise<void> {
    await this.cEPInput.sendKeys(cEP);
  }

  async getCEPInput(): Promise<string> {
    return await this.cEPInput.getAttribute('value');
  }

  async setRazaoSocialInput(razaoSocial: string): Promise<void> {
    await this.razaoSocialInput.sendKeys(razaoSocial);
  }

  async getRazaoSocialInput(): Promise<string> {
    return await this.razaoSocialInput.getAttribute('value');
  }

  async setNomeFantasiaInput(nomeFantasia: string): Promise<void> {
    await this.nomeFantasiaInput.sendKeys(nomeFantasia);
  }

  async getNomeFantasiaInput(): Promise<string> {
    return await this.nomeFantasiaInput.getAttribute('value');
  }

  async setTipoUnidadeSaudeSelect(tipoUnidadeSaude: string): Promise<void> {
    await this.tipoUnidadeSaudeSelect.sendKeys(tipoUnidadeSaude);
  }

  async getTipoUnidadeSaudeSelect(): Promise<string> {
    return await this.tipoUnidadeSaudeSelect.element(by.css('option:checked')).getText();
  }

  async tipoUnidadeSaudeSelectLastOption(): Promise<void> {
    await this.tipoUnidadeSaudeSelect.all(by.tagName('option')).last().click();
  }

  async enderecoSelectLastOption(): Promise<void> {
    await this.enderecoSelect.all(by.tagName('option')).last().click();
  }

  async enderecoSelectOption(option: string): Promise<void> {
    await this.enderecoSelect.sendKeys(option);
  }

  getEnderecoSelect(): ElementFinder {
    return this.enderecoSelect;
  }

  async getEnderecoSelectedOption(): Promise<string> {
    return await this.enderecoSelect.element(by.css('option:checked')).getText();
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

export class ClinicaMedicaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-clinicaMedica-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-clinicaMedica'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
