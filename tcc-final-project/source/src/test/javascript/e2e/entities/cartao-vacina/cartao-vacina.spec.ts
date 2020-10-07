import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CartaoVacinaComponentsPage, CartaoVacinaDeleteDialog, CartaoVacinaUpdatePage } from './cartao-vacina.page-object';

const expect = chai.expect;

describe('CartaoVacina e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cartaoVacinaComponentsPage: CartaoVacinaComponentsPage;
  let cartaoVacinaUpdatePage: CartaoVacinaUpdatePage;
  let cartaoVacinaDeleteDialog: CartaoVacinaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CartaoVacinas', async () => {
    await navBarPage.goToEntity('cartao-vacina');
    cartaoVacinaComponentsPage = new CartaoVacinaComponentsPage();
    await browser.wait(ec.visibilityOf(cartaoVacinaComponentsPage.title), 5000);
    expect(await cartaoVacinaComponentsPage.getTitle()).to.eq('saudepluplusApp.cartaoVacina.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(cartaoVacinaComponentsPage.entities), ec.visibilityOf(cartaoVacinaComponentsPage.noResult)),
      1000
    );
  });

  it('should load create CartaoVacina page', async () => {
    await cartaoVacinaComponentsPage.clickOnCreateButton();
    cartaoVacinaUpdatePage = new CartaoVacinaUpdatePage();
    expect(await cartaoVacinaUpdatePage.getPageTitle()).to.eq('saudepluplusApp.cartaoVacina.home.createOrEditLabel');
    await cartaoVacinaUpdatePage.cancel();
  });

  it('should create and save CartaoVacinas', async () => {
    const nbButtonsBeforeCreate = await cartaoVacinaComponentsPage.countDeleteButtons();

    await cartaoVacinaComponentsPage.clickOnCreateButton();

    await promise.all([]);

    await cartaoVacinaUpdatePage.save();
    expect(await cartaoVacinaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cartaoVacinaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last CartaoVacina', async () => {
    const nbButtonsBeforeDelete = await cartaoVacinaComponentsPage.countDeleteButtons();
    await cartaoVacinaComponentsPage.clickOnLastDeleteButton();

    cartaoVacinaDeleteDialog = new CartaoVacinaDeleteDialog();
    expect(await cartaoVacinaDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.cartaoVacina.delete.question');
    await cartaoVacinaDeleteDialog.clickOnConfirmButton();

    expect(await cartaoVacinaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
