export interface IFisioterapeuta {
  id?: number;
}

export class Fisioterapeuta implements IFisioterapeuta {
  constructor(public id?: number) {}
}
