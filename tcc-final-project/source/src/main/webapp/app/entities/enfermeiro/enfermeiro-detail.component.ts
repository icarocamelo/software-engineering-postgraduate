import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEnfermeiro } from 'app/shared/model/enfermeiro.model';

@Component({
  selector: 'jhi-enfermeiro-detail',
  templateUrl: './enfermeiro-detail.component.html',
})
export class EnfermeiroDetailComponent implements OnInit {
  enfermeiro: IEnfermeiro | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ enfermeiro }) => (this.enfermeiro = enfermeiro));
  }

  previousState(): void {
    window.history.back();
  }
}
