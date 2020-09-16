import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPerfilAcesso } from 'app/shared/model/perfil-acesso.model';
import { PerfilAcessoService } from './perfil-acesso.service';
import { PerfilAcessoDeleteDialogComponent } from './perfil-acesso-delete-dialog.component';

@Component({
  selector: 'jhi-perfil-acesso',
  templateUrl: './perfil-acesso.component.html',
})
export class PerfilAcessoComponent implements OnInit, OnDestroy {
  perfilAcessos?: IPerfilAcesso[];
  eventSubscriber?: Subscription;

  constructor(
    protected perfilAcessoService: PerfilAcessoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.perfilAcessoService.query().subscribe((res: HttpResponse<IPerfilAcesso[]>) => (this.perfilAcessos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPerfilAcessos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPerfilAcesso): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPerfilAcessos(): void {
    this.eventSubscriber = this.eventManager.subscribe('perfilAcessoListModification', () => this.loadAll());
  }

  delete(perfilAcesso: IPerfilAcesso): void {
    const modalRef = this.modalService.open(PerfilAcessoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.perfilAcesso = perfilAcesso;
  }
}
