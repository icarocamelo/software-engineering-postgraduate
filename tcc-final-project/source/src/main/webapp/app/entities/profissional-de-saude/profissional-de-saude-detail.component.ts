import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfissionalDeSaude } from 'app/shared/model/profissional-de-saude.model';

@Component({
  selector: 'jhi-profissional-de-saude-detail',
  templateUrl: './profissional-de-saude-detail.component.html',
})
export class ProfissionalDeSaudeDetailComponent implements OnInit {
  profissionalDeSaude: IProfissionalDeSaude | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profissionalDeSaude }) => (this.profissionalDeSaude = profissionalDeSaude));
  }

  previousState(): void {
    window.history.back();
  }
}
