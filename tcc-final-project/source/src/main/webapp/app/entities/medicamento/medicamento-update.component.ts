import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMedicamento, Medicamento } from 'app/shared/model/medicamento.model';
import { MedicamentoService } from './medicamento.service';
import { IFarmacia } from 'app/shared/model/farmacia.model';
import { FarmaciaService } from 'app/entities/farmacia/farmacia.service';

@Component({
  selector: 'jhi-medicamento-update',
  templateUrl: './medicamento-update.component.html',
})
export class MedicamentoUpdateComponent implements OnInit {
  isSaving = false;
  farmacias: IFarmacia[] = [];

  editForm = this.fb.group({
    id: [],
    uUID: [],
    farmacia: [],
  });

  constructor(
    protected medicamentoService: MedicamentoService,
    protected farmaciaService: FarmaciaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medicamento }) => {
      this.updateForm(medicamento);

      this.farmaciaService.query().subscribe((res: HttpResponse<IFarmacia[]>) => (this.farmacias = res.body || []));
    });
  }

  updateForm(medicamento: IMedicamento): void {
    this.editForm.patchValue({
      id: medicamento.id,
      uUID: medicamento.uUID,
      farmacia: medicamento.farmacia,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const medicamento = this.createFromForm();
    if (medicamento.id !== undefined) {
      this.subscribeToSaveResponse(this.medicamentoService.update(medicamento));
    } else {
      this.subscribeToSaveResponse(this.medicamentoService.create(medicamento));
    }
  }

  private createFromForm(): IMedicamento {
    return {
      ...new Medicamento(),
      id: this.editForm.get(['id'])!.value,
      uUID: this.editForm.get(['uUID'])!.value,
      farmacia: this.editForm.get(['farmacia'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedicamento>>): void {
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

  trackById(index: number, item: IFarmacia): any {
    return item.id;
  }
}
