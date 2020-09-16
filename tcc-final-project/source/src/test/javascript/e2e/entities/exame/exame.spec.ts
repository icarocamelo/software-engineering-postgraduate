import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ExameComponentsPage, ExameDeleteDialog, ExameUpdatePage } from './exame.page-object';

const expect = chai.expect;

describe('Exame e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let exameComponentsPage: ExameComponentsPage;
  let exameUpdatePage: ExameUpdatePage;
  let exameDeleteDialog: ExameDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Exames', async () => {
    await navBarPage.goToEntity('exame');
    exameComponentsPage = new ExameComponentsPage();
    await browser.wait(ec.visibilityOf(exameComponentsPage.title), 5000);
    expect(await exameComponentsPage.getTitle()).to.eq('saudepluplusApp.exame.home.title');
    await browser.wait(ec.or(ec.visibilityOf(exameComponentsPage.entities), ec.visibilityOf(exameComponentsPage.noResult)), 1000);
  });

  it('should load create Exame page', async () => {
    await exameComponentsPage.clickOnCreateButton();
    exameUpdatePage = new ExameUpdatePage();
    expect(await exameUpdatePage.getPageTitle()).to.eq('saudepluplusApp.exame.home.createOrEditLabel');
    await exameUpdatePage.cancel();
  });

  it('should create and save Exames', async () => {
    const nbButtonsBeforeCreate = await exameComponentsPage.countDeleteButtons();

    await exameComponentsPage.clickOnCreateButton();

    await promise.all([]);

    await exameUpdatePage.save();
    expect(await exameUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await exameComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Exame', async () => {
    const nbButtonsBeforeDelete = await exameComponentsPage.countDeleteButtons();
    await exameComponentsPage.clickOnLastDeleteButton();

    exameDeleteDialog = new ExameDeleteDialog();
    expect(await exameDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.exame.delete.question');
    await exameDeleteDialog.clickOnConfirmButton();

    expect(await exameComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
