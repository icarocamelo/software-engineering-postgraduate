import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { PostoDeSaudeComponent } from './posto-de-saude.component';
import { PostoDeSaudeDetailComponent } from './posto-de-saude-detail.component';
import { PostoDeSaudeUpdateComponent } from './posto-de-saude-update.component';
import { PostoDeSaudeDeleteDialogComponent } from './posto-de-saude-delete-dialog.component';
import { postoDeSaudeRoute } from './posto-de-saude.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(postoDeSaudeRoute)],
  declarations: [PostoDeSaudeComponent, PostoDeSaudeDetailComponent, PostoDeSaudeUpdateComponent, PostoDeSaudeDeleteDialogComponent],
  entryComponents: [PostoDeSaudeDeleteDialogComponent],
})
export class SaudepluplusPostoDeSaudeModule {}
