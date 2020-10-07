export interface IExame {
  id?: number;
  descricao?: string;
  preco?: number;
  codigo?: string;
}

export class Exame implements IExame {
  constructor(public id?: number, public descricao?: string, public preco?: number, public codigo?: string) {}
}
