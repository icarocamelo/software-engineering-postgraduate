import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EnderecoComponentsPage, EnderecoDeleteDialog, EnderecoUpdatePage } from './endereco.page-object';

const expect = chai.expect;

describe('Endereco e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let enderecoComponentsPage: EnderecoComponentsPage;
  let enderecoUpdatePage: EnderecoUpdatePage;
  let enderecoDeleteDialog: EnderecoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Enderecos', async () => {
    await navBarPage.goToEntity('endereco');
    enderecoComponentsPage = new EnderecoComponentsPage();
    await browser.wait(ec.visibilityOf(enderecoComponentsPage.title), 5000);
    expect(await enderecoComponentsPage.getTitle()).to.eq('saudepluplusApp.endereco.home.title');
    await browser.wait(ec.or(ec.visibilityOf(enderecoComponentsPage.entities), ec.visibilityOf(enderecoComponentsPage.noResult)), 1000);
  });

  it('should load create Endereco page', async () => {
    await enderecoComponentsPage.clickOnCreateButton();
    enderecoUpdatePage = new EnderecoUpdatePage();
    expect(await enderecoUpdatePage.getPageTitle()).to.eq('saudepluplusApp.endereco.home.createOrEditLabel');
    await enderecoUpdatePage.cancel();
  });

  it('should create and save Enderecos', async () => {
    const nbButtonsBeforeCreate = await enderecoComponentsPage.countDeleteButtons();

    await enderecoComponentsPage.clickOnCreateButton();

    await promise.all([
      enderecoUpdatePage.setTipoInput('tipo'),
      enderecoUpdatePage.setNumeroInput('numero'),
      enderecoUpdatePage.setPaisInput('pais'),
      enderecoUpdatePage.setEstadoInput('estado'),
      enderecoUpdatePage.setCidadeInput('cidade'),
      enderecoUpdatePage.setBairroInput('bairro'),
      enderecoUpdatePage.setCEPInput('cEP'),
      enderecoUpdatePage.setCoordenadasGeograficasInput('coordenadasGeograficas'),
    ]);

    expect(await enderecoUpdatePage.getTipoInput()).to.eq('tipo', 'Expected Tipo value to be equals to tipo');
    expect(await enderecoUpdatePage.getNumeroInput()).to.eq('numero', 'Expected Numero value to be equals to numero');
    expect(await enderecoUpdatePage.getPaisInput()).to.eq('pais', 'Expected Pais value to be equals to pais');
    expect(await enderecoUpdatePage.getEstadoInput()).to.eq('estado', 'Expected Estado value to be equals to estado');
    expect(await enderecoUpdatePage.getCidadeInput()).to.eq('cidade', 'Expected Cidade value to be equals to cidade');
    expect(await enderecoUpdatePage.getBairroInput()).to.eq('bairro', 'Expected Bairro value to be equals to bairro');
    expect(await enderecoUpdatePage.getCEPInput()).to.eq('cEP', 'Expected CEP value to be equals to cEP');
    expect(await enderecoUpdatePage.getCoordenadasGeograficasInput()).to.eq(
      'coordenadasGeograficas',
      'Expected CoordenadasGeograficas value to be equals to coordenadasGeograficas'
    );

    await enderecoUpdatePage.save();
    expect(await enderecoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await enderecoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Endereco', async () => {
    const nbButtonsBeforeDelete = await enderecoComponentsPage.countDeleteButtons();
    await enderecoComponentsPage.clickOnLastDeleteButton();

    enderecoDeleteDialog = new EnderecoDeleteDialog();
    expect(await enderecoDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.endereco.delete.question');
    await enderecoDeleteDialog.clickOnConfirmButton();

    expect(await enderecoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
