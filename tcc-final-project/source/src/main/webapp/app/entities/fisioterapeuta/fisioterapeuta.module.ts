import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { FisioterapeutaComponent } from './fisioterapeuta.component';
import { FisioterapeutaDetailComponent } from './fisioterapeuta-detail.component';
import { FisioterapeutaUpdateComponent } from './fisioterapeuta-update.component';
import { FisioterapeutaDeleteDialogComponent } from './fisioterapeuta-delete-dialog.component';
import { fisioterapeutaRoute } from './fisioterapeuta.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(fisioterapeutaRoute)],
  declarations: [
    FisioterapeutaComponent,
    FisioterapeutaDetailComponent,
    FisioterapeutaUpdateComponent,
    FisioterapeutaDeleteDialogComponent,
  ],
  entryComponents: [FisioterapeutaDeleteDialogComponent],
})
export class SaudepluplusFisioterapeutaModule {}
