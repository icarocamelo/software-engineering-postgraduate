import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { EnfermeiroComponent } from './enfermeiro.component';
import { EnfermeiroDetailComponent } from './enfermeiro-detail.component';
import { EnfermeiroUpdateComponent } from './enfermeiro-update.component';
import { EnfermeiroDeleteDialogComponent } from './enfermeiro-delete-dialog.component';
import { enfermeiroRoute } from './enfermeiro.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(enfermeiroRoute)],
  declarations: [EnfermeiroComponent, EnfermeiroDetailComponent, EnfermeiroUpdateComponent, EnfermeiroDeleteDialogComponent],
  entryComponents: [EnfermeiroDeleteDialogComponent],
})
export class SaudepluplusEnfermeiroModule {}
