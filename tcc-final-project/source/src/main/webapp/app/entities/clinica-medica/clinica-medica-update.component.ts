import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IClinicaMedica, ClinicaMedica } from 'app/shared/model/clinica-medica.model';
import { ClinicaMedicaService } from './clinica-medica.service';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco/endereco.service';

@Component({
  selector: 'jhi-clinica-medica-update',
  templateUrl: './clinica-medica-update.component.html',
})
export class ClinicaMedicaUpdateComponent implements OnInit {
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
    protected clinicaMedicaService: ClinicaMedicaService,
    protected enderecoService: EnderecoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clinicaMedica }) => {
      this.updateForm(clinicaMedica);

      this.enderecoService
        .query({ filter: 'clinicamedica-is-null' })
        .pipe(
          map((res: HttpResponse<IEndereco[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEndereco[]) => {
          if (!clinicaMedica.endereco || !clinicaMedica.endereco.id) {
            this.enderecos = resBody;
          } else {
            this.enderecoService
              .find(clinicaMedica.endereco.id)
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

  updateForm(clinicaMedica: IClinicaMedica): void {
    this.editForm.patchValue({
      id: clinicaMedica.id,
      cNPJ: clinicaMedica.cNPJ,
      telefone: clinicaMedica.telefone,
      cEP: clinicaMedica.cEP,
      razaoSocial: clinicaMedica.razaoSocial,
      nomeFantasia: clinicaMedica.nomeFantasia,
      tipoUnidadeSaude: clinicaMedica.tipoUnidadeSaude,
      endereco: clinicaMedica.endereco,
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
      cNPJ: this.editForm.get(['cNPJ'])!.value,
      telefone: this.editForm.get(['telefone'])!.value,
      cEP: this.editForm.get(['cEP'])!.value,
      razaoSocial: this.editForm.get(['razaoSocial'])!.value,
      nomeFantasia: this.editForm.get(['nomeFantasia'])!.value,
      tipoUnidadeSaude: this.editForm.get(['tipoUnidadeSaude'])!.value,
      endereco: this.editForm.get(['endereco'])!.value,
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

  trackById(index: number, item: IEndereco): any {
    return item.id;
  }
}
