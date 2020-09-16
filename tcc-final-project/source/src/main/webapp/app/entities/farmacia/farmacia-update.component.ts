import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFarmacia, Farmacia } from 'app/shared/model/farmacia.model';
import { FarmaciaService } from './farmacia.service';

@Component({
  selector: 'jhi-farmacia-update',
  templateUrl: './farmacia-update.component.html',
})
export class FarmaciaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    uUID: [],
  });

  constructor(protected farmaciaService: FarmaciaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ farmacia }) => {
      this.updateForm(farmacia);
    });
  }

  updateForm(farmacia: IFarmacia): void {
    this.editForm.patchValue({
      id: farmacia.id,
      uUID: farmacia.uUID,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const farmacia = this.createFromForm();
    if (farmacia.id !== undefined) {
      this.subscribeToSaveResponse(this.farmaciaService.update(farmacia));
    } else {
      this.subscribeToSaveResponse(this.farmaciaService.create(farmacia));
    }
  }

  private createFromForm(): IFarmacia {
    return {
      ...new Farmacia(),
      id: this.editForm.get(['id'])!.value,
      uUID: this.editForm.get(['uUID'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFarmacia>>): void {
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
