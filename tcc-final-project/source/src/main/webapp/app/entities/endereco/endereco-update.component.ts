import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEndereco, Endereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from './endereco.service';

@Component({
  selector: 'jhi-endereco-update',
  templateUrl: './endereco-update.component.html',
})
export class EnderecoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tipo: [],
    numero: [],
    pais: [],
    estado: [],
    cidade: [],
    bairro: [],
    cEP: [],
    coordenadasGeograficas: [],
  });

  constructor(protected enderecoService: EnderecoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ endereco }) => {
      this.updateForm(endereco);
    });
  }

  updateForm(endereco: IEndereco): void {
    this.editForm.patchValue({
      id: endereco.id,
      tipo: endereco.tipo,
      numero: endereco.numero,
      pais: endereco.pais,
      estado: endereco.estado,
      cidade: endereco.cidade,
      bairro: endereco.bairro,
      cEP: endereco.cEP,
      coordenadasGeograficas: endereco.coordenadasGeograficas,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const endereco = this.createFromForm();
    if (endereco.id !== undefined) {
      this.subscribeToSaveResponse(this.enderecoService.update(endereco));
    } else {
      this.subscribeToSaveResponse(this.enderecoService.create(endereco));
    }
  }

  private createFromForm(): IEndereco {
    return {
      ...new Endereco(),
      id: this.editForm.get(['id'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      pais: this.editForm.get(['pais'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      cidade: this.editForm.get(['cidade'])!.value,
      bairro: this.editForm.get(['bairro'])!.value,
      cEP: this.editForm.get(['cEP'])!.value,
      coordenadasGeograficas: this.editForm.get(['coordenadasGeograficas'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEndereco>>): void {
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
