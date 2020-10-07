import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPostoDeSaude } from 'app/shared/model/posto-de-saude.model';

@Component({
  selector: 'jhi-posto-de-saude-detail',
  templateUrl: './posto-de-saude-detail.component.html',
})
export class PostoDeSaudeDetailComponent implements OnInit {
  postoDeSaude: IPostoDeSaude | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ postoDeSaude }) => (this.postoDeSaude = postoDeSaude));
  }

  previousState(): void {
    window.history.back();
  }
}
