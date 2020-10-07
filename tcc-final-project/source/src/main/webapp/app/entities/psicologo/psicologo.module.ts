import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { PsicologoComponent } from './psicologo.component';
import { PsicologoDetailComponent } from './psicologo-detail.component';
import { PsicologoUpdateComponent } from './psicologo-update.component';
import { PsicologoDeleteDialogComponent } from './psicologo-delete-dialog.component';
import { psicologoRoute } from './psicologo.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(psicologoRoute)],
  declarations: [PsicologoComponent, PsicologoDetailComponent, PsicologoUpdateComponent, PsicologoDeleteDialogComponent],
  entryComponents: [PsicologoDeleteDialogComponent],
})
export class SaudepluplusPsicologoModule {}
