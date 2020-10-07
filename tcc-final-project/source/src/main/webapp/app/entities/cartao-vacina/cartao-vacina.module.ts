import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaudepluplusSharedModule } from 'app/shared/shared.module';
import { CartaoVacinaComponent } from './cartao-vacina.component';
import { CartaoVacinaDetailComponent } from './cartao-vacina-detail.component';
import { CartaoVacinaUpdateComponent } from './cartao-vacina-update.component';
import { CartaoVacinaDeleteDialogComponent } from './cartao-vacina-delete-dialog.component';
import { cartaoVacinaRoute } from './cartao-vacina.route';

@NgModule({
  imports: [SaudepluplusSharedModule, RouterModule.forChild(cartaoVacinaRoute)],
  declarations: [CartaoVacinaComponent, CartaoVacinaDetailComponent, CartaoVacinaUpdateComponent, CartaoVacinaDeleteDialogComponent],
  entryComponents: [CartaoVacinaDeleteDialogComponent],
})
export class SaudepluplusCartaoVacinaModule {}
