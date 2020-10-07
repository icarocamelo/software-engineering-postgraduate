import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICartaoVacina } from 'app/shared/model/cartao-vacina.model';

@Component({
  selector: 'jhi-cartao-vacina-detail',
  templateUrl: './cartao-vacina-detail.component.html',
})
export class CartaoVacinaDetailComponent implements OnInit {
  cartaoVacina: ICartaoVacina | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cartaoVacina }) => (this.cartaoVacina = cartaoVacina));
  }

  previousState(): void {
    window.history.back();
  }
}
