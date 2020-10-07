import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { UnidadeSaudeComponent } from './unidade-saude.component';
import { UnidadeSaudeDetailComponent } from './unidade-saude-detail.component';
import { UnidadeSaudeUpdateComponent } from './unidade-saude-update.component';
import { UnidadeSaudeDeleteDialogComponent } from './unidade-saude-delete-dialog.component';
import { unidadeSaudeRoute } from './unidade-saude.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(unidadeSaudeRoute)],
  declarations: [UnidadeSaudeComponent, UnidadeSaudeDetailComponent, UnidadeSaudeUpdateComponent, UnidadeSaudeDeleteDialogComponent],
  entryComponents: [UnidadeSaudeDeleteDialogComponent],
})
export class SaudepluplusUnidadeSaudeModule {}
