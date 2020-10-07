import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFisioterapeuta } from 'app/shared/model/fisioterapeuta.model';

@Component({
  selector: 'jhi-fisioterapeuta-detail',
  templateUrl: './fisioterapeuta-detail.component.html',
})
export class FisioterapeutaDetailComponent implements OnInit {
  fisioterapeuta: IFisioterapeuta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fisioterapeuta }) => (this.fisioterapeuta = fisioterapeuta));
  }

  previousState(): void {
    window.history.back();
  }
}
