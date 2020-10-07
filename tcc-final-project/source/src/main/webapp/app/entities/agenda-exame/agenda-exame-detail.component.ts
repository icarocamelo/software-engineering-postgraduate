import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAgendaExame } from 'app/shared/model/agenda-exame.model';

@Component({
  selector: 'jhi-agenda-exame-detail',
  templateUrl: './agenda-exame-detail.component.html',
})
export class AgendaExameDetailComponent implements OnInit {
  agendaExame: IAgendaExame | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agendaExame }) => (this.agendaExame = agendaExame));
  }

  previousState(): void {
    window.history.back();
  }
}
