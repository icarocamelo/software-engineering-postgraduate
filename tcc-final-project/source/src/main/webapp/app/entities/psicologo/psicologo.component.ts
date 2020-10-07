import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPsicologo } from 'app/shared/model/psicologo.model';
import { PsicologoService } from './psicologo.service';
import { PsicologoDeleteDialogComponent } from './psicologo-delete-dialog.component';

@Component({
  selector: 'jhi-psicologo',
  templateUrl: './psicologo.component.html',
})
export class PsicologoComponent implements OnInit, OnDestroy {
  psicologos?: IPsicologo[];
  eventSubscriber?: Subscription;

  constructor(protected psicologoService: PsicologoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.psicologoService.query().subscribe((res: HttpResponse<IPsicologo[]>) => (this.psicologos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPsicologos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPsicologo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPsicologos(): void {
    this.eventSubscriber = this.eventManager.subscribe('psicologoListModification', () => this.loadAll());
  }

  delete(psicologo: IPsicologo): void {
    const modalRef = this.modalService.open(PsicologoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.psicologo = psicologo;
  }
}
