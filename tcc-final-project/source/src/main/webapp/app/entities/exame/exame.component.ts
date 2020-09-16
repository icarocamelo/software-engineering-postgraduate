import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExame } from 'app/shared/model/exame.model';
import { ExameService } from './exame.service';
import { ExameDeleteDialogComponent } from './exame-delete-dialog.component';

@Component({
  selector: 'jhi-exame',
  templateUrl: './exame.component.html',
})
export class ExameComponent implements OnInit, OnDestroy {
  exames?: IExame[];
  eventSubscriber?: Subscription;

  constructor(protected exameService: ExameService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.exameService.query().subscribe((res: HttpResponse<IExame[]>) => (this.exames = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExames();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExame): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInExames(): void {
    this.eventSubscriber = this.eventManager.subscribe('exameListModification', () => this.loadAll());
  }

  delete(exame: IExame): void {
    const modalRef = this.modalService.open(ExameDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.exame = exame;
  }
}
