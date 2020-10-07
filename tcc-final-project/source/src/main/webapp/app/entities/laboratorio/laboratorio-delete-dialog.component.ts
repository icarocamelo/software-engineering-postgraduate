import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILaboratorio } from 'app/shared/model/laboratorio.model';
import { LaboratorioService } from './laboratorio.service';

@Component({
  templateUrl: './laboratorio-delete-dialog.component.html',
})
export class LaboratorioDeleteDialogComponent {
  laboratorio?: ILaboratorio;

  constructor(
    protected laboratorioService: LaboratorioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.laboratorioService.delete(id).subscribe(() => {
      this.eventManager.broadcast('laboratorioListModification');
      this.activeModal.close();
    });
  }
}
