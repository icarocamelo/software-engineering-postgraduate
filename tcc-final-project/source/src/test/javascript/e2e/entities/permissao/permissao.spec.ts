import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PermissaoComponentsPage, PermissaoDeleteDialog, PermissaoUpdatePage } from './permissao.page-object';

const expect = chai.expect;

describe('Permissao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let permissaoComponentsPage: PermissaoComponentsPage;
  let permissaoUpdatePage: PermissaoUpdatePage;
  let permissaoDeleteDialog: PermissaoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Permissaos', async () => {
    await navBarPage.goToEntity('permissao');
    permissaoComponentsPage = new PermissaoComponentsPage();
    await browser.wait(ec.visibilityOf(permissaoComponentsPage.title), 5000);
    expect(await permissaoComponentsPage.getTitle()).to.eq('saudepluplusApp.permissao.home.title');
    await browser.wait(ec.or(ec.visibilityOf(permissaoComponentsPage.entities), ec.visibilityOf(permissaoComponentsPage.noResult)), 1000);
  });

  it('should load create Permissao page', async () => {
    await permissaoComponentsPage.clickOnCreateButton();
    permissaoUpdatePage = new PermissaoUpdatePage();
    expect(await permissaoUpdatePage.getPageTitle()).to.eq('saudepluplusApp.permissao.home.createOrEditLabel');
    await permissaoUpdatePage.cancel();
  });

  it('should create and save Permissaos', async () => {
    const nbButtonsBeforeCreate = await permissaoComponentsPage.countDeleteButtons();

    await permissaoComponentsPage.clickOnCreateButton();

    await promise.all([permissaoUpdatePage.setUUIDInput('uUID')]);

    expect(await permissaoUpdatePage.getUUIDInput()).to.eq('uUID', 'Expected UUID value to be equals to uUID');

    await permissaoUpdatePage.save();
    expect(await permissaoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await permissaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Permissao', async () => {
    const nbButtonsBeforeDelete = await permissaoComponentsPage.countDeleteButtons();
    await permissaoComponentsPage.clickOnLastDeleteButton();

    permissaoDeleteDialog = new PermissaoDeleteDialog();
    expect(await permissaoDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.permissao.delete.question');
    await permissaoDeleteDialog.clickOnConfirmButton();

    expect(await permissaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
