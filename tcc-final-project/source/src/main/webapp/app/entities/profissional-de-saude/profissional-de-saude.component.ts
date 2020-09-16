import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProfissionalDeSaude } from 'app/shared/model/profissional-de-saude.model';
import { ProfissionalDeSaudeService } from './profissional-de-saude.service';
import { ProfissionalDeSaudeDeleteDialogComponent } from './profissional-de-saude-delete-dialog.component';

@Component({
  selector: 'jhi-profissional-de-saude',
  templateUrl: './profissional-de-saude.component.html',
})
export class ProfissionalDeSaudeComponent implements OnInit, OnDestroy {
  profissionalDeSaudes?: IProfissionalDeSaude[];
  eventSubscriber?: Subscription;

  constructor(
    protected profissionalDeSaudeService: ProfissionalDeSaudeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.profissionalDeSaudeService
      .query()
      .subscribe((res: HttpResponse<IProfissionalDeSaude[]>) => (this.profissionalDeSaudes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProfissionalDeSaudes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProfissionalDeSaude): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProfissionalDeSaudes(): void {
    this.eventSubscriber = this.eventManager.subscribe('profissionalDeSaudeListModification', () => this.loadAll());
  }

  delete(profissionalDeSaude: IProfissionalDeSaude): void {
    const modalRef = this.modalService.open(ProfissionalDeSaudeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.profissionalDeSaude = profissionalDeSaude;
  }
}
