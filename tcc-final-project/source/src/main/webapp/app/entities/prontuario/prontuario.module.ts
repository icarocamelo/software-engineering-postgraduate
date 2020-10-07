import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { ProntuarioComponent } from './prontuario.component';
import { ProntuarioDetailComponent } from './prontuario-detail.component';
import { ProntuarioUpdateComponent } from './prontuario-update.component';
import { ProntuarioDeleteDialogComponent } from './prontuario-delete-dialog.component';
import { prontuarioRoute } from './prontuario.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(prontuarioRoute)],
  declarations: [ProntuarioComponent, ProntuarioDetailComponent, ProntuarioUpdateComponent, ProntuarioDeleteDialogComponent],
  entryComponents: [ProntuarioDeleteDialogComponent],
})
export class SaudepluplusProntuarioModule {}
