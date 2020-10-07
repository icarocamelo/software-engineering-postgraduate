import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { FarmaciaComponent } from './farmacia.component';
import { FarmaciaDetailComponent } from './farmacia-detail.component';
import { FarmaciaUpdateComponent } from './farmacia-update.component';
import { FarmaciaDeleteDialogComponent } from './farmacia-delete-dialog.component';
import { farmaciaRoute } from './farmacia.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(farmaciaRoute)],
  declarations: [FarmaciaComponent, FarmaciaDetailComponent, FarmaciaUpdateComponent, FarmaciaDeleteDialogComponent],
  entryComponents: [FarmaciaDeleteDialogComponent],
})
export class SaudepluplusFarmaciaModule {}
