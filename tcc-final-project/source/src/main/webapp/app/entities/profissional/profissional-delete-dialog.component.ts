import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfissional } from 'app/shared/model/profissional.model';
import { ProfissionalService } from './profissional.service';

@Component({
  templateUrl: './profissional-delete-dialog.component.html',
})
export class ProfissionalDeleteDialogComponent {
  profissional?: IProfissional;

  constructor(
    protected profissionalService: ProfissionalService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.profissionalService.delete(id).subscribe(() => {
      this.eventManager.broadcast('profissionalListModification');
      this.activeModal.close();
    });
  }
}
