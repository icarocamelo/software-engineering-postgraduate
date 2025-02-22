import { Moment } from 'moment';
import { ICartaoVacina } from 'app/shared/model/cartao-vacina.model';

export interface IVacina {
  id?: number;
  nome?: string;
  lote?: string;
  dataAplicacao?: Moment;
  cartaoVacina?: ICartaoVacina;
}

export class Vacina implements IVacina {
  constructor(
    public id?: number,
    public nome?: string,
    public lote?: string,
    public dataAplicacao?: Moment,
    public cartaoVacina?: ICartaoVacina
  ) {}
}
