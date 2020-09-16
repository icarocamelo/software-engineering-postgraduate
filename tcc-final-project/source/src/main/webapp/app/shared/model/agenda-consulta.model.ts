export interface IAgendaConsulta {
  id?: number;
}

export class AgendaConsulta implements IAgendaConsulta {
  constructor(public id?: number) {}
}
