import { IAgenda } from 'app/shared/model/agenda.model';

export interface IEnfermeiro {
  id?: number;
  nome?: string;
  rG?: string;
  cPF?: string;
  numeroRegistro?: string;
  agenda?: IAgenda[];
}

export class Enfermeiro implements IEnfermeiro {
  constructor(
    public id?: number,
    public nome?: string,
    public rG?: string,
    public cPF?: string,
    public numeroRegistro?: string,
    public agenda?: IAgenda[]
  ) {}
}
