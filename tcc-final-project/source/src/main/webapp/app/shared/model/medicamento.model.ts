import { IFarmacia } from 'app/shared/model/farmacia.model';

export interface IMedicamento {
  id?: number;
  uUID?: string;
  farmacia?: IFarmacia;
}

export class Medicamento implements IMedicamento {
  constructor(public id?: number, public uUID?: string, public farmacia?: IFarmacia) {}
}
