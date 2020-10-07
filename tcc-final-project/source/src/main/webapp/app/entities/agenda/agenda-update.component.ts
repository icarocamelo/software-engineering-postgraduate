import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAgenda, Agenda } from 'app/shared/model/agenda.model';
import { AgendaService } from './agenda.service';
import { IMedico } from 'app/shared/model/medico.model';
import { MedicoService } from 'app/entities/medico/medico.service';
import { IFisioterapeuta } from 'app/shared/model/fisioterapeuta.model';
import { FisioterapeutaService } from 'app/entities/fisioterapeuta/fisioterapeuta.service';
import { IEnfermeiro } from 'app/shared/model/enfermeiro.model';
import { EnfermeiroService } from 'app/entities/enfermeiro/enfermeiro.service';
import { IPsicologo } from 'app/shared/model/psicologo.model';
import { PsicologoService } from 'app/entities/psicologo/psicologo.service';

type SelectableEntity = IMedico | IFisioterapeuta | IEnfermeiro | IPsicologo;

@Component({
  selector: 'jhi-agenda-update',
  templateUrl: './agenda-update.component.html',
})
export class AgendaUpdateComponent implements OnInit {
  isSaving = false;
  medicos: IMedico[] = [];
  fisioterapeutas: IFisioterapeuta[] = [];
  enfermeiros: IEnfermeiro[] = [];
  psicologos: IPsicologo[] = [];
  dataDp: any;

  editForm = this.fb.group({
    id: [],
    data: [],
    medico: [],
    fisioterapeuta: [],
    enfermeiro: [],
    psicologo: [],
  });

  constructor(
    protected agendaService: AgendaService,
    protected medicoService: MedicoService,
    protected fisioterapeutaService: FisioterapeutaService,
    protected enfermeiroService: EnfermeiroService,
    protected psicologoService: PsicologoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agenda }) => {
      this.updateForm(agenda);

      this.medicoService.query().subscribe((res: HttpResponse<IMedico[]>) => (this.medicos = res.body || []));

      this.fisioterapeutaService.query().subscribe((res: HttpResponse<IFisioterapeuta[]>) => (this.fisioterapeutas = res.body || []));

      this.enfermeiroService.query().subscribe((res: HttpResponse<IEnfermeiro[]>) => (this.enfermeiros = res.body || []));

      this.psicologoService.query().subscribe((res: HttpResponse<IPsicologo[]>) => (this.psicologos = res.body || []));
    });
  }

  updateForm(agenda: IAgenda): void {
    this.editForm.patchValue({
      id: agenda.id,
      data: agenda.data,
      medico: agenda.medico,
      fisioterapeuta: agenda.fisioterapeuta,
      enfermeiro: agenda.enfermeiro,
      psicologo: agenda.psicologo,
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
      data: this.editForm.get(['data'])!.value,
      medico: this.editForm.get(['medico'])!.value,
      fisioterapeuta: this.editForm.get(['fisioterapeuta'])!.value,
      enfermeiro: this.editForm.get(['enfermeiro'])!.value,
      psicologo: this.editForm.get(['psicologo'])!.value,
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
