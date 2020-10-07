import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEnfermeiro } from 'app/shared/model/enfermeiro.model';
import { EnfermeiroService } from './enfermeiro.service';
import { EnfermeiroDeleteDialogComponent } from './enfermeiro-delete-dialog.component';

@Component({
  selector: 'jhi-enfermeiro',
  templateUrl: './enfermeiro.component.html',
})
export class EnfermeiroComponent implements OnInit, OnDestroy {
  enfermeiros?: IEnfermeiro[];
  eventSubscriber?: Subscription;

  constructor(protected enfermeiroService: EnfermeiroService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.enfermeiroService.query().subscribe((res: HttpResponse<IEnfermeiro[]>) => (this.enfermeiros = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEnfermeiros();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEnfermeiro): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEnfermeiros(): void {
    this.eventSubscriber = this.eventManager.subscribe('enfermeiroListModification', () => this.loadAll());
  }

  delete(enfermeiro: IEnfermeiro): void {
    const modalRef = this.modalService.open(EnfermeiroDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.enfermeiro = enfermeiro;
  }
}
