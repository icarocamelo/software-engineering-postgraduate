import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'paciente',
        loadChildren: () => import('./paciente/paciente.module').then(m => m.SaudepluplusPacienteModule),
      },
      {
        path: 'endereco',
        loadChildren: () => import('./endereco/endereco.module').then(m => m.SaudepluplusEnderecoModule),
      },
      {
        path: 'profissional',
        loadChildren: () => import('./profissional/profissional.module').then(m => m.SaudepluplusProfissionalModule),
      },
      {
        path: 'profissional-de-saude',
        loadChildren: () =>
          import('./profissional-de-saude/profissional-de-saude.module').then(m => m.SaudepluplusProfissionalDeSaudeModule),
      },
      {
        path: 'medico',
        loadChildren: () => import('./medico/medico.module').then(m => m.SaudepluplusMedicoModule),
      },
      {
        path: 'fisioterapeuta',
        loadChildren: () => import('./fisioterapeuta/fisioterapeuta.module').then(m => m.SaudepluplusFisioterapeutaModule),
      },
      {
        path: 'psicologo',
        loadChildren: () => import('./psicologo/psicologo.module').then(m => m.SaudepluplusPsicologoModule),
      },
      {
        path: 'enfermeiro',
        loadChildren: () => import('./enfermeiro/enfermeiro.module').then(m => m.SaudepluplusEnfermeiroModule),
      },
      {
        path: 'exame',
        loadChildren: () => import('./exame/exame.module').then(m => m.SaudepluplusExameModule),
      },
      {
        path: 'consulta',
        loadChildren: () => import('./consulta/consulta.module').then(m => m.SaudepluplusConsultaModule),
      },
      {
        path: 'procedimento',
        loadChildren: () => import('./procedimento/procedimento.module').then(m => m.SaudepluplusProcedimentoModule),
      },
      {
        path: 'atendimento',
        loadChildren: () => import('./atendimento/atendimento.module').then(m => m.SaudepluplusAtendimentoModule),
      },
      {
        path: 'cartao-vacina',
        loadChildren: () => import('./cartao-vacina/cartao-vacina.module').then(m => m.SaudepluplusCartaoVacinaModule),
      },
      {
        path: 'vacina',
        loadChildren: () => import('./vacina/vacina.module').then(m => m.SaudepluplusVacinaModule),
      },
      {
        path: 'unidade-saude',
        loadChildren: () => import('./unidade-saude/unidade-saude.module').then(m => m.SaudepluplusUnidadeSaudeModule),
      },
      {
        path: 'laboratorio',
        loadChildren: () => import('./laboratorio/laboratorio.module').then(m => m.SaudepluplusLaboratorioModule),
      },
      {
        path: 'clinica-medica',
        loadChildren: () => import('./clinica-medica/clinica-medica.module').then(m => m.SaudepluplusClinicaMedicaModule),
      },
      {
        path: 'hospital',
        loadChildren: () => import('./hospital/hospital.module').then(m => m.SaudepluplusHospitalModule),
      },
      {
        path: 'posto-de-saude',
        loadChildren: () => import('./posto-de-saude/posto-de-saude.module').then(m => m.SaudepluplusPostoDeSaudeModule),
      },
      {
        path: 'leito',
        loadChildren: () => import('./leito/leito.module').then(m => m.SaudepluplusLeitoModule),
      },
      {
        path: 'farmacia',
        loadChildren: () => import('./farmacia/farmacia.module').then(m => m.SaudepluplusFarmaciaModule),
      },
      {
        path: 'medicamento',
        loadChildren: () => import('./medicamento/medicamento.module').then(m => m.SaudepluplusMedicamentoModule),
      },
      {
        path: 'agenda',
        loadChildren: () => import('./agenda/agenda.module').then(m => m.SaudepluplusAgendaModule),
      },
      {
        path: 'agenda-consulta',
        loadChildren: () => import('./agenda-consulta/agenda-consulta.module').then(m => m.SaudepluplusAgendaConsultaModule),
      },
      {
        path: 'agenda-exame',
        loadChildren: () => import('./agenda-exame/agenda-exame.module').then(m => m.SaudepluplusAgendaExameModule),
      },
      {
        path: 'perfil-acesso',
        loadChildren: () => import('./perfil-acesso/perfil-acesso.module').then(m => m.SaudepluplusPerfilAcessoModule),
      },
      {
        path: 'permissao',
        loadChildren: () => import('./permissao/permissao.module').then(m => m.SaudepluplusPermissaoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SaudepluplusEntityModule {}
