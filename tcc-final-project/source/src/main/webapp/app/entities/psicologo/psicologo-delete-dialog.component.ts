import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPsicologo } from 'app/shared/model/psicologo.model';
import { PsicologoService } from './psicologo.service';

@Component({
  templateUrl: './psicologo-delete-dialog.component.html',
})
export class PsicologoDeleteDialogComponent {
  psicologo?: IPsicologo;

  constructor(protected psicologoService: PsicologoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.psicologoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('psicologoListModification');
      this.activeModal.close();
    });
  }
}
