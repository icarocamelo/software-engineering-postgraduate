import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPsicologo } from 'app/shared/model/psicologo.model';

@Component({
  selector: 'jhi-psicologo-detail',
  templateUrl: './psicologo-detail.component.html',
})
export class PsicologoDetailComponent implements OnInit {
  psicologo: IPsicologo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ psicologo }) => (this.psicologo = psicologo));
  }

  previousState(): void {
    window.history.back();
  }
}
