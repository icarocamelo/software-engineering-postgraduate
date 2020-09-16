import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAgendaExame } from 'app/shared/model/agenda-exame.model';
import { AgendaExameService } from './agenda-exame.service';
import { AgendaExameDeleteDialogComponent } from './agenda-exame-delete-dialog.component';

@Component({
  selector: 'jhi-agenda-exame',
  templateUrl: './agenda-exame.component.html',
})
export class AgendaExameComponent implements OnInit, OnDestroy {
  agendaExames?: IAgendaExame[];
  eventSubscriber?: Subscription;

  constructor(
    protected agendaExameService: AgendaExameService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.agendaExameService.query().subscribe((res: HttpResponse<IAgendaExame[]>) => (this.agendaExames = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAgendaExames();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAgendaExame): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAgendaExames(): void {
    this.eventSubscriber = this.eventManager.subscribe('agendaExameListModification', () => this.loadAll());
  }

  delete(agendaExame: IAgendaExame): void {
    const modalRef = this.modalService.open(AgendaExameDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.agendaExame = agendaExame;
  }
}
