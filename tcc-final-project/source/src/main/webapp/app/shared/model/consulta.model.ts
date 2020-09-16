export interface IConsulta {
  id?: number;
}

export class Consulta implements IConsulta {
  constructor(public id?: number) {}
}
