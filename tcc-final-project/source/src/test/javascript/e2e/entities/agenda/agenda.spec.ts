import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AgendaComponentsPage, AgendaDeleteDialog, AgendaUpdatePage } from './agenda.page-object';

const expect = chai.expect;

describe('Agenda e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let agendaComponentsPage: AgendaComponentsPage;
  let agendaUpdatePage: AgendaUpdatePage;
  let agendaDeleteDialog: AgendaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Agenda', async () => {
    await navBarPage.goToEntity('agenda');
    agendaComponentsPage = new AgendaComponentsPage();
    await browser.wait(ec.visibilityOf(agendaComponentsPage.title), 5000);
    expect(await agendaComponentsPage.getTitle()).to.eq('saudepluplusApp.agenda.home.title');
    await browser.wait(ec.or(ec.visibilityOf(agendaComponentsPage.entities), ec.visibilityOf(agendaComponentsPage.noResult)), 1000);
  });

  it('should load create Agenda page', async () => {
    await agendaComponentsPage.clickOnCreateButton();
    agendaUpdatePage = new AgendaUpdatePage();
    expect(await agendaUpdatePage.getPageTitle()).to.eq('saudepluplusApp.agenda.home.createOrEditLabel');
    await agendaUpdatePage.cancel();
  });

  it('should create and save Agenda', async () => {
    const nbButtonsBeforeCreate = await agendaComponentsPage.countDeleteButtons();

    await agendaComponentsPage.clickOnCreateButton();

    await promise.all([
      agendaUpdatePage.setDataInput('2000-12-31'),
      agendaUpdatePage.medicoSelectLastOption(),
      agendaUpdatePage.fisioterapeutaSelectLastOption(),
      agendaUpdatePage.enfermeiroSelectLastOption(),
      agendaUpdatePage.psicologoSelectLastOption(),
    ]);

    expect(await agendaUpdatePage.getDataInput()).to.eq('2000-12-31', 'Expected data value to be equals to 2000-12-31');

    await agendaUpdatePage.save();
    expect(await agendaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await agendaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Agenda', async () => {
    const nbButtonsBeforeDelete = await agendaComponentsPage.countDeleteButtons();
    await agendaComponentsPage.clickOnLastDeleteButton();

    agendaDeleteDialog = new AgendaDeleteDialog();
    expect(await agendaDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.agenda.delete.question');
    await agendaDeleteDialog.clickOnConfirmButton();

    expect(await agendaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
