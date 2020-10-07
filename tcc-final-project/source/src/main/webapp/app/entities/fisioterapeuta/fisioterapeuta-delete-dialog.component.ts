import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFisioterapeuta } from 'app/shared/model/fisioterapeuta.model';
import { FisioterapeutaService } from './fisioterapeuta.service';

@Component({
  templateUrl: './fisioterapeuta-delete-dialog.component.html',
})
export class FisioterapeutaDeleteDialogComponent {
  fisioterapeuta?: IFisioterapeuta;

  constructor(
    protected fisioterapeutaService: FisioterapeutaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fisioterapeutaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fisioterapeutaListModification');
      this.activeModal.close();
    });
  }
}
