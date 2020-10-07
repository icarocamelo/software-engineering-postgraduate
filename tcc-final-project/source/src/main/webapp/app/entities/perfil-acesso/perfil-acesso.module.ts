import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { PerfilAcessoComponent } from './perfil-acesso.component';
import { PerfilAcessoDetailComponent } from './perfil-acesso-detail.component';
import { PerfilAcessoUpdateComponent } from './perfil-acesso-update.component';
import { PerfilAcessoDeleteDialogComponent } from './perfil-acesso-delete-dialog.component';
import { perfilAcessoRoute } from './perfil-acesso.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(perfilAcessoRoute)],
  declarations: [PerfilAcessoComponent, PerfilAcessoDetailComponent, PerfilAcessoUpdateComponent, PerfilAcessoDeleteDialogComponent],
  entryComponents: [PerfilAcessoDeleteDialogComponent],
})
export class SaudepluplusPerfilAcessoModule {}
