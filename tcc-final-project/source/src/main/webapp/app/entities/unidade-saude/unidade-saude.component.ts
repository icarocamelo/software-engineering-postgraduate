import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUnidadeSaude } from 'app/shared/model/unidade-saude.model';
import { UnidadeSaudeService } from './unidade-saude.service';
import { UnidadeSaudeDeleteDialogComponent } from './unidade-saude-delete-dialog.component';

@Component({
  selector: 'jhi-unidade-saude',
  templateUrl: './unidade-saude.component.html',
})
export class UnidadeSaudeComponent implements OnInit, OnDestroy {
  unidadeSaudes?: IUnidadeSaude[];
  eventSubscriber?: Subscription;

  constructor(
    protected unidadeSaudeService: UnidadeSaudeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.unidadeSaudeService.query().subscribe((res: HttpResponse<IUnidadeSaude[]>) => (this.unidadeSaudes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUnidadeSaudes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUnidadeSaude): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUnidadeSaudes(): void {
    this.eventSubscriber = this.eventManager.subscribe('unidadeSaudeListModification', () => this.loadAll());
  }

  delete(unidadeSaude: IUnidadeSaude): void {
    const modalRef = this.modalService.open(UnidadeSaudeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.unidadeSaude = unidadeSaude;
  }
}
