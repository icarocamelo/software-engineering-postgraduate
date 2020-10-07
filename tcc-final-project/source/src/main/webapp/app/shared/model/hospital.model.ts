import { ILeito } from 'app/shared/model/leito.model';

export interface IHospital {
  id?: number;
  nome?: string;
  leitos?: ILeito[];
}

export class Hospital implements IHospital {
  constructor(public id?: number, public nome?: string, public leitos?: ILeito[]) {}
}
