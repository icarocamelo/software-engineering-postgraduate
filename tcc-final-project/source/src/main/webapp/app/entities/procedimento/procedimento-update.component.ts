import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProcedimento, Procedimento } from 'app/shared/model/procedimento.model';
import { ProcedimentoService } from './procedimento.service';
import { IPaciente } from 'app/shared/model/paciente.model';
import { PacienteService } from 'app/entities/paciente/paciente.service';
import { IProfissionalDeSaude } from 'app/shared/model/profissional-de-saude.model';
import { ProfissionalDeSaudeService } from 'app/entities/profissional-de-saude/profissional-de-saude.service';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco/endereco.service';
import { IAgenda } from 'app/shared/model/agenda.model';
import { AgendaService } from 'app/entities/agenda/agenda.service';
import { IProntuario } from 'app/shared/model/prontuario.model';
import { ProntuarioService } from 'app/entities/prontuario/prontuario.service';

type SelectableEntity = IPaciente | IProfissionalDeSaude | IEndereco | IAgenda | IProntuario;

@Component({
  selector: 'jhi-procedimento-update',
  templateUrl: './procedimento-update.component.html',
})
export class ProcedimentoUpdateComponent implements OnInit {
  isSaving = false;
  pacientes: IPaciente[] = [];
  profissionaldesaudes: IProfissionalDeSaude[] = [];
  enderecos: IEndereco[] = [];
  agenda: IAgenda[] = [];
  prontuarios: IProntuario[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    preco: [],
    codigo: [],
    paciente: [],
    profissionalDeSaude: [],
    endereco: [],
    agenda: [],
    prontuario: [],
  });

  constructor(
    protected procedimentoService: ProcedimentoService,
    protected pacienteService: PacienteService,
    protected profissionalDeSaudeService: ProfissionalDeSaudeService,
    protected enderecoService: EnderecoService,
    protected agendaService: AgendaService,
    protected prontuarioService: ProntuarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ procedimento }) => {
      this.updateForm(procedimento);

      this.pacienteService
        .query({ filter: 'procedimento-is-null' })
        .pipe(
          map((res: HttpResponse<IPaciente[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPaciente[]) => {
          if (!procedimento.paciente || !procedimento.paciente.id) {
            this.pacientes = resBody;
          } else {
            this.pacienteService
              .find(procedimento.paciente.id)
              .pipe(
                map((subRes: HttpResponse<IPaciente>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPaciente[]) => (this.pacientes = concatRes));
          }
        });

      this.profissionalDeSaudeService
        .query({ filter: 'procedimento-is-null' })
        .pipe(
          map((res: HttpResponse<IProfissionalDeSaude[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProfissionalDeSaude[]) => {
          if (!procedimento.profissionalDeSaude || !procedimento.profissionalDeSaude.id) {
            this.profissionaldesaudes = resBody;
          } else {
            this.profissionalDeSaudeService
              .find(procedimento.profissionalDeSaude.id)
              .pipe(
                map((subRes: HttpResponse<IProfissionalDeSaude>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProfissionalDeSaude[]) => (this.profissionaldesaudes = concatRes));
          }
        });

      this.enderecoService
        .query({ filter: 'procedimento-is-null' })
        .pipe(
          map((res: HttpResponse<IEndereco[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEndereco[]) => {
          if (!procedimento.endereco || !procedimento.endereco.id) {
            this.enderecos = resBody;
          } else {
            this.enderecoService
              .find(procedimento.endereco.id)
              .pipe(
                map((subRes: HttpResponse<IEndereco>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEndereco[]) => (this.enderecos = concatRes));
          }
        });

      this.agendaService
        .query({ filter: 'procedimento-is-null' })
        .pipe(
          map((res: HttpResponse<IAgenda[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAgenda[]) => {
          if (!procedimento.agenda || !procedimento.agenda.id) {
            this.agenda = resBody;
          } else {
            this.agendaService
              .find(procedimento.agenda.id)
              .pipe(
                map((subRes: HttpResponse<IAgenda>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAgenda[]) => (this.agenda = concatRes));
          }
        });

      this.prontuarioService.query().subscribe((res: HttpResponse<IProntuario[]>) => (this.prontuarios = res.body || []));
    });
  }

  updateForm(procedimento: IProcedimento): void {
    this.editForm.patchValue({
      id: procedimento.id,
      descricao: procedimento.descricao,
      preco: procedimento.preco,
      codigo: procedimento.codigo,
      paciente: procedimento.paciente,
      profissionalDeSaude: procedimento.profissionalDeSaude,
      endereco: procedimento.endereco,
      agenda: procedimento.agenda,
      prontuario: procedimento.prontuario,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const procedimento = this.createFromForm();
    if (procedimento.id !== undefined) {
      this.subscribeToSaveResponse(this.procedimentoService.update(procedimento));
    } else {
      this.subscribeToSaveResponse(this.procedimentoService.create(procedimento));
    }
  }

  private createFromForm(): IProcedimento {
    return {
      ...new Procedimento(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      preco: this.editForm.get(['preco'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      paciente: this.editForm.get(['paciente'])!.value,
      profissionalDeSaude: this.editForm.get(['profissionalDeSaude'])!.value,
      endereco: this.editForm.get(['endereco'])!.value,
      agenda: this.editForm.get(['agenda'])!.value,
      prontuario: this.editForm.get(['prontuario'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProcedimento>>): void {
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
