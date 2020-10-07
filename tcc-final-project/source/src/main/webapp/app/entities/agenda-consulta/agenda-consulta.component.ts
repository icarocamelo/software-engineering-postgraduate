import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAgendaConsulta } from 'app/shared/model/agenda-consulta.model';
import { AgendaConsultaService } from './agenda-consulta.service';
import { AgendaConsultaDeleteDialogComponent } from './agenda-consulta-delete-dialog.component';

@Component({
  selector: 'jhi-agenda-consulta',
  templateUrl: './agenda-consulta.component.html',
})
export class AgendaConsultaComponent implements OnInit, OnDestroy {
  agendaConsultas?: IAgendaConsulta[];
  eventSubscriber?: Subscription;

  constructor(
    protected agendaConsultaService: AgendaConsultaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.agendaConsultaService.query().subscribe((res: HttpResponse<IAgendaConsulta[]>) => (this.agendaConsultas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAgendaConsultas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAgendaConsulta): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAgendaConsultas(): void {
    this.eventSubscriber = this.eventManager.subscribe('agendaConsultaListModification', () => this.loadAll());
  }

  delete(agendaConsulta: IAgendaConsulta): void {
    const modalRef = this.modalService.open(AgendaConsultaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.agendaConsulta = agendaConsulta;
  }
}
