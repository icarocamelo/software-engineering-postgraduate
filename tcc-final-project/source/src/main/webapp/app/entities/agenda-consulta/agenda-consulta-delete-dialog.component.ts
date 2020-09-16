import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgendaConsulta } from 'app/shared/model/agenda-consulta.model';
import { AgendaConsultaService } from './agenda-consulta.service';

@Component({
  templateUrl: './agenda-consulta-delete-dialog.component.html',
})
export class AgendaConsultaDeleteDialogComponent {
  agendaConsulta?: IAgendaConsulta;

  constructor(
    protected agendaConsultaService: AgendaConsultaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.agendaConsultaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('agendaConsultaListModification');
      this.activeModal.close();
    });
  }
}
