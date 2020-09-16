import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILeito } from 'app/shared/model/leito.model';

@Component({
  selector: 'jhi-leito-detail',
  templateUrl: './leito-detail.component.html',
})
export class LeitoDetailComponent implements OnInit {
  leito: ILeito | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ leito }) => (this.leito = leito));
  }

  previousState(): void {
    window.history.back();
  }
}
