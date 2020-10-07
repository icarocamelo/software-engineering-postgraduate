import { Moment } from 'moment';

export interface IAgendaConsulta {
  id?: number;
  data?: Moment;
}

export class AgendaConsulta implements IAgendaConsulta {
  constructor(public id?: number, public data?: Moment) {}
}
