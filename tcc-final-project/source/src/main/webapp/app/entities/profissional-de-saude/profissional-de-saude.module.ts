import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { ProfissionalDeSaudeComponent } from './profissional-de-saude.component';
import { ProfissionalDeSaudeDetailComponent } from './profissional-de-saude-detail.component';
import { ProfissionalDeSaudeUpdateComponent } from './profissional-de-saude-update.component';
import { ProfissionalDeSaudeDeleteDialogComponent } from './profissional-de-saude-delete-dialog.component';
import { profissionalDeSaudeRoute } from './profissional-de-saude.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(profissionalDeSaudeRoute)],
  declarations: [
    ProfissionalDeSaudeComponent,
    ProfissionalDeSaudeDetailComponent,
    ProfissionalDeSaudeUpdateComponent,
    ProfissionalDeSaudeDeleteDialogComponent,
  ],
  entryComponents: [ProfissionalDeSaudeDeleteDialogComponent],
})
export class SaudepluplusProfissionalDeSaudeModule {}
