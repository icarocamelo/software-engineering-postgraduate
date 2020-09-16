import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AgendaConsultaComponentsPage, AgendaConsultaDeleteDialog, AgendaConsultaUpdatePage } from './agenda-consulta.page-object';

const expect = chai.expect;

describe('AgendaConsulta e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let agendaConsultaComponentsPage: AgendaConsultaComponentsPage;
  let agendaConsultaUpdatePage: AgendaConsultaUpdatePage;
  let agendaConsultaDeleteDialog: AgendaConsultaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AgendaConsultas', async () => {
    await navBarPage.goToEntity('agenda-consulta');
    agendaConsultaComponentsPage = new AgendaConsultaComponentsPage();
    await browser.wait(ec.visibilityOf(agendaConsultaComponentsPage.title), 5000);
    expect(await agendaConsultaComponentsPage.getTitle()).to.eq('saudepluplusApp.agendaConsulta.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(agendaConsultaComponentsPage.entities), ec.visibilityOf(agendaConsultaComponentsPage.noResult)),
      1000
    );
  });

  it('should load create AgendaConsulta page', async () => {
    await agendaConsultaComponentsPage.clickOnCreateButton();
    agendaConsultaUpdatePage = new AgendaConsultaUpdatePage();
    expect(await agendaConsultaUpdatePage.getPageTitle()).to.eq('saudepluplusApp.agendaConsulta.home.createOrEditLabel');
    await agendaConsultaUpdatePage.cancel();
  });

  it('should create and save AgendaConsultas', async () => {
    const nbButtonsBeforeCreate = await agendaConsultaComponentsPage.countDeleteButtons();

    await agendaConsultaComponentsPage.clickOnCreateButton();

    await promise.all([]);

    await agendaConsultaUpdatePage.save();
    expect(await agendaConsultaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await agendaConsultaComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last AgendaConsulta', async () => {
    const nbButtonsBeforeDelete = await agendaConsultaComponentsPage.countDeleteButtons();
    await agendaConsultaComponentsPage.clickOnLastDeleteButton();

    agendaConsultaDeleteDialog = new AgendaConsultaDeleteDialog();
    expect(await agendaConsultaDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.agendaConsulta.delete.question');
    await agendaConsultaDeleteDialog.clickOnConfirmButton();

    expect(await agendaConsultaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
