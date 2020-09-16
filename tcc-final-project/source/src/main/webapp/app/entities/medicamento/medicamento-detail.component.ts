import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedicamento } from 'app/shared/model/medicamento.model';

@Component({
  selector: 'jhi-medicamento-detail',
  templateUrl: './medicamento-detail.component.html',
})
export class MedicamentoDetailComponent implements OnInit {
  medicamento: IMedicamento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medicamento }) => (this.medicamento = medicamento));
  }

  previousState(): void {
    window.history.back();
  }
}
