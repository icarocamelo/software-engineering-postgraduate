import { IVacina } from 'app/shared/model/vacina.model';

export interface ICartaoVacina {
  id?: number;
  uUID?: string;
  vacinas?: IVacina[];
}

export class CartaoVacina implements ICartaoVacina {
  constructor(public id?: number, public uUID?: string, public vacinas?: IVacina[]) {}
}
