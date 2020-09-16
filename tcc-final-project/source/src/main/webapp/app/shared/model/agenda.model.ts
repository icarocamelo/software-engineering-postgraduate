export interface IAgenda {
  id?: number;
  uUID?: string;
  data?: string;
}

export class Agenda implements IAgenda {
  constructor(public id?: number, public uUID?: string, public data?: string) {}
}
