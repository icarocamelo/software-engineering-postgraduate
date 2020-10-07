import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PerfilAcessoComponentsPage, PerfilAcessoDeleteDialog, PerfilAcessoUpdatePage } from './perfil-acesso.page-object';

const expect = chai.expect;

describe('PerfilAcesso e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let perfilAcessoComponentsPage: PerfilAcessoComponentsPage;
  let perfilAcessoUpdatePage: PerfilAcessoUpdatePage;
  let perfilAcessoDeleteDialog: PerfilAcessoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PerfilAcessos', async () => {
    await navBarPage.goToEntity('perfil-acesso');
    perfilAcessoComponentsPage = new PerfilAcessoComponentsPage();
    await browser.wait(ec.visibilityOf(perfilAcessoComponentsPage.title), 5000);
    expect(await perfilAcessoComponentsPage.getTitle()).to.eq('saudepluplusApp.perfilAcesso.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(perfilAcessoComponentsPage.entities), ec.visibilityOf(perfilAcessoComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PerfilAcesso page', async () => {
    await perfilAcessoComponentsPage.clickOnCreateButton();
    perfilAcessoUpdatePage = new PerfilAcessoUpdatePage();
    expect(await perfilAcessoUpdatePage.getPageTitle()).to.eq('saudepluplusApp.perfilAcesso.home.createOrEditLabel');
    await perfilAcessoUpdatePage.cancel();
  });

  it('should create and save PerfilAcessos', async () => {
    const nbButtonsBeforeCreate = await perfilAcessoComponentsPage.countDeleteButtons();

    await perfilAcessoComponentsPage.clickOnCreateButton();

    await promise.all([perfilAcessoUpdatePage.setNomeInput('nome')]);

    expect(await perfilAcessoUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');

    await perfilAcessoUpdatePage.save();
    expect(await perfilAcessoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await perfilAcessoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PerfilAcesso', async () => {
    const nbButtonsBeforeDelete = await perfilAcessoComponentsPage.countDeleteButtons();
    await perfilAcessoComponentsPage.clickOnLastDeleteButton();

    perfilAcessoDeleteDialog = new PerfilAcessoDeleteDialog();
    expect(await perfilAcessoDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.perfilAcesso.delete.question');
    await perfilAcessoDeleteDialog.clickOnConfirmButton();

    expect(await perfilAcessoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
