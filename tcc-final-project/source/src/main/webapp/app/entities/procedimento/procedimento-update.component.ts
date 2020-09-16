import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProcedimento, Procedimento } from 'app/shared/model/procedimento.model';
import { ProcedimentoService } from './procedimento.service';

@Component({
  selector: 'jhi-procedimento-update',
  templateUrl: './procedimento-update.component.html',
})
export class ProcedimentoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    uUID: [],
    descricao: [],
    preco: [],
    codigo: [],
  });

  constructor(protected procedimentoService: ProcedimentoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ procedimento }) => {
      this.updateForm(procedimento);
    });
  }

  updateForm(procedimento: IProcedimento): void {
    this.editForm.patchValue({
      id: procedimento.id,
      uUID: procedimento.uUID,
      descricao: procedimento.descricao,
      preco: procedimento.preco,
      codigo: procedimento.codigo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const procedimento = this.createFromForm();
    if (procedimento.id !== undefined) {
      this.subscribeToSaveResponse(this.procedimentoService.update(procedimento));
    } else {
      this.subscribeToSaveResponse(this.procedimentoService.create(procedimento));
    }
  }

  private createFromForm(): IProcedimento {
    return {
      ...new Procedimento(),
      id: this.editForm.get(['id'])!.value,
      uUID: this.editForm.get(['uUID'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      preco: this.editForm.get(['preco'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProcedimento>>): void {
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
