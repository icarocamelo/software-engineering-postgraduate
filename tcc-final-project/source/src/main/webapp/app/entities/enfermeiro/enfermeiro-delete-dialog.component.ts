import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEnfermeiro } from 'app/shared/model/enfermeiro.model';
import { EnfermeiroService } from './enfermeiro.service';

@Component({
  templateUrl: './enfermeiro-delete-dialog.component.html',
})
export class EnfermeiroDeleteDialogComponent {
  enfermeiro?: IEnfermeiro;

  constructor(
    protected enfermeiroService: EnfermeiroService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.enfermeiroService.delete(id).subscribe(() => {
      this.eventManager.broadcast('enfermeiroListModification');
      this.activeModal.close();
    });
  }
}
