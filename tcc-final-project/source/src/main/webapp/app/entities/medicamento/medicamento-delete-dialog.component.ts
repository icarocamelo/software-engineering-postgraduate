import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedicamento } from 'app/shared/model/medicamento.model';
import { MedicamentoService } from './medicamento.service';

@Component({
  templateUrl: './medicamento-delete-dialog.component.html',
})
export class MedicamentoDeleteDialogComponent {
  medicamento?: IMedicamento;

  constructor(
    protected medicamentoService: MedicamentoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.medicamentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('medicamentoListModification');
      this.activeModal.close();
    });
  }
}
