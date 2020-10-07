import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClinicaMedica } from 'app/shared/model/clinica-medica.model';
import { ClinicaMedicaService } from './clinica-medica.service';

@Component({
  templateUrl: './clinica-medica-delete-dialog.component.html',
})
export class ClinicaMedicaDeleteDialogComponent {
  clinicaMedica?: IClinicaMedica;

  constructor(
    protected clinicaMedicaService: ClinicaMedicaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.clinicaMedicaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('clinicaMedicaListModification');
      this.activeModal.close();
    });
  }
}
