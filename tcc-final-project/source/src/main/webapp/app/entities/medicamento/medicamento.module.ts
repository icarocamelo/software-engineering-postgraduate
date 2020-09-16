import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { MedicamentoComponent } from './medicamento.component';
import { MedicamentoDetailComponent } from './medicamento-detail.component';
import { MedicamentoUpdateComponent } from './medicamento-update.component';
import { MedicamentoDeleteDialogComponent } from './medicamento-delete-dialog.component';
import { medicamentoRoute } from './medicamento.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(medicamentoRoute)],
  declarations: [MedicamentoComponent, MedicamentoDetailComponent, MedicamentoUpdateComponent, MedicamentoDeleteDialogComponent],
  entryComponents: [MedicamentoDeleteDialogComponent],
})
export class SaudepluplusMedicamentoModule {}
