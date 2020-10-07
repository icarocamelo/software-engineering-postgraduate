import { IEndereco } from 'app/shared/model/endereco.model';
import { IMedicamento } from 'app/shared/model/medicamento.model';

export interface IFarmacia {
  id?: number;
  nome?: string;
  endereco?: IEndereco;
  medicamentos?: IMedicamento[];
}

export class Farmacia implements IFarmacia {
  constructor(public id?: number, public nome?: string, public endereco?: IEndereco, public medicamentos?: IMedicamento[]) {}
}
