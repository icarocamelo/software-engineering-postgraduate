import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { LaboratorioComponent } from './laboratorio.component';
import { LaboratorioDetailComponent } from './laboratorio-detail.component';
import { LaboratorioUpdateComponent } from './laboratorio-update.component';
import { LaboratorioDeleteDialogComponent } from './laboratorio-delete-dialog.component';
import { laboratorioRoute } from './laboratorio.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(laboratorioRoute)],
  declarations: [LaboratorioComponent, LaboratorioDetailComponent, LaboratorioUpdateComponent, LaboratorioDeleteDialogComponent],
  entryComponents: [LaboratorioDeleteDialogComponent],
})
export class SaudepluplusLaboratorioModule {}
