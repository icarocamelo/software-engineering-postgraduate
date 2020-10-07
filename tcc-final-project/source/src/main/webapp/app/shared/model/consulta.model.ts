export interface IConsulta {
  id?: number;
  descricao?: string;
  preco?: number;
  codigo?: string;
}

export class Consulta implements IConsulta {
  constructor(public id?: number, public descricao?: string, public preco?: number, public codigo?: string) {}
}
