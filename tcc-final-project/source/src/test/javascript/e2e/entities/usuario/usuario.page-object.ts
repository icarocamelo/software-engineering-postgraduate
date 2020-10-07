import { element, by, ElementFinder } from 'protractor';

export class UsuarioComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-usuario div table .btn-danger'));
  title = element.all(by.css('jhi-usuario div h2#page-heading span')).first();
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

export class UsuarioUpdatePage {
  pageTitle = element(by.id('jhi-usuario-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  loginInput = element(by.id('field_login'));
  nomeInput = element(by.id('field_nome'));
  sobrenomeInput = element(by.id('field_sobrenome'));
  emailInput = element(by.id('field_email'));
  ativoInput = element(by.id('field_ativo'));
  perfilSelect = element(by.id('field_perfil'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setLoginInput(login: string): Promise<void> {
    await this.loginInput.sendKeys(login);
  }

  async getLoginInput(): Promise<string> {
    return await this.loginInput.getAttribute('value');
  }

  async setNomeInput(nome: string): Promise<void> {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput(): Promise<string> {
    return await this.nomeInput.getAttribute('value');
  }

  async setSobrenomeInput(sobrenome: string): Promise<void> {
    await this.sobrenomeInput.sendKeys(sobrenome);
  }

  async getSobrenomeInput(): Promise<string> {
    return await this.sobrenomeInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  getAtivoInput(): ElementFinder {
    return this.ativoInput;
  }

  async setPerfilSelect(perfil: string): Promise<void> {
    await this.perfilSelect.sendKeys(perfil);
  }

  async getPerfilSelect(): Promise<string> {
    return await this.perfilSelect.element(by.css('option:checked')).getText();
  }

  async perfilSelectLastOption(): Promise<void> {
    await this.perfilSelect.all(by.tagName('option')).last().click();
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

export class UsuarioDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-usuario-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-usuario'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
