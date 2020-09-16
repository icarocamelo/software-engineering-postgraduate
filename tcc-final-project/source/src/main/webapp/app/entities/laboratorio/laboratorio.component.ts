import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILaboratorio } from 'app/shared/model/laboratorio.model';
import { LaboratorioService } from './laboratorio.service';
import { LaboratorioDeleteDialogComponent } from './laboratorio-delete-dialog.component';

@Component({
  selector: 'jhi-laboratorio',
  templateUrl: './laboratorio.component.html',
})
export class LaboratorioComponent implements OnInit, OnDestroy {
  laboratorios?: ILaboratorio[];
  eventSubscriber?: Subscription;

  constructor(
    protected laboratorioService: LaboratorioService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.laboratorioService.query().subscribe((res: HttpResponse<ILaboratorio[]>) => (this.laboratorios = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLaboratorios();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILaboratorio): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLaboratorios(): void {
    this.eventSubscriber = this.eventManager.subscribe('laboratorioListModification', () => this.loadAll());
  }

  delete(laboratorio: ILaboratorio): void {
    const modalRef = this.modalService.open(LaboratorioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.laboratorio = laboratorio;
  }
}
