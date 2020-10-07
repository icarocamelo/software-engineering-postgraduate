import { Moment } from 'moment';

export interface IAgendaExame {
  id?: number;
  data?: Moment;
}

export class AgendaExame implements IAgendaExame {
  constructor(public id?: number, public data?: Moment) {}
}
