import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFisioterapeuta } from 'app/shared/model/fisioterapeuta.model';
import { FisioterapeutaService } from './fisioterapeuta.service';
import { FisioterapeutaDeleteDialogComponent } from './fisioterapeuta-delete-dialog.component';

@Component({
  selector: 'jhi-fisioterapeuta',
  templateUrl: './fisioterapeuta.component.html',
})
export class FisioterapeutaComponent implements OnInit, OnDestroy {
  fisioterapeutas?: IFisioterapeuta[];
  eventSubscriber?: Subscription;

  constructor(
    protected fisioterapeutaService: FisioterapeutaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.fisioterapeutaService.query().subscribe((res: HttpResponse<IFisioterapeuta[]>) => (this.fisioterapeutas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFisioterapeutas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFisioterapeuta): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFisioterapeutas(): void {
    this.eventSubscriber = this.eventManager.subscribe('fisioterapeutaListModification', () => this.loadAll());
  }

  delete(fisioterapeuta: IFisioterapeuta): void {
    const modalRef = this.modalService.open(FisioterapeutaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fisioterapeuta = fisioterapeuta;
  }
}
