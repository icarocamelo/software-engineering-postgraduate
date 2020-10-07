import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ClinicaMedicaComponentsPage, ClinicaMedicaDeleteDialog, ClinicaMedicaUpdatePage } from './clinica-medica.page-object';

const expect = chai.expect;

describe('ClinicaMedica e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clinicaMedicaComponentsPage: ClinicaMedicaComponentsPage;
  let clinicaMedicaUpdatePage: ClinicaMedicaUpdatePage;
  let clinicaMedicaDeleteDialog: ClinicaMedicaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ClinicaMedicas', async () => {
    await navBarPage.goToEntity('clinica-medica');
    clinicaMedicaComponentsPage = new ClinicaMedicaComponentsPage();
    await browser.wait(ec.visibilityOf(clinicaMedicaComponentsPage.title), 5000);
    expect(await clinicaMedicaComponentsPage.getTitle()).to.eq('saudepluplusApp.clinicaMedica.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(clinicaMedicaComponentsPage.entities), ec.visibilityOf(clinicaMedicaComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ClinicaMedica page', async () => {
    await clinicaMedicaComponentsPage.clickOnCreateButton();
    clinicaMedicaUpdatePage = new ClinicaMedicaUpdatePage();
    expect(await clinicaMedicaUpdatePage.getPageTitle()).to.eq('saudepluplusApp.clinicaMedica.home.createOrEditLabel');
    await clinicaMedicaUpdatePage.cancel();
  });

  it('should create and save ClinicaMedicas', async () => {
    const nbButtonsBeforeCreate = await clinicaMedicaComponentsPage.countDeleteButtons();

    await clinicaMedicaComponentsPage.clickOnCreateButton();

    await promise.all([
      clinicaMedicaUpdatePage.setCNPJInput('cNPJ'),
      clinicaMedicaUpdatePage.setTelefoneInput('telefone'),
      clinicaMedicaUpdatePage.setCEPInput('cEP'),
      clinicaMedicaUpdatePage.setRazaoSocialInput('razaoSocial'),
      clinicaMedicaUpdatePage.setNomeFantasiaInput('nomeFantasia'),
      clinicaMedicaUpdatePage.tipoUnidadeSaudeSelectLastOption(),
      clinicaMedicaUpdatePage.enderecoSelectLastOption(),
    ]);

    expect(await clinicaMedicaUpdatePage.getCNPJInput()).to.eq('cNPJ', 'Expected CNPJ value to be equals to cNPJ');
    expect(await clinicaMedicaUpdatePage.getTelefoneInput()).to.eq('telefone', 'Expected Telefone value to be equals to telefone');
    expect(await clinicaMedicaUpdatePage.getCEPInput()).to.eq('cEP', 'Expected CEP value to be equals to cEP');
    expect(await clinicaMedicaUpdatePage.getRazaoSocialInput()).to.eq(
      'razaoSocial',
      'Expected RazaoSocial value to be equals to razaoSocial'
    );
    expect(await clinicaMedicaUpdatePage.getNomeFantasiaInput()).to.eq(
      'nomeFantasia',
      'Expected NomeFantasia value to be equals to nomeFantasia'
    );

    await clinicaMedicaUpdatePage.save();
    expect(await clinicaMedicaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await clinicaMedicaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ClinicaMedica', async () => {
    const nbButtonsBeforeDelete = await clinicaMedicaComponentsPage.countDeleteButtons();
    await clinicaMedicaComponentsPage.clickOnLastDeleteButton();

    clinicaMedicaDeleteDialog = new ClinicaMedicaDeleteDialog();
    expect(await clinicaMedicaDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.clinicaMedica.delete.question');
    await clinicaMedicaDeleteDialog.clickOnConfirmButton();

    expect(await clinicaMedicaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
