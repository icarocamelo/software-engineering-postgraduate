import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IExame, Exame } from 'app/shared/model/exame.model';
import { ExameService } from './exame.service';

@Component({
  selector: 'jhi-exame-update',
  templateUrl: './exame-update.component.html',
})
export class ExameUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [],
    preco: [],
    codigo: [],
  });

  constructor(protected exameService: ExameService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exame }) => {
      this.updateForm(exame);
    });
  }

  updateForm(exame: IExame): void {
    this.editForm.patchValue({
      id: exame.id,
      descricao: exame.descricao,
      preco: exame.preco,
      codigo: exame.codigo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const exame = this.createFromForm();
    if (exame.id !== undefined) {
      this.subscribeToSaveResponse(this.exameService.update(exame));
    } else {
      this.subscribeToSaveResponse(this.exameService.create(exame));
    }
  }

  private createFromForm(): IExame {
    return {
      ...new Exame(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      preco: this.editForm.get(['preco'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExame>>): void {
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
