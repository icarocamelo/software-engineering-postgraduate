import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfissionalDeSaude } from 'app/shared/model/profissional-de-saude.model';
import { ProfissionalDeSaudeService } from './profissional-de-saude.service';

@Component({
  templateUrl: './profissional-de-saude-delete-dialog.component.html',
})
export class ProfissionalDeSaudeDeleteDialogComponent {
  profissionalDeSaude?: IProfissionalDeSaude;

  constructor(
    protected profissionalDeSaudeService: ProfissionalDeSaudeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.profissionalDeSaudeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('profissionalDeSaudeListModification');
      this.activeModal.close();
    });
  }
}
