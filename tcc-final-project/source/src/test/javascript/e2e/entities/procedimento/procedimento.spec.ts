import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProcedimentoComponentsPage, ProcedimentoDeleteDialog, ProcedimentoUpdatePage } from './procedimento.page-object';

const expect = chai.expect;

describe('Procedimento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let procedimentoComponentsPage: ProcedimentoComponentsPage;
  let procedimentoUpdatePage: ProcedimentoUpdatePage;
  let procedimentoDeleteDialog: ProcedimentoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Procedimentos', async () => {
    await navBarPage.goToEntity('procedimento');
    procedimentoComponentsPage = new ProcedimentoComponentsPage();
    await browser.wait(ec.visibilityOf(procedimentoComponentsPage.title), 5000);
    expect(await procedimentoComponentsPage.getTitle()).to.eq('saudepluplusApp.procedimento.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(procedimentoComponentsPage.entities), ec.visibilityOf(procedimentoComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Procedimento page', async () => {
    await procedimentoComponentsPage.clickOnCreateButton();
    procedimentoUpdatePage = new ProcedimentoUpdatePage();
    expect(await procedimentoUpdatePage.getPageTitle()).to.eq('saudepluplusApp.procedimento.home.createOrEditLabel');
    await procedimentoUpdatePage.cancel();
  });

  it('should create and save Procedimentos', async () => {
    const nbButtonsBeforeCreate = await procedimentoComponentsPage.countDeleteButtons();

    await procedimentoComponentsPage.clickOnCreateButton();

    await promise.all([
      procedimentoUpdatePage.setUUIDInput('uUID'),
      procedimentoUpdatePage.setDescricaoInput('descricao'),
      procedimentoUpdatePage.setPrecoInput('5'),
      procedimentoUpdatePage.setCodigoInput('codigo'),
    ]);

    expect(await procedimentoUpdatePage.getUUIDInput()).to.eq('uUID', 'Expected UUID value to be equals to uUID');
    expect(await procedimentoUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
    expect(await procedimentoUpdatePage.getPrecoInput()).to.eq('5', 'Expected preco value to be equals to 5');
    expect(await procedimentoUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');

    await procedimentoUpdatePage.save();
    expect(await procedimentoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await procedimentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Procedimento', async () => {
    const nbButtonsBeforeDelete = await procedimentoComponentsPage.countDeleteButtons();
    await procedimentoComponentsPage.clickOnLastDeleteButton();

    procedimentoDeleteDialog = new ProcedimentoDeleteDialog();
    expect(await procedimentoDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.procedimento.delete.question');
    await procedimentoDeleteDialog.clickOnConfirmButton();

    expect(await procedimentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
