import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPostoDeSaude } from 'app/shared/model/posto-de-saude.model';
import { PostoDeSaudeService } from './posto-de-saude.service';

@Component({
  templateUrl: './posto-de-saude-delete-dialog.component.html',
})
export class PostoDeSaudeDeleteDialogComponent {
  postoDeSaude?: IPostoDeSaude;

  constructor(
    protected postoDeSaudeService: PostoDeSaudeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.postoDeSaudeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('postoDeSaudeListModification');
      this.activeModal.close();
    });
  }
}
