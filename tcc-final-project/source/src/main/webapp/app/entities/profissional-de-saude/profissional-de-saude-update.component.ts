import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProfissionalDeSaude, ProfissionalDeSaude } from 'app/shared/model/profissional-de-saude.model';
import { ProfissionalDeSaudeService } from './profissional-de-saude.service';

@Component({
  selector: 'jhi-profissional-de-saude-update',
  templateUrl: './profissional-de-saude-update.component.html',
})
export class ProfissionalDeSaudeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    numeroRegistro: [],
  });

  constructor(
    protected profissionalDeSaudeService: ProfissionalDeSaudeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profissionalDeSaude }) => {
      this.updateForm(profissionalDeSaude);
    });
  }

  updateForm(profissionalDeSaude: IProfissionalDeSaude): void {
    this.editForm.patchValue({
      id: profissionalDeSaude.id,
      numeroRegistro: profissionalDeSaude.numeroRegistro,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profissionalDeSaude = this.createFromForm();
    if (profissionalDeSaude.id !== undefined) {
      this.subscribeToSaveResponse(this.profissionalDeSaudeService.update(profissionalDeSaude));
    } else {
      this.subscribeToSaveResponse(this.profissionalDeSaudeService.create(profissionalDeSaude));
    }
  }

  private createFromForm(): IProfissionalDeSaude {
    return {
      ...new ProfissionalDeSaude(),
      id: this.editForm.get(['id'])!.value,
      numeroRegistro: this.editForm.get(['numeroRegistro'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfissionalDeSaude>>): void {
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
