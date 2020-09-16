export interface IAgendaExame {
  id?: number;
}

export class AgendaExame implements IAgendaExame {
  constructor(public id?: number) {}
}
