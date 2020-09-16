import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PostoDeSaudeComponentsPage, PostoDeSaudeDeleteDialog, PostoDeSaudeUpdatePage } from './posto-de-saude.page-object';

const expect = chai.expect;

describe('PostoDeSaude e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let postoDeSaudeComponentsPage: PostoDeSaudeComponentsPage;
  let postoDeSaudeUpdatePage: PostoDeSaudeUpdatePage;
  let postoDeSaudeDeleteDialog: PostoDeSaudeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PostoDeSaudes', async () => {
    await navBarPage.goToEntity('posto-de-saude');
    postoDeSaudeComponentsPage = new PostoDeSaudeComponentsPage();
    await browser.wait(ec.visibilityOf(postoDeSaudeComponentsPage.title), 5000);
    expect(await postoDeSaudeComponentsPage.getTitle()).to.eq('saudepluplusApp.postoDeSaude.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(postoDeSaudeComponentsPage.entities), ec.visibilityOf(postoDeSaudeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PostoDeSaude page', async () => {
    await postoDeSaudeComponentsPage.clickOnCreateButton();
    postoDeSaudeUpdatePage = new PostoDeSaudeUpdatePage();
    expect(await postoDeSaudeUpdatePage.getPageTitle()).to.eq('saudepluplusApp.postoDeSaude.home.createOrEditLabel');
    await postoDeSaudeUpdatePage.cancel();
  });

  it('should create and save PostoDeSaudes', async () => {
    const nbButtonsBeforeCreate = await postoDeSaudeComponentsPage.countDeleteButtons();

    await postoDeSaudeComponentsPage.clickOnCreateButton();

    await promise.all([]);

    await postoDeSaudeUpdatePage.save();
    expect(await postoDeSaudeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await postoDeSaudeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PostoDeSaude', async () => {
    const nbButtonsBeforeDelete = await postoDeSaudeComponentsPage.countDeleteButtons();
    await postoDeSaudeComponentsPage.clickOnLastDeleteButton();

    postoDeSaudeDeleteDialog = new PostoDeSaudeDeleteDialog();
    expect(await postoDeSaudeDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.postoDeSaude.delete.question');
    await postoDeSaudeDeleteDialog.clickOnConfirmButton();

    expect(await postoDeSaudeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
