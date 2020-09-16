import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProfissional } from 'app/shared/model/profissional.model';
import { ProfissionalService } from './profissional.service';
import { ProfissionalDeleteDialogComponent } from './profissional-delete-dialog.component';

@Component({
  selector: 'jhi-profissional',
  templateUrl: './profissional.component.html',
})
export class ProfissionalComponent implements OnInit, OnDestroy {
  profissionals?: IProfissional[];
  eventSubscriber?: Subscription;

  constructor(
    protected profissionalService: ProfissionalService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.profissionalService.query().subscribe((res: HttpResponse<IProfissional[]>) => (this.profissionals = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProfissionals();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProfissional): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProfissionals(): void {
    this.eventSubscriber = this.eventManager.subscribe('profissionalListModification', () => this.loadAll());
  }

  delete(profissional: IProfissional): void {
    const modalRef = this.modalService.open(ProfissionalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.profissional = profissional;
  }
}
