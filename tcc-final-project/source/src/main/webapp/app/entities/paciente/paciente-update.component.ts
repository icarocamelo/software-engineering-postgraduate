import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPaciente, Paciente } from 'app/shared/model/paciente.model';
import { PacienteService } from './paciente.service';
import { IPerfilAcesso } from 'app/shared/model/perfil-acesso.model';
import { PerfilAcessoService } from 'app/entities/perfil-acesso/perfil-acesso.service';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco/endereco.service';

type SelectableEntity = IPerfilAcesso | IEndereco;

@Component({
  selector: 'jhi-paciente-update',
  templateUrl: './paciente-update.component.html',
})
export class PacienteUpdateComponent implements OnInit {
  isSaving = false;
  perfilacessos: IPerfilAcesso[] = [];
  enderecos: IEndereco[] = [];
  dataNascimentoDp: any;

  editForm = this.fb.group({
    id: [],
    nome: [],
    rG: [],
    cPF: [],
    dataNascimento: [],
    telefone: [],
    peso: [],
    altura: [],
    responsavel: [],
    rNE: [],
    perfilAcesso: [],
    endereco: [],
  });

  constructor(
    protected pacienteService: PacienteService,
    protected perfilAcessoService: PerfilAcessoService,
    protected enderecoService: EnderecoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paciente }) => {
      this.updateForm(paciente);

      this.perfilAcessoService
        .query({ filter: 'paciente-is-null' })
        .pipe(
          map((res: HttpResponse<IPerfilAcesso[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPerfilAcesso[]) => {
          if (!paciente.perfilAcesso || !paciente.perfilAcesso.id) {
            this.perfilacessos = resBody;
          } else {
            this.perfilAcessoService
              .find(paciente.perfilAcesso.id)
              .pipe(
                map((subRes: HttpResponse<IPerfilAcesso>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPerfilAcesso[]) => (this.perfilacessos = concatRes));
          }
        });

      this.enderecoService
        .query({ filter: 'paciente-is-null' })
        .pipe(
          map((res: HttpResponse<IEndereco[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEndereco[]) => {
          if (!paciente.endereco || !paciente.endereco.id) {
            this.enderecos = resBody;
          } else {
            this.enderecoService
              .find(paciente.endereco.id)
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

  updateForm(paciente: IPaciente): void {
    this.editForm.patchValue({
      id: paciente.id,
      nome: paciente.nome,
      rG: paciente.rG,
      cPF: paciente.cPF,
      dataNascimento: paciente.dataNascimento,
      telefone: paciente.telefone,
      peso: paciente.peso,
      altura: paciente.altura,
      responsavel: paciente.responsavel,
      rNE: paciente.rNE,
      perfilAcesso: paciente.perfilAcesso,
      endereco: paciente.endereco,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paciente = this.createFromForm();
    if (paciente.id !== undefined) {
      this.subscribeToSaveResponse(this.pacienteService.update(paciente));
    } else {
      this.subscribeToSaveResponse(this.pacienteService.create(paciente));
    }
  }

  private createFromForm(): IPaciente {
    return {
      ...new Paciente(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      rG: this.editForm.get(['rG'])!.value,
      cPF: this.editForm.get(['cPF'])!.value,
      dataNascimento: this.editForm.get(['dataNascimento'])!.value,
      telefone: this.editForm.get(['telefone'])!.value,
      peso: this.editForm.get(['peso'])!.value,
      altura: this.editForm.get(['altura'])!.value,
      responsavel: this.editForm.get(['responsavel'])!.value,
      rNE: this.editForm.get(['rNE'])!.value,
      perfilAcesso: this.editForm.get(['perfilAcesso'])!.value,
      endereco: this.editForm.get(['endereco'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaciente>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
