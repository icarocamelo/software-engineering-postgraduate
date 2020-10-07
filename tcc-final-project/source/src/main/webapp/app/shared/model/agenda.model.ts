import { Moment } from 'moment';
import { IMedico } from 'app/shared/model/medico.model';
import { IFisioterapeuta } from 'app/shared/model/fisioterapeuta.model';
import { IEnfermeiro } from 'app/shared/model/enfermeiro.model';
import { IPsicologo } from 'app/shared/model/psicologo.model';

export interface IAgenda {
  id?: number;
  data?: Moment;
  medico?: IMedico;
  fisioterapeuta?: IFisioterapeuta;
  enfermeiro?: IEnfermeiro;
  psicologo?: IPsicologo;
}

export class Agenda implements IAgenda {
  constructor(
    public id?: number,
    public data?: Moment,
    public medico?: IMedico,
    public fisioterapeuta?: IFisioterapeuta,
    public enfermeiro?: IEnfermeiro,
    public psicologo?: IPsicologo
  ) {}
}
