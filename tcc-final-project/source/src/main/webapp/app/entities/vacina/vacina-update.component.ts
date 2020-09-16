import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IVacina, Vacina } from 'app/shared/model/vacina.model';
import { VacinaService } from './vacina.service';
import { ICartaoVacina } from 'app/shared/model/cartao-vacina.model';
import { CartaoVacinaService } from 'app/entities/cartao-vacina/cartao-vacina.service';

@Component({
  selector: 'jhi-vacina-update',
  templateUrl: './vacina-update.component.html',
})
export class VacinaUpdateComponent implements OnInit {
  isSaving = false;
  cartaovacinas: ICartaoVacina[] = [];
  dataAplicacaoDp: any;

  editForm = this.fb.group({
    id: [],
    uUID: [],
    nome: [],
    lote: [],
    dataAplicacao: [],
    cartaoVacina: [],
  });

  constructor(
    protected vacinaService: VacinaService,
    protected cartaoVacinaService: CartaoVacinaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vacina }) => {
      this.updateForm(vacina);

      this.cartaoVacinaService.query().subscribe((res: HttpResponse<ICartaoVacina[]>) => (this.cartaovacinas = res.body || []));
    });
  }

  updateForm(vacina: IVacina): void {
    this.editForm.patchValue({
      id: vacina.id,
      uUID: vacina.uUID,
      nome: vacina.nome,
      lote: vacina.lote,
      dataAplicacao: vacina.dataAplicacao,
      cartaoVacina: vacina.cartaoVacina,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vacina = this.createFromForm();
    if (vacina.id !== undefined) {
      this.subscribeToSaveResponse(this.vacinaService.update(vacina));
    } else {
      this.subscribeToSaveResponse(this.vacinaService.create(vacina));
    }
  }

  private createFromForm(): IVacina {
    return {
      ...new Vacina(),
      id: this.editForm.get(['id'])!.value,
      uUID: this.editForm.get(['uUID'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      lote: this.editForm.get(['lote'])!.value,
      dataAplicacao: this.editForm.get(['dataAplicacao'])!.value,
      cartaoVacina: this.editForm.get(['cartaoVacina'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVacina>>): void {
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

  trackById(index: number, item: ICartaoVacina): any {
    return item.id;
  }
}
