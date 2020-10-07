import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConsultaComponentsPage, ConsultaDeleteDialog, ConsultaUpdatePage } from './consulta.page-object';

const expect = chai.expect;

describe('Consulta e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let consultaComponentsPage: ConsultaComponentsPage;
  let consultaUpdatePage: ConsultaUpdatePage;
  let consultaDeleteDialog: ConsultaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Consultas', async () => {
    await navBarPage.goToEntity('consulta');
    consultaComponentsPage = new ConsultaComponentsPage();
    await browser.wait(ec.visibilityOf(consultaComponentsPage.title), 5000);
    expect(await consultaComponentsPage.getTitle()).to.eq('saudepluplusApp.consulta.home.title');
    await browser.wait(ec.or(ec.visibilityOf(consultaComponentsPage.entities), ec.visibilityOf(consultaComponentsPage.noResult)), 1000);
  });

  it('should load create Consulta page', async () => {
    await consultaComponentsPage.clickOnCreateButton();
    consultaUpdatePage = new ConsultaUpdatePage();
    expect(await consultaUpdatePage.getPageTitle()).to.eq('saudepluplusApp.consulta.home.createOrEditLabel');
    await consultaUpdatePage.cancel();
  });

  it('should create and save Consultas', async () => {
    const nbButtonsBeforeCreate = await consultaComponentsPage.countDeleteButtons();

    await consultaComponentsPage.clickOnCreateButton();

    await promise.all([
      consultaUpdatePage.setDescricaoInput('descricao'),
      consultaUpdatePage.setPrecoInput('5'),
      consultaUpdatePage.setCodigoInput('codigo'),
    ]);

    expect(await consultaUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
    expect(await consultaUpdatePage.getPrecoInput()).to.eq('5', 'Expected preco value to be equals to 5');
    expect(await consultaUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');

    await consultaUpdatePage.save();
    expect(await consultaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await consultaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Consulta', async () => {
    const nbButtonsBeforeDelete = await consultaComponentsPage.countDeleteButtons();
    await consultaComponentsPage.clickOnLastDeleteButton();

    consultaDeleteDialog = new ConsultaDeleteDialog();
    expect(await consultaDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.consulta.delete.question');
    await consultaDeleteDialog.clickOnConfirmButton();

    expect(await consultaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
