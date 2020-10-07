import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AtendimentoComponentsPage, AtendimentoDeleteDialog, AtendimentoUpdatePage } from './atendimento.page-object';

const expect = chai.expect;

describe('Atendimento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let atendimentoComponentsPage: AtendimentoComponentsPage;
  let atendimentoUpdatePage: AtendimentoUpdatePage;
  let atendimentoDeleteDialog: AtendimentoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Atendimentos', async () => {
    await navBarPage.goToEntity('atendimento');
    atendimentoComponentsPage = new AtendimentoComponentsPage();
    await browser.wait(ec.visibilityOf(atendimentoComponentsPage.title), 5000);
    expect(await atendimentoComponentsPage.getTitle()).to.eq('saudepluplusApp.atendimento.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(atendimentoComponentsPage.entities), ec.visibilityOf(atendimentoComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Atendimento page', async () => {
    await atendimentoComponentsPage.clickOnCreateButton();
    atendimentoUpdatePage = new AtendimentoUpdatePage();
    expect(await atendimentoUpdatePage.getPageTitle()).to.eq('saudepluplusApp.atendimento.home.createOrEditLabel');
    await atendimentoUpdatePage.cancel();
  });

  it('should create and save Atendimentos', async () => {
    const nbButtonsBeforeCreate = await atendimentoComponentsPage.countDeleteButtons();

    await atendimentoComponentsPage.clickOnCreateButton();

    await promise.all([
      atendimentoUpdatePage.setDataInput('2000-12-31'),
      atendimentoUpdatePage.pacienteSelectLastOption(),
      atendimentoUpdatePage.profissionalDeSaudeSelectLastOption(),
      atendimentoUpdatePage.enderecoSelectLastOption(),
      atendimentoUpdatePage.agendaSelectLastOption(),
      atendimentoUpdatePage.prontuarioSelectLastOption(),
    ]);

    expect(await atendimentoUpdatePage.getDataInput()).to.eq('2000-12-31', 'Expected data value to be equals to 2000-12-31');

    await atendimentoUpdatePage.save();
    expect(await atendimentoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await atendimentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Atendimento', async () => {
    const nbButtonsBeforeDelete = await atendimentoComponentsPage.countDeleteButtons();
    await atendimentoComponentsPage.clickOnLastDeleteButton();

    atendimentoDeleteDialog = new AtendimentoDeleteDialog();
    expect(await atendimentoDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.atendimento.delete.question');
    await atendimentoDeleteDialog.clickOnConfirmButton();

    expect(await atendimentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
