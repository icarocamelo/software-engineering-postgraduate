import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAgenda, Agenda } from 'app/shared/model/agenda.model';
import { AgendaService } from './agenda.service';

@Component({
  selector: 'jhi-agenda-update',
  templateUrl: './agenda-update.component.html',
})
export class AgendaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    uUID: [],
    data: [],
  });

  constructor(protected agendaService: AgendaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agenda }) => {
      this.updateForm(agenda);
    });
  }

  updateForm(agenda: IAgenda): void {
    this.editForm.patchValue({
      id: agenda.id,
      uUID: agenda.uUID,
      data: agenda.data,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const agenda = this.createFromForm();
    if (agenda.id !== undefined) {
      this.subscribeToSaveResponse(this.agendaService.update(agenda));
    } else {
      this.subscribeToSaveResponse(this.agendaService.create(agenda));
    }
  }

  private createFromForm(): IAgenda {
    return {
      ...new Agenda(),
      id: this.editForm.get(['id'])!.value,
      uUID: this.editForm.get(['uUID'])!.value,
      data: this.editForm.get(['data'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgenda>>): void {
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
