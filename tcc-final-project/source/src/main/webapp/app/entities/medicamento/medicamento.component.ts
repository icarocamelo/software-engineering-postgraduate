import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedicamento } from 'app/shared/model/medicamento.model';
import { MedicamentoService } from './medicamento.service';
import { MedicamentoDeleteDialogComponent } from './medicamento-delete-dialog.component';

@Component({
  selector: 'jhi-medicamento',
  templateUrl: './medicamento.component.html',
})
export class MedicamentoComponent implements OnInit, OnDestroy {
  medicamentos?: IMedicamento[];
  eventSubscriber?: Subscription;

  constructor(
    protected medicamentoService: MedicamentoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.medicamentoService.query().subscribe((res: HttpResponse<IMedicamento[]>) => (this.medicamentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMedicamentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMedicamento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMedicamentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('medicamentoListModification', () => this.loadAll());
  }

  delete(medicamento: IMedicamento): void {
    const modalRef = this.modalService.open(MedicamentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.medicamento = medicamento;
  }
}
