import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILaboratorio, Laboratorio } from 'app/shared/model/laboratorio.model';
import { LaboratorioService } from './laboratorio.service';

@Component({
  selector: 'jhi-laboratorio-update',
  templateUrl: './laboratorio-update.component.html',
})
export class LaboratorioUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected laboratorioService: LaboratorioService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ laboratorio }) => {
      this.updateForm(laboratorio);
    });
  }

  updateForm(laboratorio: ILaboratorio): void {
    this.editForm.patchValue({
      id: laboratorio.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const laboratorio = this.createFromForm();
    if (laboratorio.id !== undefined) {
      this.subscribeToSaveResponse(this.laboratorioService.update(laboratorio));
    } else {
      this.subscribeToSaveResponse(this.laboratorioService.create(laboratorio));
    }
  }

  private createFromForm(): ILaboratorio {
    return {
      ...new Laboratorio(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILaboratorio>>): void {
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
