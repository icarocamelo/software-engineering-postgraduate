import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { AgendaConsultaComponent } from './agenda-consulta.component';
import { AgendaConsultaDetailComponent } from './agenda-consulta-detail.component';
import { AgendaConsultaUpdateComponent } from './agenda-consulta-update.component';
import { AgendaConsultaDeleteDialogComponent } from './agenda-consulta-delete-dialog.component';
import { agendaConsultaRoute } from './agenda-consulta.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(agendaConsultaRoute)],
  declarations: [
    AgendaConsultaComponent,
    AgendaConsultaDetailComponent,
    AgendaConsultaUpdateComponent,
    AgendaConsultaDeleteDialogComponent,
  ],
  entryComponents: [AgendaConsultaDeleteDialogComponent],
})
export class SaudepluplusAgendaConsultaModule {}
