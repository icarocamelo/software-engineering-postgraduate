import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { ExameComponent } from './exame.component';
import { ExameDetailComponent } from './exame-detail.component';
import { ExameUpdateComponent } from './exame-update.component';
import { ExameDeleteDialogComponent } from './exame-delete-dialog.component';
import { exameRoute } from './exame.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(exameRoute)],
  declarations: [ExameComponent, ExameDetailComponent, ExameUpdateComponent, ExameDeleteDialogComponent],
  entryComponents: [ExameDeleteDialogComponent],
})
export class SaudepluplusExameModule {}
