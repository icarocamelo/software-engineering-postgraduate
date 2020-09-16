import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILeito, Leito } from 'app/shared/model/leito.model';
import { LeitoService } from './leito.service';

@Component({
  selector: 'jhi-leito-update',
  templateUrl: './leito-update.component.html',
})
export class LeitoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    uUID: [],
  });

  constructor(protected leitoService: LeitoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ leito }) => {
      this.updateForm(leito);
    });
  }

  updateForm(leito: ILeito): void {
    this.editForm.patchValue({
      id: leito.id,
      uUID: leito.uUID,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const leito = this.createFromForm();
    if (leito.id !== undefined) {
      this.subscribeToSaveResponse(this.leitoService.update(leito));
    } else {
      this.subscribeToSaveResponse(this.leitoService.create(leito));
    }
  }

  private createFromForm(): ILeito {
    return {
      ...new Leito(),
      id: this.editForm.get(['id'])!.value,
      uUID: this.editForm.get(['uUID'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILeito>>): void {
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
