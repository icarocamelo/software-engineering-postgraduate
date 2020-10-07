import { IVacina } from 'app/shared/model/vacina.model';

export interface ICartaoVacina {
  id?: number;
  vacinas?: IVacina[];
}

export class CartaoVacina implements ICartaoVacina {
  constructor(public id?: number, public vacinas?: IVacina[]) {}
}
