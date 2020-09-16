import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LaboratorioComponentsPage, LaboratorioDeleteDialog, LaboratorioUpdatePage } from './laboratorio.page-object';

const expect = chai.expect;

describe('Laboratorio e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let laboratorioComponentsPage: LaboratorioComponentsPage;
  let laboratorioUpdatePage: LaboratorioUpdatePage;
  let laboratorioDeleteDialog: LaboratorioDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Laboratorios', async () => {
    await navBarPage.goToEntity('laboratorio');
    laboratorioComponentsPage = new LaboratorioComponentsPage();
    await browser.wait(ec.visibilityOf(laboratorioComponentsPage.title), 5000);
    expect(await laboratorioComponentsPage.getTitle()).to.eq('saudepluplusApp.laboratorio.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(laboratorioComponentsPage.entities), ec.visibilityOf(laboratorioComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Laboratorio page', async () => {
    await laboratorioComponentsPage.clickOnCreateButton();
    laboratorioUpdatePage = new LaboratorioUpdatePage();
    expect(await laboratorioUpdatePage.getPageTitle()).to.eq('saudepluplusApp.laboratorio.home.createOrEditLabel');
    await laboratorioUpdatePage.cancel();
  });

  it('should create and save Laboratorios', async () => {
    const nbButtonsBeforeCreate = await laboratorioComponentsPage.countDeleteButtons();

    await laboratorioComponentsPage.clickOnCreateButton();

    await promise.all([]);

    await laboratorioUpdatePage.save();
    expect(await laboratorioUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await laboratorioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Laboratorio', async () => {
    const nbButtonsBeforeDelete = await laboratorioComponentsPage.countDeleteButtons();
    await laboratorioComponentsPage.clickOnLastDeleteButton();

    laboratorioDeleteDialog = new LaboratorioDeleteDialog();
    expect(await laboratorioDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.laboratorio.delete.question');
    await laboratorioDeleteDialog.clickOnConfirmButton();

    expect(await laboratorioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
