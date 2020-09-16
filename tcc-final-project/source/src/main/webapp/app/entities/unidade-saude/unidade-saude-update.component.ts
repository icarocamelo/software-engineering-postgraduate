import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUnidadeSaude, UnidadeSaude } from 'app/shared/model/unidade-saude.model';
import { UnidadeSaudeService } from './unidade-saude.service';

@Component({
  selector: 'jhi-unidade-saude-update',
  templateUrl: './unidade-saude-update.component.html',
})
export class UnidadeSaudeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    uUID: [],
    endereco: [],
    cNPJ: [],
    telefone: [],
    cEP: [],
    razaoSocial: [],
    nomeFantasia: [],
    tipoUnidadeSaude: [],
  });

  constructor(protected unidadeSaudeService: UnidadeSaudeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unidadeSaude }) => {
      this.updateForm(unidadeSaude);
    });
  }

  updateForm(unidadeSaude: IUnidadeSaude): void {
    this.editForm.patchValue({
      id: unidadeSaude.id,
      uUID: unidadeSaude.uUID,
      endereco: unidadeSaude.endereco,
      cNPJ: unidadeSaude.cNPJ,
      telefone: unidadeSaude.telefone,
      cEP: unidadeSaude.cEP,
      razaoSocial: unidadeSaude.razaoSocial,
      nomeFantasia: unidadeSaude.nomeFantasia,
      tipoUnidadeSaude: unidadeSaude.tipoUnidadeSaude,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const unidadeSaude = this.createFromForm();
    if (unidadeSaude.id !== undefined) {
      this.subscribeToSaveResponse(this.unidadeSaudeService.update(unidadeSaude));
    } else {
      this.subscribeToSaveResponse(this.unidadeSaudeService.create(unidadeSaude));
    }
  }

  private createFromForm(): IUnidadeSaude {
    return {
      ...new UnidadeSaude(),
      id: this.editForm.get(['id'])!.value,
      uUID: this.editForm.get(['uUID'])!.value,
      endereco: this.editForm.get(['endereco'])!.value,
      cNPJ: this.editForm.get(['cNPJ'])!.value,
      telefone: this.editForm.get(['telefone'])!.value,
      cEP: this.editForm.get(['cEP'])!.value,
      razaoSocial: this.editForm.get(['razaoSocial'])!.value,
      nomeFantasia: this.editForm.get(['nomeFantasia'])!.value,
      tipoUnidadeSaude: this.editForm.get(['tipoUnidadeSaude'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUnidadeSaude>>): void {
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
