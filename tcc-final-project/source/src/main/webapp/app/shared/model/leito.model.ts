import { IHospital } from 'app/shared/model/hospital.model';

export interface ILeito {
  id?: number;
  identificacao?: string;
  hospital?: IHospital;
}

export class Leito implements ILeito {
  constructor(public id?: number, public identificacao?: string, public hospital?: IHospital) {}
}
