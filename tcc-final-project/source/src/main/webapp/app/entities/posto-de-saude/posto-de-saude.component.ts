import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPostoDeSaude } from 'app/shared/model/posto-de-saude.model';
import { PostoDeSaudeService } from './posto-de-saude.service';
import { PostoDeSaudeDeleteDialogComponent } from './posto-de-saude-delete-dialog.component';

@Component({
  selector: 'jhi-posto-de-saude',
  templateUrl: './posto-de-saude.component.html',
})
export class PostoDeSaudeComponent implements OnInit, OnDestroy {
  postoDeSaudes?: IPostoDeSaude[];
  eventSubscriber?: Subscription;

  constructor(
    protected postoDeSaudeService: PostoDeSaudeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.postoDeSaudeService.query().subscribe((res: HttpResponse<IPostoDeSaude[]>) => (this.postoDeSaudes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPostoDeSaudes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPostoDeSaude): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPostoDeSaudes(): void {
    this.eventSubscriber = this.eventManager.subscribe('postoDeSaudeListModification', () => this.loadAll());
  }

  delete(postoDeSaude: IPostoDeSaude): void {
    const modalRef = this.modalService.open(PostoDeSaudeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.postoDeSaude = postoDeSaude;
  }
}
