import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEnfermeiro, Enfermeiro } from 'app/shared/model/enfermeiro.model';
import { EnfermeiroService } from './enfermeiro.service';

@Component({
  selector: 'jhi-enfermeiro-update',
  templateUrl: './enfermeiro-update.component.html',
})
export class EnfermeiroUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected enfermeiroService: EnfermeiroService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ enfermeiro }) => {
      this.updateForm(enfermeiro);
    });
  }

  updateForm(enfermeiro: IEnfermeiro): void {
    this.editForm.patchValue({
      id: enfermeiro.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const enfermeiro = this.createFromForm();
    if (enfermeiro.id !== undefined) {
      this.subscribeToSaveResponse(this.enfermeiroService.update(enfermeiro));
    } else {
      this.subscribeToSaveResponse(this.enfermeiroService.create(enfermeiro));
    }
  }

  private createFromForm(): IEnfermeiro {
    return {
      ...new Enfermeiro(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnfermeiro>>): void {
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
