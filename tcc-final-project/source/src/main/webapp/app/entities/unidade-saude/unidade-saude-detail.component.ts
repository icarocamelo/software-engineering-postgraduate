import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUnidadeSaude } from 'app/shared/model/unidade-saude.model';

@Component({
  selector: 'jhi-unidade-saude-detail',
  templateUrl: './unidade-saude-detail.component.html',
})
export class UnidadeSaudeDetailComponent implements OnInit {
  unidadeSaude: IUnidadeSaude | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unidadeSaude }) => (this.unidadeSaude = unidadeSaude));
  }

  previousState(): void {
    window.history.back();
  }
}
