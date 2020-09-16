import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAgendaConsulta } from 'app/shared/model/agenda-consulta.model';

@Component({
  selector: 'jhi-agenda-consulta-detail',
  templateUrl: './agenda-consulta-detail.component.html',
})
export class AgendaConsultaDetailComponent implements OnInit {
  agendaConsulta: IAgendaConsulta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agendaConsulta }) => (this.agendaConsulta = agendaConsulta));
  }

  previousState(): void {
    window.history.back();
  }
}
