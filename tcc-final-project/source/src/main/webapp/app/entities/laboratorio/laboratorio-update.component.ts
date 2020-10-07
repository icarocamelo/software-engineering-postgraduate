import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ILaboratorio, Laboratorio } from 'app/shared/model/laboratorio.model';
import { LaboratorioService } from './laboratorio.service';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco/endereco.service';

@Component({
  selector: 'jhi-laboratorio-update',
  templateUrl: './laboratorio-update.component.html',
})
export class LaboratorioUpdateComponent implements OnInit {
  isSaving = false;
  enderecos: IEndereco[] = [];

  editForm = this.fb.group({
    id: [],
    cNPJ: [],
    telefone: [],
    cEP: [],
    razaoSocial: [],
    nomeFantasia: [],
    tipoUnidadeSaude: [],
    endereco: [],
  });

  constructor(
    protected laboratorioService: LaboratorioService,
    protected enderecoService: EnderecoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ laboratorio }) => {
      this.updateForm(laboratorio);

      this.enderecoService
        .query({ filter: 'laboratorio-is-null' })
        .pipe(
          map((res: HttpResponse<IEndereco[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEndereco[]) => {
          if (!laboratorio.endereco || !laboratorio.endereco.id) {
            this.enderecos = resBody;
          } else {
            this.enderecoService
              .find(laboratorio.endereco.id)
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

  updateForm(laboratorio: ILaboratorio): void {
    this.editForm.patchValue({
      id: laboratorio.id,
      cNPJ: laboratorio.cNPJ,
      telefone: laboratorio.telefone,
      cEP: laboratorio.cEP,
      razaoSocial: laboratorio.razaoSocial,
      nomeFantasia: laboratorio.nomeFantasia,
      tipoUnidadeSaude: laboratorio.tipoUnidadeSaude,
      endereco: laboratorio.endereco,
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
      cNPJ: this.editForm.get(['cNPJ'])!.value,
      telefone: this.editForm.get(['telefone'])!.value,
      cEP: this.editForm.get(['cEP'])!.value,
      razaoSocial: this.editForm.get(['razaoSocial'])!.value,
      nomeFantasia: this.editForm.get(['nomeFantasia'])!.value,
      tipoUnidadeSaude: this.editForm.get(['tipoUnidadeSaude'])!.value,
      endereco: this.editForm.get(['endereco'])!.value,
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

  trackById(index: number, item: IEndereco): any {
    return item.id;
  }
}
