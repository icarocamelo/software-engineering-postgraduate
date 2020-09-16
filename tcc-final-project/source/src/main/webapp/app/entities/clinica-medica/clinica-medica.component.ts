import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IClinicaMedica } from 'app/shared/model/clinica-medica.model';
import { ClinicaMedicaService } from './clinica-medica.service';
import { ClinicaMedicaDeleteDialogComponent } from './clinica-medica-delete-dialog.component';

@Component({
  selector: 'jhi-clinica-medica',
  templateUrl: './clinica-medica.component.html',
})
export class ClinicaMedicaComponent implements OnInit, OnDestroy {
  clinicaMedicas?: IClinicaMedica[];
  eventSubscriber?: Subscription;

  constructor(
    protected clinicaMedicaService: ClinicaMedicaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.clinicaMedicaService.query().subscribe((res: HttpResponse<IClinicaMedica[]>) => (this.clinicaMedicas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInClinicaMedicas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IClinicaMedica): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInClinicaMedicas(): void {
    this.eventSubscriber = this.eventManager.subscribe('clinicaMedicaListModification', () => this.loadAll());
  }

  delete(clinicaMedica: IClinicaMedica): void {
    const modalRef = this.modalService.open(ClinicaMedicaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.clinicaMedica = clinicaMedica;
  }
}
