import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FisioterapeutaComponentsPage, FisioterapeutaDeleteDialog, FisioterapeutaUpdatePage } from './fisioterapeuta.page-object';

const expect = chai.expect;

describe('Fisioterapeuta e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fisioterapeutaComponentsPage: FisioterapeutaComponentsPage;
  let fisioterapeutaUpdatePage: FisioterapeutaUpdatePage;
  let fisioterapeutaDeleteDialog: FisioterapeutaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Fisioterapeutas', async () => {
    await navBarPage.goToEntity('fisioterapeuta');
    fisioterapeutaComponentsPage = new FisioterapeutaComponentsPage();
    await browser.wait(ec.visibilityOf(fisioterapeutaComponentsPage.title), 5000);
    expect(await fisioterapeutaComponentsPage.getTitle()).to.eq('saudepluplusApp.fisioterapeuta.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(fisioterapeutaComponentsPage.entities), ec.visibilityOf(fisioterapeutaComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Fisioterapeuta page', async () => {
    await fisioterapeutaComponentsPage.clickOnCreateButton();
    fisioterapeutaUpdatePage = new FisioterapeutaUpdatePage();
    expect(await fisioterapeutaUpdatePage.getPageTitle()).to.eq('saudepluplusApp.fisioterapeuta.home.createOrEditLabel');
    await fisioterapeutaUpdatePage.cancel();
  });

  it('should create and save Fisioterapeutas', async () => {
    const nbButtonsBeforeCreate = await fisioterapeutaComponentsPage.countDeleteButtons();

    await fisioterapeutaComponentsPage.clickOnCreateButton();

    await promise.all([]);

    await fisioterapeutaUpdatePage.save();
    expect(await fisioterapeutaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await fisioterapeutaComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last Fisioterapeuta', async () => {
    const nbButtonsBeforeDelete = await fisioterapeutaComponentsPage.countDeleteButtons();
    await fisioterapeutaComponentsPage.clickOnLastDeleteButton();

    fisioterapeutaDeleteDialog = new FisioterapeutaDeleteDialog();
    expect(await fisioterapeutaDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.fisioterapeuta.delete.question');
    await fisioterapeutaDeleteDialog.clickOnConfirmButton();

    expect(await fisioterapeutaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
