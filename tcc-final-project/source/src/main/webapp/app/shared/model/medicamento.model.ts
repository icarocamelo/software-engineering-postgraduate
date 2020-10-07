import { IFarmacia } from 'app/shared/model/farmacia.model';

export interface IMedicamento {
  id?: number;
  nome?: string;
  farmacia?: IFarmacia;
}

export class Medicamento implements IMedicamento {
  constructor(public id?: number, public nome?: string, public farmacia?: IFarmacia) {}
}
