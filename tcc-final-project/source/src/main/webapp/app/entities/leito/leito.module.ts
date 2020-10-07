import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { LeitoComponent } from './leito.component';
import { LeitoDetailComponent } from './leito-detail.component';
import { LeitoUpdateComponent } from './leito-update.component';
import { LeitoDeleteDialogComponent } from './leito-delete-dialog.component';
import { leitoRoute } from './leito.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(leitoRoute)],
  declarations: [LeitoComponent, LeitoDetailComponent, LeitoUpdateComponent, LeitoDeleteDialogComponent],
  entryComponents: [LeitoDeleteDialogComponent],
})
export class SaudepluplusLeitoModule {}
