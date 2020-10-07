import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFarmacia, Farmacia } from 'app/shared/model/farmacia.model';
import { FarmaciaService } from './farmacia.service';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco/endereco.service';

@Component({
  selector: 'jhi-farmacia-update',
  templateUrl: './farmacia-update.component.html',
})
export class FarmaciaUpdateComponent implements OnInit {
  isSaving = false;
  enderecos: IEndereco[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    endereco: [],
  });

  constructor(
    protected farmaciaService: FarmaciaService,
    protected enderecoService: EnderecoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ farmacia }) => {
      this.updateForm(farmacia);

      this.enderecoService
        .query({ filter: 'farmacia-is-null' })
        .pipe(
          map((res: HttpResponse<IEndereco[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEndereco[]) => {
          if (!farmacia.endereco || !farmacia.endereco.id) {
            this.enderecos = resBody;
          } else {
            this.enderecoService
              .find(farmacia.endereco.id)
              .pipe(
                map((subRes: HttpResponse<IEndereco>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEndereco[]) => (this.enderecos = concatRes));
          }
        });
    });
  }

  updateForm(farmacia: IFarmacia): void {
    this.editForm.patchValue({
      id: farmacia.id,
      nome: farmacia.nome,
      endereco: farmacia.endereco,
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
      nome: this.editForm.get(['nome'])!.value,
      endereco: this.editForm.get(['endereco'])!.value,
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

  trackById(index: number, item: IEndereco): any {
    return item.id;
  }
}
