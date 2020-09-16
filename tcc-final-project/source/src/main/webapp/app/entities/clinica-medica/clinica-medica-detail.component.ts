import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClinicaMedica } from 'app/shared/model/clinica-medica.model';

@Component({
  selector: 'jhi-clinica-medica-detail',
  templateUrl: './clinica-medica-detail.component.html',
})
export class ClinicaMedicaDetailComponent implements OnInit {
  clinicaMedica: IClinicaMedica | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clinicaMedica }) => (this.clinicaMedica = clinicaMedica));
  }

  previousState(): void {
    window.history.back();
  }
}
