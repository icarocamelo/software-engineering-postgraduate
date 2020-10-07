import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { ProcedimentoComponent } from './procedimento.component';
import { ProcedimentoDetailComponent } from './procedimento-detail.component';
import { ProcedimentoUpdateComponent } from './procedimento-update.component';
import { ProcedimentoDeleteDialogComponent } from './procedimento-delete-dialog.component';
import { procedimentoRoute } from './procedimento.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(procedimentoRoute)],
  declarations: [ProcedimentoComponent, ProcedimentoDetailComponent, ProcedimentoUpdateComponent, ProcedimentoDeleteDialogComponent],
  entryComponents: [ProcedimentoDeleteDialogComponent],
})
export class SaudepluplusProcedimentoModule {}
