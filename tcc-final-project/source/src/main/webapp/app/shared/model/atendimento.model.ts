import { Moment } from 'moment';
import { IPaciente } from 'app/shared/model/paciente.model';
import { IProfissionalDeSaude } from 'app/shared/model/profissional-de-saude.model';
import { IEndereco } from 'app/shared/model/endereco.model';
import { IAgenda } from 'app/shared/model/agenda.model';
import { IProntuario } from 'app/shared/model/prontuario.model';

export interface IAtendimento {
  id?: number;
  data?: Moment;
  paciente?: IPaciente;
  profissionalDeSaude?: IProfissionalDeSaude;
  endereco?: IEndereco;
  agenda?: IAgenda;
  prontuario?: IProntuario;
}

export class Atendimento implements IAtendimento {
  constructor(
    public id?: number,
    public data?: Moment,
    public paciente?: IPaciente,
    public profissionalDeSaude?: IProfissionalDeSaude,
    public endereco?: IEndereco,
    public agenda?: IAgenda,
    public prontuario?: IProntuario
  ) {}
}
