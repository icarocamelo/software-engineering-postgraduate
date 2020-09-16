export interface IAtendimento {
  id?: number;
  uUID?: string;
}

export class Atendimento implements IAtendimento {
  constructor(public id?: number, public uUID?: string) {}
}
