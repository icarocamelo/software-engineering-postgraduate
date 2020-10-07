import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ProfissionalDeSaudeComponentsPage,
  ProfissionalDeSaudeDeleteDialog,
  ProfissionalDeSaudeUpdatePage,
} from './profissional-de-saude.page-object';

const expect = chai.expect;

describe('ProfissionalDeSaude e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profissionalDeSaudeComponentsPage: ProfissionalDeSaudeComponentsPage;
  let profissionalDeSaudeUpdatePage: ProfissionalDeSaudeUpdatePage;
  let profissionalDeSaudeDeleteDialog: ProfissionalDeSaudeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProfissionalDeSaudes', async () => {
    await navBarPage.goToEntity('profissional-de-saude');
    profissionalDeSaudeComponentsPage = new ProfissionalDeSaudeComponentsPage();
    await browser.wait(ec.visibilityOf(profissionalDeSaudeComponentsPage.title), 5000);
    expect(await profissionalDeSaudeComponentsPage.getTitle()).to.eq('saudepluplusApp.profissionalDeSaude.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(profissionalDeSaudeComponentsPage.entities), ec.visibilityOf(profissionalDeSaudeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProfissionalDeSaude page', async () => {
    await profissionalDeSaudeComponentsPage.clickOnCreateButton();
    profissionalDeSaudeUpdatePage = new ProfissionalDeSaudeUpdatePage();
    expect(await profissionalDeSaudeUpdatePage.getPageTitle()).to.eq('saudepluplusApp.profissionalDeSaude.home.createOrEditLabel');
    await profissionalDeSaudeUpdatePage.cancel();
  });

  it('should create and save ProfissionalDeSaudes', async () => {
    const nbButtonsBeforeCreate = await profissionalDeSaudeComponentsPage.countDeleteButtons();

    await profissionalDeSaudeComponentsPage.clickOnCreateButton();

    await promise.all([]);

    await profissionalDeSaudeUpdatePage.save();
    expect(await profissionalDeSaudeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await profissionalDeSaudeComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ProfissionalDeSaude', async () => {
    const nbButtonsBeforeDelete = await profissionalDeSaudeComponentsPage.countDeleteButtons();
    await profissionalDeSaudeComponentsPage.clickOnLastDeleteButton();

    profissionalDeSaudeDeleteDialog = new ProfissionalDeSaudeDeleteDialog();
    expect(await profissionalDeSaudeDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.profissionalDeSaude.delete.question');
    await profissionalDeSaudeDeleteDialog.clickOnConfirmButton();

    expect(await profissionalDeSaudeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
