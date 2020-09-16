import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProfissionalComponentsPage, ProfissionalDeleteDialog, ProfissionalUpdatePage } from './profissional.page-object';

const expect = chai.expect;

describe('Profissional e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profissionalComponentsPage: ProfissionalComponentsPage;
  let profissionalUpdatePage: ProfissionalUpdatePage;
  let profissionalDeleteDialog: ProfissionalDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Profissionals', async () => {
    await navBarPage.goToEntity('profissional');
    profissionalComponentsPage = new ProfissionalComponentsPage();
    await browser.wait(ec.visibilityOf(profissionalComponentsPage.title), 5000);
    expect(await profissionalComponentsPage.getTitle()).to.eq('saudepluplusApp.profissional.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(profissionalComponentsPage.entities), ec.visibilityOf(profissionalComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Profissional page', async () => {
    await profissionalComponentsPage.clickOnCreateButton();
    profissionalUpdatePage = new ProfissionalUpdatePage();
    expect(await profissionalUpdatePage.getPageTitle()).to.eq('saudepluplusApp.profissional.home.createOrEditLabel');
    await profissionalUpdatePage.cancel();
  });

  it('should create and save Profissionals', async () => {
    const nbButtonsBeforeCreate = await profissionalComponentsPage.countDeleteButtons();

    await profissionalComponentsPage.clickOnCreateButton();

    await promise.all([
      profissionalUpdatePage.setUUIDInput('uUID'),
      profissionalUpdatePage.setNomeInput('nome'),
      profissionalUpdatePage.setRGInput('rG'),
      profissionalUpdatePage.setCPFInput('cPF'),
      profissionalUpdatePage.perfilAcessoSelectLastOption(),
    ]);

    expect(await profissionalUpdatePage.getUUIDInput()).to.eq('uUID', 'Expected UUID value to be equals to uUID');
    expect(await profissionalUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await profissionalUpdatePage.getRGInput()).to.eq('rG', 'Expected RG value to be equals to rG');
    expect(await profissionalUpdatePage.getCPFInput()).to.eq('cPF', 'Expected CPF value to be equals to cPF');

    await profissionalUpdatePage.save();
    expect(await profissionalUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await profissionalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Profissional', async () => {
    const nbButtonsBeforeDelete = await profissionalComponentsPage.countDeleteButtons();
    await profissionalComponentsPage.clickOnLastDeleteButton();

    profissionalDeleteDialog = new ProfissionalDeleteDialog();
    expect(await profissionalDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.profissional.delete.question');
    await profissionalDeleteDialog.clickOnConfirmButton();

    expect(await profissionalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
