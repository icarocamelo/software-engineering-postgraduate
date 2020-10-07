import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsulta } from 'app/shared/model/consulta.model';
import { ConsultaService } from './consulta.service';
import { ConsultaDeleteDialogComponent } from './consulta-delete-dialog.component';

@Component({
  selector: 'jhi-consulta',
  templateUrl: './consulta.component.html',
})
export class ConsultaComponent implements OnInit, OnDestroy {
  consultas?: IConsulta[];
  eventSubscriber?: Subscription;

  constructor(protected consultaService: ConsultaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.consultaService.query().subscribe((res: HttpResponse<IConsulta[]>) => (this.consultas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInConsultas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IConsulta): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInConsultas(): void {
    this.eventSubscriber = this.eventManager.subscribe('consultaListModification', () => this.loadAll());
  }

  delete(consulta: IConsulta): void {
    const modalRef = this.modalService.open(ConsultaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.consulta = consulta;
  }
}
