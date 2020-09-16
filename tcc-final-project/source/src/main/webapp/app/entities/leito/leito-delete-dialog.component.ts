import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILeito } from 'app/shared/model/leito.model';
import { LeitoService } from './leito.service';

@Component({
  templateUrl: './leito-delete-dialog.component.html',
})
export class LeitoDeleteDialogComponent {
  leito?: ILeito;

  constructor(protected leitoService: LeitoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.leitoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('leitoListModification');
      this.activeModal.close();
    });
  }
}
