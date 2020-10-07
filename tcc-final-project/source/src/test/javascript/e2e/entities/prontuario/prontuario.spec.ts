import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProntuarioComponentsPage, ProntuarioDeleteDialog, ProntuarioUpdatePage } from './prontuario.page-object';

const expect = chai.expect;

describe('Prontuario e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prontuarioComponentsPage: ProntuarioComponentsPage;
  let prontuarioUpdatePage: ProntuarioUpdatePage;
  let prontuarioDeleteDialog: ProntuarioDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Prontuarios', async () => {
    await navBarPage.goToEntity('prontuario');
    prontuarioComponentsPage = new ProntuarioComponentsPage();
    await browser.wait(ec.visibilityOf(prontuarioComponentsPage.title), 5000);
    expect(await prontuarioComponentsPage.getTitle()).to.eq('saudepluplusApp.prontuario.home.title');
    await browser.wait(ec.or(ec.visibilityOf(prontuarioComponentsPage.entities), ec.visibilityOf(prontuarioComponentsPage.noResult)), 1000);
  });

  it('should load create Prontuario page', async () => {
    await prontuarioComponentsPage.clickOnCreateButton();
    prontuarioUpdatePage = new ProntuarioUpdatePage();
    expect(await prontuarioUpdatePage.getPageTitle()).to.eq('saudepluplusApp.prontuario.home.createOrEditLabel');
    await prontuarioUpdatePage.cancel();
  });

  it('should create and save Prontuarios', async () => {
    const nbButtonsBeforeCreate = await prontuarioComponentsPage.countDeleteButtons();

    await prontuarioComponentsPage.clickOnCreateButton();

    await promise.all([prontuarioUpdatePage.pacienteSelectLastOption(), prontuarioUpdatePage.profissionalDeSaudeSelectLastOption()]);

    await prontuarioUpdatePage.save();
    expect(await prontuarioUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await prontuarioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Prontuario', async () => {
    const nbButtonsBeforeDelete = await prontuarioComponentsPage.countDeleteButtons();
    await prontuarioComponentsPage.clickOnLastDeleteButton();

    prontuarioDeleteDialog = new ProntuarioDeleteDialog();
    expect(await prontuarioDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.prontuario.delete.question');
    await prontuarioDeleteDialog.clickOnConfirmButton();

    expect(await prontuarioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
