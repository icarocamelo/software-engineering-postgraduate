import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { AgendaComponent } from './agenda.component';
import { AgendaDetailComponent } from './agenda-detail.component';
import { AgendaUpdateComponent } from './agenda-update.component';
import { AgendaDeleteDialogComponent } from './agenda-delete-dialog.component';
import { agendaRoute } from './agenda.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(agendaRoute)],
  declarations: [AgendaComponent, AgendaDetailComponent, AgendaUpdateComponent, AgendaDeleteDialogComponent],
  entryComponents: [AgendaDeleteDialogComponent],
})
export class SaudepluplusAgendaModule {}
