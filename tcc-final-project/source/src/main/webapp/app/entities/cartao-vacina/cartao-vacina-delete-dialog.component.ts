import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICartaoVacina } from 'app/shared/model/cartao-vacina.model';
import { CartaoVacinaService } from './cartao-vacina.service';

@Component({
  templateUrl: './cartao-vacina-delete-dialog.component.html',
})
export class CartaoVacinaDeleteDialogComponent {
  cartaoVacina?: ICartaoVacina;

  constructor(
    protected cartaoVacinaService: CartaoVacinaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cartaoVacinaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cartaoVacinaListModification');
      this.activeModal.close();
    });
  }
}
