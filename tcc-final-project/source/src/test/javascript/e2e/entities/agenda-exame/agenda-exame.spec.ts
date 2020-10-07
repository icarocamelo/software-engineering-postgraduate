import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AgendaExameComponentsPage, AgendaExameDeleteDialog, AgendaExameUpdatePage } from './agenda-exame.page-object';

const expect = chai.expect;

describe('AgendaExame e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let agendaExameComponentsPage: AgendaExameComponentsPage;
  let agendaExameUpdatePage: AgendaExameUpdatePage;
  let agendaExameDeleteDialog: AgendaExameDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AgendaExames', async () => {
    await navBarPage.goToEntity('agenda-exame');
    agendaExameComponentsPage = new AgendaExameComponentsPage();
    await browser.wait(ec.visibilityOf(agendaExameComponentsPage.title), 5000);
    expect(await agendaExameComponentsPage.getTitle()).to.eq('saudepluplusApp.agendaExame.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(agendaExameComponentsPage.entities), ec.visibilityOf(agendaExameComponentsPage.noResult)),
      1000
    );
  });

  it('should load create AgendaExame page', async () => {
    await agendaExameComponentsPage.clickOnCreateButton();
    agendaExameUpdatePage = new AgendaExameUpdatePage();
    expect(await agendaExameUpdatePage.getPageTitle()).to.eq('saudepluplusApp.agendaExame.home.createOrEditLabel');
    await agendaExameUpdatePage.cancel();
  });

  it('should create and save AgendaExames', async () => {
    const nbButtonsBeforeCreate = await agendaExameComponentsPage.countDeleteButtons();

    await agendaExameComponentsPage.clickOnCreateButton();

    await promise.all([agendaExameUpdatePage.setDataInput('2000-12-31')]);

    expect(await agendaExameUpdatePage.getDataInput()).to.eq('2000-12-31', 'Expected data value to be equals to 2000-12-31');

    await agendaExameUpdatePage.save();
    expect(await agendaExameUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await agendaExameComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AgendaExame', async () => {
    const nbButtonsBeforeDelete = await agendaExameComponentsPage.countDeleteButtons();
    await agendaExameComponentsPage.clickOnLastDeleteButton();

    agendaExameDeleteDialog = new AgendaExameDeleteDialog();
    expect(await agendaExameDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.agendaExame.delete.question');
    await agendaExameDeleteDialog.clickOnConfirmButton();

    expect(await agendaExameComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
