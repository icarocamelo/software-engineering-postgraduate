export interface IProcedimento {
  id?: number;
  uUID?: string;
  descricao?: string;
  preco?: number;
  codigo?: string;
}

export class Procedimento implements IProcedimento {
  constructor(public id?: number, public uUID?: string, public descricao?: string, public preco?: number, public codigo?: string) {}
}
