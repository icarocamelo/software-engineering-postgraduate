import { element, by, ElementFinder } from 'protractor';

export class ProcedimentoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-procedimento div table .btn-danger'));
  title = element.all(by.css('jhi-procedimento div h2#page-heading span')).first();
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

export class ProcedimentoUpdatePage {
  pageTitle = element(by.id('jhi-procedimento-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  descricaoInput = element(by.id('field_descricao'));
  precoInput = element(by.id('field_preco'));
  codigoInput = element(by.id('field_codigo'));

  pacienteSelect = element(by.id('field_paciente'));
  profissionalDeSaudeSelect = element(by.id('field_profissionalDeSaude'));
  enderecoSelect = element(by.id('field_endereco'));
  agendaSelect = element(by.id('field_agenda'));
  prontuarioSelect = element(by.id('field_prontuario'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescricaoInput(descricao: string): Promise<void> {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput(): Promise<string> {
    return await this.descricaoInput.getAttribute('value');
  }

  async setPrecoInput(preco: string): Promise<void> {
    await this.precoInput.sendKeys(preco);
  }

  async getPrecoInput(): Promise<string> {
    return await this.precoInput.getAttribute('value');
  }

  async setCodigoInput(codigo: string): Promise<void> {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput(): Promise<string> {
    return await this.codigoInput.getAttribute('value');
  }

  async pacienteSelectLastOption(): Promise<void> {
    await this.pacienteSelect.all(by.tagName('option')).last().click();
  }

  async pacienteSelectOption(option: string): Promise<void> {
    await this.pacienteSelect.sendKeys(option);
  }

  getPacienteSelect(): ElementFinder {
    return this.pacienteSelect;
  }

  async getPacienteSelectedOption(): Promise<string> {
    return await this.pacienteSelect.element(by.css('option:checked')).getText();
  }

  async profissionalDeSaudeSelectLastOption(): Promise<void> {
    await this.profissionalDeSaudeSelect.all(by.tagName('option')).last().click();
  }

  async profissionalDeSaudeSelectOption(option: string): Promise<void> {
    await this.profissionalDeSaudeSelect.sendKeys(option);
  }

  getProfissionalDeSaudeSelect(): ElementFinder {
    return this.profissionalDeSaudeSelect;
  }

  async getProfissionalDeSaudeSelectedOption(): Promise<string> {
    return await this.profissionalDeSaudeSelect.element(by.css('option:checked')).getText();
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

  async agendaSelectLastOption(): Promise<void> {
    await this.agendaSelect.all(by.tagName('option')).last().click();
  }

  async agendaSelectOption(option: string): Promise<void> {
    await this.agendaSelect.sendKeys(option);
  }

  getAgendaSelect(): ElementFinder {
    return this.agendaSelect;
  }

  async getAgendaSelectedOption(): Promise<string> {
    return await this.agendaSelect.element(by.css('option:checked')).getText();
  }

  async prontuarioSelectLastOption(): Promise<void> {
    await this.prontuarioSelect.all(by.tagName('option')).last().click();
  }

  async prontuarioSelectOption(option: string): Promise<void> {
    await this.prontuarioSelect.sendKeys(option);
  }

  getProntuarioSelect(): ElementFinder {
    return this.prontuarioSelect;
  }

  async getProntuarioSelectedOption(): Promise<string> {
    return await this.prontuarioSelect.element(by.css('option:checked')).getText();
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

export class ProcedimentoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-procedimento-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-procedimento'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
