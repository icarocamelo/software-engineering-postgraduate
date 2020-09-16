import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { AgendaExameComponent } from './agenda-exame.component';
import { AgendaExameDetailComponent } from './agenda-exame-detail.component';
import { AgendaExameUpdateComponent } from './agenda-exame-update.component';
import { AgendaExameDeleteDialogComponent } from './agenda-exame-delete-dialog.component';
import { agendaExameRoute } from './agenda-exame.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(agendaExameRoute)],
  declarations: [AgendaExameComponent, AgendaExameDetailComponent, AgendaExameUpdateComponent, AgendaExameDeleteDialogComponent],
  entryComponents: [AgendaExameDeleteDialogComponent],
})
export class SaudepluplusAgendaExameModule {}
