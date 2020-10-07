import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAtendimento, Atendimento } from 'app/shared/model/atendimento.model';
import { AtendimentoService } from './atendimento.service';
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
  selector: 'jhi-atendimento-update',
  templateUrl: './atendimento-update.component.html',
})
export class AtendimentoUpdateComponent implements OnInit {
  isSaving = false;
  pacientes: IPaciente[] = [];
  profissionaldesaudes: IProfissionalDeSaude[] = [];
  enderecos: IEndereco[] = [];
  agenda: IAgenda[] = [];
  prontuarios: IProntuario[] = [];
  dataDp: any;

  editForm = this.fb.group({
    id: [],
    data: [],
    paciente: [],
    profissionalDeSaude: [],
    endereco: [],
    agenda: [],
    prontuario: [],
  });

  constructor(
    protected atendimentoService: AtendimentoService,
    protected pacienteService: PacienteService,
    protected profissionalDeSaudeService: ProfissionalDeSaudeService,
    protected enderecoService: EnderecoService,
    protected agendaService: AgendaService,
    protected prontuarioService: ProntuarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ atendimento }) => {
      this.updateForm(atendimento);

      this.pacienteService
        .query({ filter: 'atendimento-is-null' })
        .pipe(
          map((res: HttpResponse<IPaciente[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPaciente[]) => {
          if (!atendimento.paciente || !atendimento.paciente.id) {
            this.pacientes = resBody;
          } else {
            this.pacienteService
              .find(atendimento.paciente.id)
              .pipe(
                map((subRes: HttpResponse<IPaciente>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPaciente[]) => (this.pacientes = concatRes));
          }
        });

      this.profissionalDeSaudeService
        .query({ filter: 'atendimento-is-null' })
        .pipe(
          map((res: HttpResponse<IProfissionalDeSaude[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProfissionalDeSaude[]) => {
          if (!atendimento.profissionalDeSaude || !atendimento.profissionalDeSaude.id) {
            this.profissionaldesaudes = resBody;
          } else {
            this.profissionalDeSaudeService
              .find(atendimento.profissionalDeSaude.id)
              .pipe(
                map((subRes: HttpResponse<IProfissionalDeSaude>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProfissionalDeSaude[]) => (this.profissionaldesaudes = concatRes));
          }
        });

      this.enderecoService
        .query({ filter: 'atendimento-is-null' })
        .pipe(
          map((res: HttpResponse<IEndereco[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEndereco[]) => {
          if (!atendimento.endereco || !atendimento.endereco.id) {
            this.enderecos = resBody;
          } else {
            this.enderecoService
              .find(atendimento.endereco.id)
              .pipe(
                map((subRes: HttpResponse<IEndereco>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEndereco[]) => (this.enderecos = concatRes));
          }
        });

      this.agendaService
        .query({ filter: 'atendimento-is-null' })
        .pipe(
          map((res: HttpResponse<IAgenda[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAgenda[]) => {
          if (!atendimento.agenda || !atendimento.agenda.id) {
            this.agenda = resBody;
          } else {
            this.agendaService
              .find(atendimento.agenda.id)
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

  updateForm(atendimento: IAtendimento): void {
    this.editForm.patchValue({
      id: atendimento.id,
      data: atendimento.data,
      paciente: atendimento.paciente,
      profissionalDeSaude: atendimento.profissionalDeSaude,
      endereco: atendimento.endereco,
      agenda: atendimento.agenda,
      prontuario: atendimento.prontuario,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const atendimento = this.createFromForm();
    if (atendimento.id !== undefined) {
      this.subscribeToSaveResponse(this.atendimentoService.update(atendimento));
    } else {
      this.subscribeToSaveResponse(this.atendimentoService.create(atendimento));
    }
  }

  private createFromForm(): IAtendimento {
    return {
      ...new Atendimento(),
      id: this.editForm.get(['id'])!.value,
      data: this.editForm.get(['data'])!.value,
      paciente: this.editForm.get(['paciente'])!.value,
      profissionalDeSaude: this.editForm.get(['profissionalDeSaude'])!.value,
      endereco: this.editForm.get(['endereco'])!.value,
      agenda: this.editForm.get(['agenda'])!.value,
      prontuario: this.editForm.get(['prontuario'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAtendimento>>): void {
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
