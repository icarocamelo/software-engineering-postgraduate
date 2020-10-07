import { element, by, ElementFinder } from 'protractor';

export class PermissaoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-permissao div table .btn-danger'));
  title = element.all(by.css('jhi-permissao div h2#page-heading span')).first();
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

export class PermissaoUpdatePage {
  pageTitle = element(by.id('jhi-permissao-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomeInput = element(by.id('field_nome'));

  perfilAcessoSelect = element(by.id('field_perfilAcesso'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomeInput(nome: string): Promise<void> {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput(): Promise<string> {
    return await this.nomeInput.getAttribute('value');
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

export class PermissaoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-permissao-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-permissao'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
