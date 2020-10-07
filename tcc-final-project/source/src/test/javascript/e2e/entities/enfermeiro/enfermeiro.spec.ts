import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EnfermeiroComponentsPage, EnfermeiroDeleteDialog, EnfermeiroUpdatePage } from './enfermeiro.page-object';

const expect = chai.expect;

describe('Enfermeiro e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let enfermeiroComponentsPage: EnfermeiroComponentsPage;
  let enfermeiroUpdatePage: EnfermeiroUpdatePage;
  let enfermeiroDeleteDialog: EnfermeiroDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Enfermeiros', async () => {
    await navBarPage.goToEntity('enfermeiro');
    enfermeiroComponentsPage = new EnfermeiroComponentsPage();
    await browser.wait(ec.visibilityOf(enfermeiroComponentsPage.title), 5000);
    expect(await enfermeiroComponentsPage.getTitle()).to.eq('saudepluplusApp.enfermeiro.home.title');
    await browser.wait(ec.or(ec.visibilityOf(enfermeiroComponentsPage.entities), ec.visibilityOf(enfermeiroComponentsPage.noResult)), 1000);
  });

  it('should load create Enfermeiro page', async () => {
    await enfermeiroComponentsPage.clickOnCreateButton();
    enfermeiroUpdatePage = new EnfermeiroUpdatePage();
    expect(await enfermeiroUpdatePage.getPageTitle()).to.eq('saudepluplusApp.enfermeiro.home.createOrEditLabel');
    await enfermeiroUpdatePage.cancel();
  });

  it('should create and save Enfermeiros', async () => {
    const nbButtonsBeforeCreate = await enfermeiroComponentsPage.countDeleteButtons();

    await enfermeiroComponentsPage.clickOnCreateButton();

    await promise.all([
      enfermeiroUpdatePage.setNomeInput('nome'),
      enfermeiroUpdatePage.setRGInput('rG'),
      enfermeiroUpdatePage.setCPFInput('cPF'),
      enfermeiroUpdatePage.setNumeroRegistroInput('numeroRegistro'),
    ]);

    expect(await enfermeiroUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await enfermeiroUpdatePage.getRGInput()).to.eq('rG', 'Expected RG value to be equals to rG');
    expect(await enfermeiroUpdatePage.getCPFInput()).to.eq('cPF', 'Expected CPF value to be equals to cPF');
    expect(await enfermeiroUpdatePage.getNumeroRegistroInput()).to.eq(
      'numeroRegistro',
      'Expected NumeroRegistro value to be equals to numeroRegistro'
    );

    await enfermeiroUpdatePage.save();
    expect(await enfermeiroUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await enfermeiroComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Enfermeiro', async () => {
    const nbButtonsBeforeDelete = await enfermeiroComponentsPage.countDeleteButtons();
    await enfermeiroComponentsPage.clickOnLastDeleteButton();

    enfermeiroDeleteDialog = new EnfermeiroDeleteDialog();
    expect(await enfermeiroDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.enfermeiro.delete.question');
    await enfermeiroDeleteDialog.clickOnConfirmButton();

    expect(await enfermeiroComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
