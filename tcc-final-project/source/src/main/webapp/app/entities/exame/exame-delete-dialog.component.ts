import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExame } from 'app/shared/model/exame.model';
import { ExameService } from './exame.service';

@Component({
  templateUrl: './exame-delete-dialog.component.html',
})
export class ExameDeleteDialogComponent {
  exame?: IExame;

  constructor(protected exameService: ExameService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.exameService.delete(id).subscribe(() => {
      this.eventManager.broadcast('exameListModification');
      this.activeModal.close();
    });
  }
}
