import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProntuario } from 'app/shared/model/prontuario.model';
import { ProntuarioService } from './prontuario.service';

@Component({
  templateUrl: './prontuario-delete-dialog.component.html',
})
export class ProntuarioDeleteDialogComponent {
  prontuario?: IProntuario;

  constructor(
    protected prontuarioService: ProntuarioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.prontuarioService.delete(id).subscribe(() => {
      this.eventManager.broadcast('prontuarioListModification');
      this.activeModal.close();
    });
  }
}
