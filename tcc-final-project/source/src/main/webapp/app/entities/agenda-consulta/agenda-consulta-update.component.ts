import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAgendaConsulta, AgendaConsulta } from 'app/shared/model/agenda-consulta.model';
import { AgendaConsultaService } from './agenda-consulta.service';

@Component({
  selector: 'jhi-agenda-consulta-update',
  templateUrl: './agenda-consulta-update.component.html',
})
export class AgendaConsultaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected agendaConsultaService: AgendaConsultaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agendaConsulta }) => {
      this.updateForm(agendaConsulta);
    });
  }

  updateForm(agendaConsulta: IAgendaConsulta): void {
    this.editForm.patchValue({
      id: agendaConsulta.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const agendaConsulta = this.createFromForm();
    if (agendaConsulta.id !== undefined) {
      this.subscribeToSaveResponse(this.agendaConsultaService.update(agendaConsulta));
    } else {
      this.subscribeToSaveResponse(this.agendaConsultaService.create(agendaConsulta));
    }
  }

  private createFromForm(): IAgendaConsulta {
    return {
      ...new AgendaConsulta(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgendaConsulta>>): void {
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
