import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MedicoComponentsPage, MedicoDeleteDialog, MedicoUpdatePage } from './medico.page-object';

const expect = chai.expect;

describe('Medico e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let medicoComponentsPage: MedicoComponentsPage;
  let medicoUpdatePage: MedicoUpdatePage;
  let medicoDeleteDialog: MedicoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Medicos', async () => {
    await navBarPage.goToEntity('medico');
    medicoComponentsPage = new MedicoComponentsPage();
    await browser.wait(ec.visibilityOf(medicoComponentsPage.title), 5000);
    expect(await medicoComponentsPage.getTitle()).to.eq('saudepluplusApp.medico.home.title');
    await browser.wait(ec.or(ec.visibilityOf(medicoComponentsPage.entities), ec.visibilityOf(medicoComponentsPage.noResult)), 1000);
  });

  it('should load create Medico page', async () => {
    await medicoComponentsPage.clickOnCreateButton();
    medicoUpdatePage = new MedicoUpdatePage();
    expect(await medicoUpdatePage.getPageTitle()).to.eq('saudepluplusApp.medico.home.createOrEditLabel');
    await medicoUpdatePage.cancel();
  });

  it('should create and save Medicos', async () => {
    const nbButtonsBeforeCreate = await medicoComponentsPage.countDeleteButtons();

    await medicoComponentsPage.clickOnCreateButton();

    await promise.all([]);

    await medicoUpdatePage.save();
    expect(await medicoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await medicoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Medico', async () => {
    const nbButtonsBeforeDelete = await medicoComponentsPage.countDeleteButtons();
    await medicoComponentsPage.clickOnLastDeleteButton();

    medicoDeleteDialog = new MedicoDeleteDialog();
    expect(await medicoDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.medico.delete.question');
    await medicoDeleteDialog.clickOnConfirmButton();

    expect(await medicoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
