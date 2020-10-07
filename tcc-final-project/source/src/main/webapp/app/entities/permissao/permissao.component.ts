import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPermissao } from 'app/shared/model/permissao.model';
import { PermissaoService } from './permissao.service';
import { PermissaoDeleteDialogComponent } from './permissao-delete-dialog.component';

@Component({
  selector: 'jhi-permissao',
  templateUrl: './permissao.component.html',
})
export class PermissaoComponent implements OnInit, OnDestroy {
  permissaos?: IPermissao[];
  eventSubscriber?: Subscription;

  constructor(protected permissaoService: PermissaoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.permissaoService.query().subscribe((res: HttpResponse<IPermissao[]>) => (this.permissaos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPermissaos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPermissao): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPermissaos(): void {
    this.eventSubscriber = this.eventManager.subscribe('permissaoListModification', () => this.loadAll());
  }

  delete(permissao: IPermissao): void {
    const modalRef = this.modalService.open(PermissaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.permissao = permissao;
  }
}
