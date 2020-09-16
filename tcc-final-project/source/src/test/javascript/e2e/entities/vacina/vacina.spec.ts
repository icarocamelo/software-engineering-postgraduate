import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VacinaComponentsPage, VacinaDeleteDialog, VacinaUpdatePage } from './vacina.page-object';

const expect = chai.expect;

describe('Vacina e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vacinaComponentsPage: VacinaComponentsPage;
  let vacinaUpdatePage: VacinaUpdatePage;
  let vacinaDeleteDialog: VacinaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Vacinas', async () => {
    await navBarPage.goToEntity('vacina');
    vacinaComponentsPage = new VacinaComponentsPage();
    await browser.wait(ec.visibilityOf(vacinaComponentsPage.title), 5000);
    expect(await vacinaComponentsPage.getTitle()).to.eq('saudepluplusApp.vacina.home.title');
    await browser.wait(ec.or(ec.visibilityOf(vacinaComponentsPage.entities), ec.visibilityOf(vacinaComponentsPage.noResult)), 1000);
  });

  it('should load create Vacina page', async () => {
    await vacinaComponentsPage.clickOnCreateButton();
    vacinaUpdatePage = new VacinaUpdatePage();
    expect(await vacinaUpdatePage.getPageTitle()).to.eq('saudepluplusApp.vacina.home.createOrEditLabel');
    await vacinaUpdatePage.cancel();
  });

  it('should create and save Vacinas', async () => {
    const nbButtonsBeforeCreate = await vacinaComponentsPage.countDeleteButtons();

    await vacinaComponentsPage.clickOnCreateButton();

    await promise.all([
      vacinaUpdatePage.setUUIDInput('uUID'),
      vacinaUpdatePage.setNomeInput('nome'),
      vacinaUpdatePage.setLoteInput('lote'),
      vacinaUpdatePage.setDataAplicacaoInput('2000-12-31'),
      vacinaUpdatePage.cartaoVacinaSelectLastOption(),
    ]);

    expect(await vacinaUpdatePage.getUUIDInput()).to.eq('uUID', 'Expected UUID value to be equals to uUID');
    expect(await vacinaUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await vacinaUpdatePage.getLoteInput()).to.eq('lote', 'Expected Lote value to be equals to lote');
    expect(await vacinaUpdatePage.getDataAplicacaoInput()).to.eq('2000-12-31', 'Expected dataAplicacao value to be equals to 2000-12-31');

    await vacinaUpdatePage.save();
    expect(await vacinaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await vacinaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Vacina', async () => {
    const nbButtonsBeforeDelete = await vacinaComponentsPage.countDeleteButtons();
    await vacinaComponentsPage.clickOnLastDeleteButton();

    vacinaDeleteDialog = new VacinaDeleteDialog();
    expect(await vacinaDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.vacina.delete.question');
    await vacinaDeleteDialog.clickOnConfirmButton();

    expect(await vacinaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
