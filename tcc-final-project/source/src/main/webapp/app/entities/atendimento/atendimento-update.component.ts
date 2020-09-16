import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAtendimento, Atendimento } from 'app/shared/model/atendimento.model';
import { AtendimentoService } from './atendimento.service';

@Component({
  selector: 'jhi-atendimento-update',
  templateUrl: './atendimento-update.component.html',
})
export class AtendimentoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    uUID: [],
  });

  constructor(protected atendimentoService: AtendimentoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ atendimento }) => {
      this.updateForm(atendimento);
    });
  }

  updateForm(atendimento: IAtendimento): void {
    this.editForm.patchValue({
      id: atendimento.id,
      uUID: atendimento.uUID,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const atendimento = this.createFromForm();
    if (atendimento.id !== undefined) {
      this.subscribeToSaveResponse(this.atendimentoService.update(atendimento));
    } else {
      this.subscribeToSaveResponse(this.atendimentoService.create(atendimento));
    }
  }

  private createFromForm(): IAtendimento {
    return {
      ...new Atendimento(),
      id: this.editForm.get(['id'])!.value,
      uUID: this.editForm.get(['uUID'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAtendimento>>): void {
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
