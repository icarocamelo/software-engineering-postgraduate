import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFarmacia } from 'app/shared/model/farmacia.model';

@Component({
  selector: 'jhi-farmacia-detail',
  templateUrl: './farmacia-detail.component.html',
})
export class FarmaciaDetailComponent implements OnInit {
  farmacia: IFarmacia | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ farmacia }) => (this.farmacia = farmacia));
  }

  previousState(): void {
    window.history.back();
  }
}
