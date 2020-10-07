import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICartaoVacina, CartaoVacina } from 'app/shared/model/cartao-vacina.model';
import { CartaoVacinaService } from './cartao-vacina.service';

@Component({
  selector: 'jhi-cartao-vacina-update',
  templateUrl: './cartao-vacina-update.component.html',
})
export class CartaoVacinaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected cartaoVacinaService: CartaoVacinaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cartaoVacina }) => {
      this.updateForm(cartaoVacina);
    });
  }

  updateForm(cartaoVacina: ICartaoVacina): void {
    this.editForm.patchValue({
      id: cartaoVacina.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cartaoVacina = this.createFromForm();
    if (cartaoVacina.id !== undefined) {
      this.subscribeToSaveResponse(this.cartaoVacinaService.update(cartaoVacina));
    } else {
      this.subscribeToSaveResponse(this.cartaoVacinaService.create(cartaoVacina));
    }
  }

  private createFromForm(): ICartaoVacina {
    return {
      ...new CartaoVacina(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICartaoVacina>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
