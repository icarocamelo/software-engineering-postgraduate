import { IAgenda } from 'app/shared/model/agenda.model';

export interface IFisioterapeuta {
  id?: number;
  nome?: string;
  rG?: string;
  cPF?: string;
  numeroRegistro?: string;
  agenda?: IAgenda[];
}

export class Fisioterapeuta implements IFisioterapeuta {
  constructor(
    public id?: number,
    public nome?: string,
    public rG?: string,
    public cPF?: string,
    public numeroRegistro?: string,
    public agenda?: IAgenda[]
  ) {}
}
