import { IMedicamento } from 'app/shared/model/medicamento.model';

export interface IFarmacia {
  id?: number;
  uUID?: string;
  medicamentos?: IMedicamento[];
}

export class Farmacia implements IFarmacia {
  constructor(public id?: number, public uUID?: string, public medicamentos?: IMedicamento[]) {}
}
