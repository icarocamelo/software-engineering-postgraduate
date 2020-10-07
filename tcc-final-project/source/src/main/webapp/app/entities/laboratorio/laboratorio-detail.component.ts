import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILaboratorio } from 'app/shared/model/laboratorio.model';

@Component({
  selector: 'jhi-laboratorio-detail',
  templateUrl: './laboratorio-detail.component.html',
})
export class LaboratorioDetailComponent implements OnInit {
  laboratorio: ILaboratorio | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ laboratorio }) => (this.laboratorio = laboratorio));
  }

  previousState(): void {
    window.history.back();
  }
}
