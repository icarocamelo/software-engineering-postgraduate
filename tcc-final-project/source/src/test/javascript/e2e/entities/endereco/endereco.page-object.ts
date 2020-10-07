import { element, by, ElementFinder } from 'protractor';

export class EnderecoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-endereco div table .btn-danger'));
  title = element.all(by.css('jhi-endereco div h2#page-heading span')).first();
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

export class EnderecoUpdatePage {
  pageTitle = element(by.id('jhi-endereco-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  tipoInput = element(by.id('field_tipo'));
  numeroInput = element(by.id('field_numero'));
  paisInput = element(by.id('field_pais'));
  estadoInput = element(by.id('field_estado'));
  cidadeInput = element(by.id('field_cidade'));
  bairroInput = element(by.id('field_bairro'));
  cEPInput = element(by.id('field_cEP'));
  coordenadasGeograficasInput = element(by.id('field_coordenadasGeograficas'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTipoInput(tipo: string): Promise<void> {
    await this.tipoInput.sendKeys(tipo);
  }

  async getTipoInput(): Promise<string> {
    return await this.tipoInput.getAttribute('value');
  }

  async setNumeroInput(numero: string): Promise<void> {
    await this.numeroInput.sendKeys(numero);
  }

  async getNumeroInput(): Promise<string> {
    return await this.numeroInput.getAttribute('value');
  }

  async setPaisInput(pais: string): Promise<void> {
    await this.paisInput.sendKeys(pais);
  }

  async getPaisInput(): Promise<string> {
    return await this.paisInput.getAttribute('value');
  }

  async setEstadoInput(estado: string): Promise<void> {
    await this.estadoInput.sendKeys(estado);
  }

  async getEstadoInput(): Promise<string> {
    return await this.estadoInput.getAttribute('value');
  }

  async setCidadeInput(cidade: string): Promise<void> {
    await this.cidadeInput.sendKeys(cidade);
  }

  async getCidadeInput(): Promise<string> {
    return await this.cidadeInput.getAttribute('value');
  }

  async setBairroInput(bairro: string): Promise<void> {
    await this.bairroInput.sendKeys(bairro);
  }

  async getBairroInput(): Promise<string> {
    return await this.bairroInput.getAttribute('value');
  }

  async setCEPInput(cEP: string): Promise<void> {
    await this.cEPInput.sendKeys(cEP);
  }

  async getCEPInput(): Promise<string> {
    return await this.cEPInput.getAttribute('value');
  }

  async setCoordenadasGeograficasInput(coordenadasGeograficas: string): Promise<void> {
    await this.coordenadasGeograficasInput.sendKeys(coordenadasGeograficas);
  }

  async getCoordenadasGeograficasInput(): Promise<string> {
    return await this.coordenadasGeograficasInput.getAttribute('value');
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

export class EnderecoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-endereco-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-endereco'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
