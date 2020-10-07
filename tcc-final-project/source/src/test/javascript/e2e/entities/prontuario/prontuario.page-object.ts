import { element, by, ElementFinder } from 'protractor';

export class ProntuarioComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-prontuario div table .btn-danger'));
  title = element.all(by.css('jhi-prontuario div h2#page-heading span')).first();
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

export class ProntuarioUpdatePage {
  pageTitle = element(by.id('jhi-prontuario-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  pacienteSelect = element(by.id('field_paciente'));
  profissionalDeSaudeSelect = element(by.id('field_profissionalDeSaude'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
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

export class ProntuarioDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-prontuario-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-prontuario'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
