import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProntuario } from 'app/shared/model/prontuario.model';
import { ProntuarioService } from './prontuario.service';
import { ProntuarioDeleteDialogComponent } from './prontuario-delete-dialog.component';

@Component({
  selector: 'jhi-prontuario',
  templateUrl: './prontuario.component.html',
})
export class ProntuarioComponent implements OnInit, OnDestroy {
  prontuarios?: IProntuario[];
  eventSubscriber?: Subscription;

  constructor(protected prontuarioService: ProntuarioService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.prontuarioService.query().subscribe((res: HttpResponse<IProntuario[]>) => (this.prontuarios = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProntuarios();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProntuario): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProntuarios(): void {
    this.eventSubscriber = this.eventManager.subscribe('prontuarioListModification', () => this.loadAll());
  }

  delete(prontuario: IProntuario): void {
    const modalRef = this.modalService.open(ProntuarioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.prontuario = prontuario;
  }
}
