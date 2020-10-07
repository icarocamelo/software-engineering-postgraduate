import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPermissao } from 'app/shared/model/permissao.model';
import { PermissaoService } from './permissao.service';

@Component({
  templateUrl: './permissao-delete-dialog.component.html',
})
export class PermissaoDeleteDialogComponent {
  permissao?: IPermissao;

  constructor(protected permissaoService: PermissaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.permissaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('permissaoListModification');
      this.activeModal.close();
    });
  }
}
