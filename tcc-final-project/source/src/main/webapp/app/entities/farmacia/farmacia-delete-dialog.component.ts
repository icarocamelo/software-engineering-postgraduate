import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFarmacia } from 'app/shared/model/farmacia.model';
import { FarmaciaService } from './farmacia.service';

@Component({
  templateUrl: './farmacia-delete-dialog.component.html',
})
export class FarmaciaDeleteDialogComponent {
  farmacia?: IFarmacia;

  constructor(protected farmaciaService: FarmaciaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.farmaciaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('farmaciaListModification');
      this.activeModal.close();
    });
  }
}
