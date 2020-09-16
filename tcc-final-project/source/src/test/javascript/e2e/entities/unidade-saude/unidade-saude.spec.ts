import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UnidadeSaudeComponentsPage, UnidadeSaudeDeleteDialog, UnidadeSaudeUpdatePage } from './unidade-saude.page-object';

const expect = chai.expect;

describe('UnidadeSaude e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let unidadeSaudeComponentsPage: UnidadeSaudeComponentsPage;
  let unidadeSaudeUpdatePage: UnidadeSaudeUpdatePage;
  let unidadeSaudeDeleteDialog: UnidadeSaudeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UnidadeSaudes', async () => {
    await navBarPage.goToEntity('unidade-saude');
    unidadeSaudeComponentsPage = new UnidadeSaudeComponentsPage();
    await browser.wait(ec.visibilityOf(unidadeSaudeComponentsPage.title), 5000);
    expect(await unidadeSaudeComponentsPage.getTitle()).to.eq('saudepluplusApp.unidadeSaude.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(unidadeSaudeComponentsPage.entities), ec.visibilityOf(unidadeSaudeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create UnidadeSaude page', async () => {
    await unidadeSaudeComponentsPage.clickOnCreateButton();
    unidadeSaudeUpdatePage = new UnidadeSaudeUpdatePage();
    expect(await unidadeSaudeUpdatePage.getPageTitle()).to.eq('saudepluplusApp.unidadeSaude.home.createOrEditLabel');
    await unidadeSaudeUpdatePage.cancel();
  });

  it('should create and save UnidadeSaudes', async () => {
    const nbButtonsBeforeCreate = await unidadeSaudeComponentsPage.countDeleteButtons();

    await unidadeSaudeComponentsPage.clickOnCreateButton();

    await promise.all([
      unidadeSaudeUpdatePage.setUUIDInput('uUID'),
      unidadeSaudeUpdatePage.setEnderecoInput('endereco'),
      unidadeSaudeUpdatePage.setCNPJInput('cNPJ'),
      unidadeSaudeUpdatePage.setTelefoneInput('telefone'),
      unidadeSaudeUpdatePage.setCEPInput('cEP'),
      unidadeSaudeUpdatePage.setRazaoSocialInput('razaoSocial'),
      unidadeSaudeUpdatePage.setNomeFantasiaInput('nomeFantasia'),
      unidadeSaudeUpdatePage.tipoUnidadeSaudeSelectLastOption(),
    ]);

    expect(await unidadeSaudeUpdatePage.getUUIDInput()).to.eq('uUID', 'Expected UUID value to be equals to uUID');
    expect(await unidadeSaudeUpdatePage.getEnderecoInput()).to.eq('endereco', 'Expected Endereco value to be equals to endereco');
    expect(await unidadeSaudeUpdatePage.getCNPJInput()).to.eq('cNPJ', 'Expected CNPJ value to be equals to cNPJ');
    expect(await unidadeSaudeUpdatePage.getTelefoneInput()).to.eq('telefone', 'Expected Telefone value to be equals to telefone');
    expect(await unidadeSaudeUpdatePage.getCEPInput()).to.eq('cEP', 'Expected CEP value to be equals to cEP');
    expect(await unidadeSaudeUpdatePage.getRazaoSocialInput()).to.eq(
      'razaoSocial',
      'Expected RazaoSocial value to be equals to razaoSocial'
    );
    expect(await unidadeSaudeUpdatePage.getNomeFantasiaInput()).to.eq(
      'nomeFantasia',
      'Expected NomeFantasia value to be equals to nomeFantasia'
    );

    await unidadeSaudeUpdatePage.save();
    expect(await unidadeSaudeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await unidadeSaudeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last UnidadeSaude', async () => {
    const nbButtonsBeforeDelete = await unidadeSaudeComponentsPage.countDeleteButtons();
    await unidadeSaudeComponentsPage.clickOnLastDeleteButton();

    unidadeSaudeDeleteDialog = new UnidadeSaudeDeleteDialog();
    expect(await unidadeSaudeDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.unidadeSaude.delete.question');
    await unidadeSaudeDeleteDialog.clickOnConfirmButton();

    expect(await unidadeSaudeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
