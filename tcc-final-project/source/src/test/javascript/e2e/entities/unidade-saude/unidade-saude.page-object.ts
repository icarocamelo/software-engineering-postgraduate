import { element, by, ElementFinder } from 'protractor';

export class UnidadeSaudeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-unidade-saude div table .btn-danger'));
  title = element.all(by.css('jhi-unidade-saude div h2#page-heading span')).first();
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

export class UnidadeSaudeUpdatePage {
  pageTitle = element(by.id('jhi-unidade-saude-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  uUIDInput = element(by.id('field_uUID'));
  enderecoInput = element(by.id('field_endereco'));
  cNPJInput = element(by.id('field_cNPJ'));
  telefoneInput = element(by.id('field_telefone'));
  cEPInput = element(by.id('field_cEP'));
  razaoSocialInput = element(by.id('field_razaoSocial'));
  nomeFantasiaInput = element(by.id('field_nomeFantasia'));
  tipoUnidadeSaudeSelect = element(by.id('field_tipoUnidadeSaude'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUUIDInput(uUID: string): Promise<void> {
    await this.uUIDInput.sendKeys(uUID);
  }

  async getUUIDInput(): Promise<string> {
    return await this.uUIDInput.getAttribute('value');
  }

  async setEnderecoInput(endereco: string): Promise<void> {
    await this.enderecoInput.sendKeys(endereco);
  }

  async getEnderecoInput(): Promise<string> {
    return await this.enderecoInput.getAttribute('value');
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

export class UnidadeSaudeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-unidadeSaude-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-unidadeSaude'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
