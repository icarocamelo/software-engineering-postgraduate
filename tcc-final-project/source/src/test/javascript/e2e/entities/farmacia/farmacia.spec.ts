import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FarmaciaComponentsPage, FarmaciaDeleteDialog, FarmaciaUpdatePage } from './farmacia.page-object';

const expect = chai.expect;

describe('Farmacia e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let farmaciaComponentsPage: FarmaciaComponentsPage;
  let farmaciaUpdatePage: FarmaciaUpdatePage;
  let farmaciaDeleteDialog: FarmaciaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Farmacias', async () => {
    await navBarPage.goToEntity('farmacia');
    farmaciaComponentsPage = new FarmaciaComponentsPage();
    await browser.wait(ec.visibilityOf(farmaciaComponentsPage.title), 5000);
    expect(await farmaciaComponentsPage.getTitle()).to.eq('saudepluplusApp.farmacia.home.title');
    await browser.wait(ec.or(ec.visibilityOf(farmaciaComponentsPage.entities), ec.visibilityOf(farmaciaComponentsPage.noResult)), 1000);
  });

  it('should load create Farmacia page', async () => {
    await farmaciaComponentsPage.clickOnCreateButton();
    farmaciaUpdatePage = new FarmaciaUpdatePage();
    expect(await farmaciaUpdatePage.getPageTitle()).to.eq('saudepluplusApp.farmacia.home.createOrEditLabel');
    await farmaciaUpdatePage.cancel();
  });

  it('should create and save Farmacias', async () => {
    const nbButtonsBeforeCreate = await farmaciaComponentsPage.countDeleteButtons();

    await farmaciaComponentsPage.clickOnCreateButton();

    await promise.all([farmaciaUpdatePage.setUUIDInput('uUID')]);

    expect(await farmaciaUpdatePage.getUUIDInput()).to.eq('uUID', 'Expected UUID value to be equals to uUID');

    await farmaciaUpdatePage.save();
    expect(await farmaciaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await farmaciaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Farmacia', async () => {
    const nbButtonsBeforeDelete = await farmaciaComponentsPage.countDeleteButtons();
    await farmaciaComponentsPage.clickOnLastDeleteButton();

    farmaciaDeleteDialog = new FarmaciaDeleteDialog();
    expect(await farmaciaDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.farmacia.delete.question');
    await farmaciaDeleteDialog.clickOnConfirmButton();

    expect(await farmaciaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
