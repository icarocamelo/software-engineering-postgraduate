import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFisioterapeuta, Fisioterapeuta } from 'app/shared/model/fisioterapeuta.model';
import { FisioterapeutaService } from './fisioterapeuta.service';

@Component({
  selector: 'jhi-fisioterapeuta-update',
  templateUrl: './fisioterapeuta-update.component.html',
})
export class FisioterapeutaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected fisioterapeutaService: FisioterapeutaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fisioterapeuta }) => {
      this.updateForm(fisioterapeuta);
    });
  }

  updateForm(fisioterapeuta: IFisioterapeuta): void {
    this.editForm.patchValue({
      id: fisioterapeuta.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fisioterapeuta = this.createFromForm();
    if (fisioterapeuta.id !== undefined) {
      this.subscribeToSaveResponse(this.fisioterapeutaService.update(fisioterapeuta));
    } else {
      this.subscribeToSaveResponse(this.fisioterapeutaService.create(fisioterapeuta));
    }
  }

  private createFromForm(): IFisioterapeuta {
    return {
      ...new Fisioterapeuta(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFisioterapeuta>>): void {
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
