import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUnidadeSaude } from 'app/shared/model/unidade-saude.model';
import { UnidadeSaudeService } from './unidade-saude.service';

@Component({
  templateUrl: './unidade-saude-delete-dialog.component.html',
})
export class UnidadeSaudeDeleteDialogComponent {
  unidadeSaude?: IUnidadeSaude;

  constructor(
    protected unidadeSaudeService: UnidadeSaudeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.unidadeSaudeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('unidadeSaudeListModification');
      this.activeModal.close();
    });
  }
}
