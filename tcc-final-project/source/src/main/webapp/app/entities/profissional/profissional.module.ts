import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { ProfissionalComponent } from './profissional.component';
import { ProfissionalDetailComponent } from './profissional-detail.component';
import { ProfissionalUpdateComponent } from './profissional-update.component';
import { ProfissionalDeleteDialogComponent } from './profissional-delete-dialog.component';
import { profissionalRoute } from './profissional.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(profissionalRoute)],
  declarations: [ProfissionalComponent, ProfissionalDetailComponent, ProfissionalUpdateComponent, ProfissionalDeleteDialogComponent],
  entryComponents: [ProfissionalDeleteDialogComponent],
})
export class SaudepluplusProfissionalModule {}
