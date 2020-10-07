import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { PermissaoComponent } from './permissao.component';
import { PermissaoDetailComponent } from './permissao-detail.component';
import { PermissaoUpdateComponent } from './permissao-update.component';
import { PermissaoDeleteDialogComponent } from './permissao-delete-dialog.component';
import { permissaoRoute } from './permissao.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(permissaoRoute)],
  declarations: [PermissaoComponent, PermissaoDetailComponent, PermissaoUpdateComponent, PermissaoDeleteDialogComponent],
  entryComponents: [PermissaoDeleteDialogComponent],
})
export class SaudepluplusPermissaoModule {}
