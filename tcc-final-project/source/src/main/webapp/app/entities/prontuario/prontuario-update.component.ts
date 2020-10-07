import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProntuario, Prontuario } from 'app/shared/model/prontuario.model';
import { ProntuarioService } from './prontuario.service';
import { IPaciente } from 'app/shared/model/paciente.model';
import { PacienteService } from 'app/entities/paciente/paciente.service';
import { IProfissionalDeSaude } from 'app/shared/model/profissional-de-saude.model';
import { ProfissionalDeSaudeService } from 'app/entities/profissional-de-saude/profissional-de-saude.service';

type SelectableEntity = IPaciente | IProfissionalDeSaude;

@Component({
  selector: 'jhi-prontuario-update',
  templateUrl: './prontuario-update.component.html',
})
export class ProntuarioUpdateComponent implements OnInit {
  isSaving = false;
  pacientes: IPaciente[] = [];
  profissionaldesaudes: IProfissionalDeSaude[] = [];

  editForm = this.fb.group({
    id: [],
    paciente: [],
    profissionalDeSaude: [],
  });

  constructor(
    protected prontuarioService: ProntuarioService,
    protected pacienteService: PacienteService,
    protected profissionalDeSaudeService: ProfissionalDeSaudeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prontuario }) => {
      this.updateForm(prontuario);

      this.pacienteService
        .query({ filter: 'prontuario-is-null' })
        .pipe(
          map((res: HttpResponse<IPaciente[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPaciente[]) => {
          if (!prontuario.paciente || !prontuario.paciente.id) {
            this.pacientes = resBody;
          } else {
            this.pacienteService
              .find(prontuario.paciente.id)
              .pipe(
                map((subRes: HttpResponse<IPaciente>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPaciente[]) => (this.pacientes = concatRes));
          }
        });

      this.profissionalDeSaudeService
        .query()
        .subscribe((res: HttpResponse<IProfissionalDeSaude[]>) => (this.profissionaldesaudes = res.body || []));
    });
  }

  updateForm(prontuario: IProntuario): void {
    this.editForm.patchValue({
      id: prontuario.id,
      paciente: prontuario.paciente,
      profissionalDeSaude: prontuario.profissionalDeSaude,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prontuario = this.createFromForm();
    if (prontuario.id !== undefined) {
      this.subscribeToSaveResponse(this.prontuarioService.update(prontuario));
    } else {
      this.subscribeToSaveResponse(this.prontuarioService.create(prontuario));
    }
  }

  private createFromForm(): IProntuario {
    return {
      ...new Prontuario(),
      id: this.editForm.get(['id'])!.value,
      paciente: this.editForm.get(['paciente'])!.value,
      profissionalDeSaude: this.editForm.get(['profissionalDeSaude'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProntuario>>): void {
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
