import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PacienteComponentsPage, PacienteDeleteDialog, PacienteUpdatePage } from './paciente.page-object';

const expect = chai.expect;

describe('Paciente e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pacienteComponentsPage: PacienteComponentsPage;
  let pacienteUpdatePage: PacienteUpdatePage;
  let pacienteDeleteDialog: PacienteDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Pacientes', async () => {
    await navBarPage.goToEntity('paciente');
    pacienteComponentsPage = new PacienteComponentsPage();
    await browser.wait(ec.visibilityOf(pacienteComponentsPage.title), 5000);
    expect(await pacienteComponentsPage.getTitle()).to.eq('saudepluplusApp.paciente.home.title');
    await browser.wait(ec.or(ec.visibilityOf(pacienteComponentsPage.entities), ec.visibilityOf(pacienteComponentsPage.noResult)), 1000);
  });

  it('should load create Paciente page', async () => {
    await pacienteComponentsPage.clickOnCreateButton();
    pacienteUpdatePage = new PacienteUpdatePage();
    expect(await pacienteUpdatePage.getPageTitle()).to.eq('saudepluplusApp.paciente.home.createOrEditLabel');
    await pacienteUpdatePage.cancel();
  });

  it('should create and save Pacientes', async () => {
    const nbButtonsBeforeCreate = await pacienteComponentsPage.countDeleteButtons();

    await pacienteComponentsPage.clickOnCreateButton();

    await promise.all([
      pacienteUpdatePage.setNomeInput('nome'),
      pacienteUpdatePage.setRGInput('rG'),
      pacienteUpdatePage.setCPFInput('cPF'),
      pacienteUpdatePage.setDataNascimentoInput('2000-12-31'),
      pacienteUpdatePage.setTelefoneInput('telefone'),
      pacienteUpdatePage.setPesoInput('5'),
      pacienteUpdatePage.setAlturaInput('5'),
      pacienteUpdatePage.setResponsavelInput('responsavel'),
      pacienteUpdatePage.setRNEInput('rNE'),
      pacienteUpdatePage.perfilAcessoSelectLastOption(),
      pacienteUpdatePage.enderecoSelectLastOption(),
    ]);

    expect(await pacienteUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await pacienteUpdatePage.getRGInput()).to.eq('rG', 'Expected RG value to be equals to rG');
    expect(await pacienteUpdatePage.getCPFInput()).to.eq('cPF', 'Expected CPF value to be equals to cPF');
    expect(await pacienteUpdatePage.getDataNascimentoInput()).to.eq(
      '2000-12-31',
      'Expected dataNascimento value to be equals to 2000-12-31'
    );
    expect(await pacienteUpdatePage.getTelefoneInput()).to.eq('telefone', 'Expected Telefone value to be equals to telefone');
    expect(await pacienteUpdatePage.getPesoInput()).to.eq('5', 'Expected peso value to be equals to 5');
    expect(await pacienteUpdatePage.getAlturaInput()).to.eq('5', 'Expected altura value to be equals to 5');
    expect(await pacienteUpdatePage.getResponsavelInput()).to.eq('responsavel', 'Expected Responsavel value to be equals to responsavel');
    expect(await pacienteUpdatePage.getRNEInput()).to.eq('rNE', 'Expected RNE value to be equals to rNE');

    await pacienteUpdatePage.save();
    expect(await pacienteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await pacienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Paciente', async () => {
    const nbButtonsBeforeDelete = await pacienteComponentsPage.countDeleteButtons();
    await pacienteComponentsPage.clickOnLastDeleteButton();

    pacienteDeleteDialog = new PacienteDeleteDialog();
    expect(await pacienteDeleteDialog.getDialogTitle()).to.eq('saudepluplusApp.paciente.delete.question');
    await pacienteDeleteDialog.clickOnConfirmButton();

    expect(await pacienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
