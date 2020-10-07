import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFarmacia } from 'app/shared/model/farmacia.model';
import { FarmaciaService } from './farmacia.service';
import { FarmaciaDeleteDialogComponent } from './farmacia-delete-dialog.component';

@Component({
  selector: 'jhi-farmacia',
  templateUrl: './farmacia.component.html',
})
export class FarmaciaComponent implements OnInit, OnDestroy {
  farmacias?: IFarmacia[];
  eventSubscriber?: Subscription;

  constructor(protected farmaciaService: FarmaciaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.farmaciaService.query().subscribe((res: HttpResponse<IFarmacia[]>) => (this.farmacias = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFarmacias();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFarmacia): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFarmacias(): void {
    this.eventSubscriber = this.eventManager.subscribe('farmaciaListModification', () => this.loadAll());
  }

  delete(farmacia: IFarmacia): void {
    const modalRef = this.modalService.open(FarmaciaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.farmacia = farmacia;
  }
}
