import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfissional } from 'app/shared/model/profissional.model';

@Component({
  selector: 'jhi-profissional-detail',
  templateUrl: './profissional-detail.component.html',
})
export class ProfissionalDetailComponent implements OnInit {
  profissional: IProfissional | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profissional }) => (this.profissional = profissional));
  }

  previousState(): void {
    window.history.back();
  }
}
