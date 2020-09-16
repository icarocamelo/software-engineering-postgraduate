import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConsulta } from 'app/shared/model/consulta.model';
import { ConsultaService } from './consulta.service';

@Component({
  templateUrl: './consulta-delete-dialog.component.html',
})
export class ConsultaDeleteDialogComponent {
  consulta?: IConsulta;

  constructor(protected consultaService: ConsultaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.consultaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('consultaListModification');
      this.activeModal.close();
    });
  }
}
