export interface IExame {
  id?: number;
}

export class Exame implements IExame {
  constructor(public id?: number) {}
}
