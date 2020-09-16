import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHospital } from 'app/shared/model/hospital.model';
import { HospitalService } from './hospital.service';
import { HospitalDeleteDialogComponent } from './hospital-delete-dialog.component';

@Component({
  selector: 'jhi-hospital',
  templateUrl: './hospital.component.html',
})
export class HospitalComponent implements OnInit, OnDestroy {
  hospitals?: IHospital[];
  eventSubscriber?: Subscription;

  constructor(protected hospitalService: HospitalService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.hospitalService.query().subscribe((res: HttpResponse<IHospital[]>) => (this.hospitals = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHospitals();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHospital): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHospitals(): void {
    this.eventSubscriber = this.eventManager.subscribe('hospitalListModification', () => this.loadAll());
  }

  delete(hospital: IHospital): void {
    const modalRef = this.modalService.open(HospitalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.hospital = hospital;
  }
}
