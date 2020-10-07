import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPsicologo, Psicologo } from 'app/shared/model/psicologo.model';
import { PsicologoService } from './psicologo.service';

@Component({
  selector: 'jhi-psicologo-update',
  templateUrl: './psicologo-update.component.html',
})
export class PsicologoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
    rG: [],
    cPF: [],
    numeroRegistro: [],
  });

  constructor(protected psicologoService: PsicologoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ psicologo }) => {
      this.updateForm(psicologo);
    });
  }

  updateForm(psicologo: IPsicologo): void {
    this.editForm.patchValue({
      id: psicologo.id,
      nome: psicologo.nome,
      rG: psicologo.rG,
      cPF: psicologo.cPF,
      numeroRegistro: psicologo.numeroRegistro,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const psicologo = this.createFromForm();
    if (psicologo.id !== undefined) {
      this.subscribeToSaveResponse(this.psicologoService.update(psicologo));
    } else {
      this.subscribeToSaveResponse(this.psicologoService.create(psicologo));
    }
  }

  private createFromForm(): IPsicologo {
    return {
      ...new Psicologo(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      rG: this.editForm.get(['rG'])!.value,
      cPF: this.editForm.get(['cPF'])!.value,
      numeroRegistro: this.editForm.get(['numeroRegistro'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPsicologo>>): void {
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
