import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LeitoComponentsPage, LeitoDeleteDialog, LeitoUpdatePage } from './leito.page-object';

const expect = chai.expect;

describe('Leito e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let leitoComponentsPage: LeitoComponentsPage;
  let leitoUpdatePage: LeitoUpdatePage;
  let leitoDeleteDialog: LeitoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Leitos', async () => {
    await navBarPage.goToEntity('leito');
    leitoComponentsPage = new LeitoComponentsPage();
    await browser.wait(ec.visibilityOf(leitoComponentsPage.title), 5000);
    expect(await leitoComponentsPage.getTitle()).to.eq('saudepluplusApp.leito.home.title');
    await browser.wait(ec.or(ec.visibilityOf(leitoComponentsPage.entities), ec.visibilityOf(leitoComponentsPage.noResult)), 1000);
  });

  it('should load create Leito page', async () => {
    await leitoComponentsPage.clickOnCreateButton();
    leitoUpdatePage = new LeitoUpdatePage();
    expect(await leitoUpdatePage.getPageTitle()).to.eq('saudepluplusApp.leito.home.createOrEditLabel');
    await leitoUpdatePage.cancel();
  });

  it('should create and save Leitos', async () => {
    const nbButtonsBeforeCreate = await leitoComponentsPage.countDeleteButtons();

    await leitoComponentsPage.clickOnCreateButton();

    await promise.all([leitoUpdatePage.setIdentificacaoInput('identificacao'), leitoUpdatePage.hospitalSelectLastOption()]);

    expect(await leitoUpdatePage.getIdentificacaoInput()).to.eq(
      'identificacao',
      'Expected Identificacao value to be equals to identificacao'
    );

    await leitoUpdatePage.save();
    expect(await leitoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await leitoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Leito', async () => {
    const nbButtonsBeforeDelete = await leitoComponentsPage.countDeleteButtons();
    await leitoComponentsPage.clickOnLastDeleteButton();

    leitoDeleteDialog = new LeitoDeleteDialog();
    expect(await leitoDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.leito.delete.question');
    await leitoDeleteDialog.clickOnConfirmButton();

    expect(await leitoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
