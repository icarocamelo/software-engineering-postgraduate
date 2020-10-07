import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProcedimento } from 'app/shared/model/procedimento.model';
import { ProcedimentoService } from './procedimento.service';
import { ProcedimentoDeleteDialogComponent } from './procedimento-delete-dialog.component';

@Component({
  selector: 'jhi-procedimento',
  templateUrl: './procedimento.component.html',
})
export class ProcedimentoComponent implements OnInit, OnDestroy {
  procedimentos?: IProcedimento[];
  eventSubscriber?: Subscription;

  constructor(
    protected procedimentoService: ProcedimentoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.procedimentoService.query().subscribe((res: HttpResponse<IProcedimento[]>) => (this.procedimentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProcedimentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProcedimento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProcedimentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('procedimentoListModification', () => this.loadAll());
  }

  delete(procedimento: IProcedimento): void {
    const modalRef = this.modalService.open(ProcedimentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.procedimento = procedimento;
  }
}
