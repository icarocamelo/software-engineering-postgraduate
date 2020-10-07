import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProcedimento } from 'app/shared/model/procedimento.model';
import { ProcedimentoService } from './procedimento.service';

@Component({
  templateUrl: './procedimento-delete-dialog.component.html',
})
export class ProcedimentoDeleteDialogComponent {
  procedimento?: IProcedimento;

  constructor(
    protected procedimentoService: ProcedimentoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.procedimentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('procedimentoListModification');
      this.activeModal.close();
    });
  }
}
