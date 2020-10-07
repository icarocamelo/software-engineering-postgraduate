import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { ClinicaMedicaComponent } from './clinica-medica.component';
import { ClinicaMedicaDetailComponent } from './clinica-medica-detail.component';
import { ClinicaMedicaUpdateComponent } from './clinica-medica-update.component';
import { ClinicaMedicaDeleteDialogComponent } from './clinica-medica-delete-dialog.component';
import { clinicaMedicaRoute } from './clinica-medica.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(clinicaMedicaRoute)],
  declarations: [ClinicaMedicaComponent, ClinicaMedicaDetailComponent, ClinicaMedicaUpdateComponent, ClinicaMedicaDeleteDialogComponent],
  entryComponents: [ClinicaMedicaDeleteDialogComponent],
})
export class SaudepluplusClinicaMedicaModule {}
