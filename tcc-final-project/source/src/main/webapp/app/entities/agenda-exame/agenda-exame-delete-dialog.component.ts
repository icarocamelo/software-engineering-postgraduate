import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgendaExame } from 'app/shared/model/agenda-exame.model';
import { AgendaExameService } from './agenda-exame.service';

@Component({
  templateUrl: './agenda-exame-delete-dialog.component.html',
})
export class AgendaExameDeleteDialogComponent {
  agendaExame?: IAgendaExame;

  constructor(
    protected agendaExameService: AgendaExameService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.agendaExameService.delete(id).subscribe(() => {
      this.eventManager.broadcast('agendaExameListModification');
      this.activeModal.close();
    });
  }
}
