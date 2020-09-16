import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICartaoVacina } from 'app/shared/model/cartao-vacina.model';
import { CartaoVacinaService } from './cartao-vacina.service';
import { CartaoVacinaDeleteDialogComponent } from './cartao-vacina-delete-dialog.component';

@Component({
  selector: 'jhi-cartao-vacina',
  templateUrl: './cartao-vacina.component.html',
})
export class CartaoVacinaComponent implements OnInit, OnDestroy {
  cartaoVacinas?: ICartaoVacina[];
  eventSubscriber?: Subscription;

  constructor(
    protected cartaoVacinaService: CartaoVacinaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.cartaoVacinaService.query().subscribe((res: HttpResponse<ICartaoVacina[]>) => (this.cartaoVacinas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCartaoVacinas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICartaoVacina): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCartaoVacinas(): void {
    this.eventSubscriber = this.eventManager.subscribe('cartaoVacinaListModification', () => this.loadAll());
  }

  delete(cartaoVacina: ICartaoVacina): void {
    const modalRef = this.modalService.open(CartaoVacinaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cartaoVacina = cartaoVacina;
  }
}
