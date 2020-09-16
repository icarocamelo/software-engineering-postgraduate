import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILeito } from 'app/shared/model/leito.model';
import { LeitoService } from './leito.service';
import { LeitoDeleteDialogComponent } from './leito-delete-dialog.component';

@Component({
  selector: 'jhi-leito',
  templateUrl: './leito.component.html',
})
export class LeitoComponent implements OnInit, OnDestroy {
  leitos?: ILeito[];
  eventSubscriber?: Subscription;

  constructor(protected leitoService: LeitoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.leitoService.query().subscribe((res: HttpResponse<ILeito[]>) => (this.leitos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLeitos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILeito): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLeitos(): void {
    this.eventSubscriber = this.eventManager.subscribe('leitoListModification', () => this.loadAll());
  }

  delete(leito: ILeito): void {
    const modalRef = this.modalService.open(LeitoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.leito = leito;
  }
}
