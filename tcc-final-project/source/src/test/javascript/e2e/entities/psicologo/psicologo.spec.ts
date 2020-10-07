import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PsicologoComponentsPage, PsicologoDeleteDialog, PsicologoUpdatePage } from './psicologo.page-object';

const expect = chai.expect;

describe('Psicologo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let psicologoComponentsPage: PsicologoComponentsPage;
  let psicologoUpdatePage: PsicologoUpdatePage;
  let psicologoDeleteDialog: PsicologoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Psicologos', async () => {
    await navBarPage.goToEntity('psicologo');
    psicologoComponentsPage = new PsicologoComponentsPage();
    await browser.wait(ec.visibilityOf(psicologoComponentsPage.title), 5000);
    expect(await psicologoComponentsPage.getTitle()).to.eq('saudepluplusApp.psicologo.home.title');
    await browser.wait(ec.or(ec.visibilityOf(psicologoComponentsPage.entities), ec.visibilityOf(psicologoComponentsPage.noResult)), 1000);
  });

  it('should load create Psicologo page', async () => {
    await psicologoComponentsPage.clickOnCreateButton();
    psicologoUpdatePage = new PsicologoUpdatePage();
    expect(await psicologoUpdatePage.getPageTitle()).to.eq('saudepluplusApp.psicologo.home.createOrEditLabel');
    await psicologoUpdatePage.cancel();
  });

  it('should create and save Psicologos', async () => {
    const nbButtonsBeforeCreate = await psicologoComponentsPage.countDeleteButtons();

    await psicologoComponentsPage.clickOnCreateButton();

    await promise.all([
      psicologoUpdatePage.setNomeInput('nome'),
      psicologoUpdatePage.setRGInput('rG'),
      psicologoUpdatePage.setCPFInput('cPF'),
      psicologoUpdatePage.setNumeroRegistroInput('numeroRegistro'),
    ]);

    expect(await psicologoUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await psicologoUpdatePage.getRGInput()).to.eq('rG', 'Expected RG value to be equals to rG');
    expect(await psicologoUpdatePage.getCPFInput()).to.eq('cPF', 'Expected CPF value to be equals to cPF');
    expect(await psicologoUpdatePage.getNumeroRegistroInput()).to.eq(
      'numeroRegistro',
      'Expected NumeroRegistro value to be equals to numeroRegistro'
    );

    await psicologoUpdatePage.save();
    expect(await psicologoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await psicologoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Psicologo', async () => {
    const nbButtonsBeforeDelete = await psicologoComponentsPage.countDeleteButtons();
    await psicologoComponentsPage.clickOnLastDeleteButton();

    psicologoDeleteDialog = new PsicologoDeleteDialog();
    expect(await psicologoDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.psicologo.delete.question');
    await psicologoDeleteDialog.clickOnConfirmButton();

    expect(await psicologoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
