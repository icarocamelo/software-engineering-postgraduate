import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IClinicaMedica, ClinicaMedica } from 'app/shared/model/clinica-medica.model';
import { ClinicaMedicaService } from './clinica-medica.service';

@Component({
  selector: 'jhi-clinica-medica-update',
  templateUrl: './clinica-medica-update.component.html',
})
export class ClinicaMedicaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected clinicaMedicaService: ClinicaMedicaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clinicaMedica }) => {
      this.updateForm(clinicaMedica);
    });
  }

  updateForm(clinicaMedica: IClinicaMedica): void {
    this.editForm.patchValue({
      id: clinicaMedica.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const clinicaMedica = this.createFromForm();
    if (clinicaMedica.id !== undefined) {
      this.subscribeToSaveResponse(this.clinicaMedicaService.update(clinicaMedica));
    } else {
      this.subscribeToSaveResponse(this.clinicaMedicaService.create(clinicaMedica));
    }
  }

  private createFromForm(): IClinicaMedica {
    return {
      ...new ClinicaMedica(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClinicaMedica>>): void {
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
