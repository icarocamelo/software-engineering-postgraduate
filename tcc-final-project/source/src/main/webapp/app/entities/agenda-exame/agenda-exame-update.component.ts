import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAgendaExame, AgendaExame } from 'app/shared/model/agenda-exame.model';
import { AgendaExameService } from './agenda-exame.service';

@Component({
  selector: 'jhi-agenda-exame-update',
  templateUrl: './agenda-exame-update.component.html',
})
export class AgendaExameUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected agendaExameService: AgendaExameService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agendaExame }) => {
      this.updateForm(agendaExame);
    });
  }

  updateForm(agendaExame: IAgendaExame): void {
    this.editForm.patchValue({
      id: agendaExame.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const agendaExame = this.createFromForm();
    if (agendaExame.id !== undefined) {
      this.subscribeToSaveResponse(this.agendaExameService.update(agendaExame));
    } else {
      this.subscribeToSaveResponse(this.agendaExameService.create(agendaExame));
    }
  }

  private createFromForm(): IAgendaExame {
    return {
      ...new AgendaExame(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgendaExame>>): void {
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
