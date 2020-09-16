import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MedicamentoComponentsPage, MedicamentoDeleteDialog, MedicamentoUpdatePage } from './medicamento.page-object';

const expect = chai.expect;

describe('Medicamento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let medicamentoComponentsPage: MedicamentoComponentsPage;
  let medicamentoUpdatePage: MedicamentoUpdatePage;
  let medicamentoDeleteDialog: MedicamentoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Medicamentos', async () => {
    await navBarPage.goToEntity('medicamento');
    medicamentoComponentsPage = new MedicamentoComponentsPage();
    await browser.wait(ec.visibilityOf(medicamentoComponentsPage.title), 5000);
    expect(await medicamentoComponentsPage.getTitle()).to.eq('saudepluplusApp.medicamento.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(medicamentoComponentsPage.entities), ec.visibilityOf(medicamentoComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Medicamento page', async () => {
    await medicamentoComponentsPage.clickOnCreateButton();
    medicamentoUpdatePage = new MedicamentoUpdatePage();
    expect(await medicamentoUpdatePage.getPageTitle()).to.eq('saudepluplusApp.medicamento.home.createOrEditLabel');
    await medicamentoUpdatePage.cancel();
  });

  it('should create and save Medicamentos', async () => {
    const nbButtonsBeforeCreate = await medicamentoComponentsPage.countDeleteButtons();

    await medicamentoComponentsPage.clickOnCreateButton();

    await promise.all([medicamentoUpdatePage.setUUIDInput('uUID'), medicamentoUpdatePage.farmaciaSelectLastOption()]);

    expect(await medicamentoUpdatePage.getUUIDInput()).to.eq('uUID', 'Expected UUID value to be equals to uUID');

    await medicamentoUpdatePage.save();
    expect(await medicamentoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await medicamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Medicamento', async () => {
    const nbButtonsBeforeDelete = await medicamentoComponentsPage.countDeleteButtons();
    await medicamentoComponentsPage.clickOnLastDeleteButton();

    medicamentoDeleteDialog = new MedicamentoDeleteDialog();
    expect(await medicamentoDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.medicamento.delete.question');
    await medicamentoDeleteDialog.clickOnConfirmButton();

    expect(await medicamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
