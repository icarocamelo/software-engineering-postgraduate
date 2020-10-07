import { element, by, ElementFinder } from 'protractor';

export class PacienteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-paciente div table .btn-danger'));
  title = element.all(by.css('jhi-paciente div h2#page-heading span')).first();
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

export class PacienteUpdatePage {
  pageTitle = element(by.id('jhi-paciente-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomeInput = element(by.id('field_nome'));
  rGInput = element(by.id('field_rG'));
  cPFInput = element(by.id('field_cPF'));
  dataNascimentoInput = element(by.id('field_dataNascimento'));
  telefoneInput = element(by.id('field_telefone'));
  pesoInput = element(by.id('field_peso'));
  alturaInput = element(by.id('field_altura'));
  responsavelInput = element(by.id('field_responsavel'));
  rNEInput = element(by.id('field_rNE'));

  perfilAcessoSelect = element(by.id('field_perfilAcesso'));
  enderecoSelect = element(by.id('field_endereco'));

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

  async setDataNascimentoInput(dataNascimento: string): Promise<void> {
    await this.dataNascimentoInput.sendKeys(dataNascimento);
  }

  async getDataNascimentoInput(): Promise<string> {
    return await this.dataNascimentoInput.getAttribute('value');
  }

  async setTelefoneInput(telefone: string): Promise<void> {
    await this.telefoneInput.sendKeys(telefone);
  }

  async getTelefoneInput(): Promise<string> {
    return await this.telefoneInput.getAttribute('value');
  }

  async setPesoInput(peso: string): Promise<void> {
    await this.pesoInput.sendKeys(peso);
  }

  async getPesoInput(): Promise<string> {
    return await this.pesoInput.getAttribute('value');
  }

  async setAlturaInput(altura: string): Promise<void> {
    await this.alturaInput.sendKeys(altura);
  }

  async getAlturaInput(): Promise<string> {
    return await this.alturaInput.getAttribute('value');
  }

  async setResponsavelInput(responsavel: string): Promise<void> {
    await this.responsavelInput.sendKeys(responsavel);
  }

  async getResponsavelInput(): Promise<string> {
    return await this.responsavelInput.getAttribute('value');
  }

  async setRNEInput(rNE: string): Promise<void> {
    await this.rNEInput.sendKeys(rNE);
  }

  async getRNEInput(): Promise<string> {
    return await this.rNEInput.getAttribute('value');
  }

  async perfilAcessoSelectLastOption(): Promise<void> {
    await this.perfilAcessoSelect.all(by.tagName('option')).last().click();
  }

  async perfilAcessoSelectOption(option: string): Promise<void> {
    await this.perfilAcessoSelect.sendKeys(option);
  }

  getPerfilAcessoSelect(): ElementFinder {
    return this.perfilAcessoSelect;
  }

  async getPerfilAcessoSelectedOption(): Promise<string> {
    return await this.perfilAcessoSelect.element(by.css('option:checked')).getText();
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

export class PacienteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-paciente-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-paciente'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
