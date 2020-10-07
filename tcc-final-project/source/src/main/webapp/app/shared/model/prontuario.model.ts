import { IPaciente } from 'app/shared/model/paciente.model';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { IProcedimento } from 'app/shared/model/procedimento.model';
import { IProfissionalDeSaude } from 'app/shared/model/profissional-de-saude.model';

export interface IProntuario {
  id?: number;
  paciente?: IPaciente;
  atendimentos?: IAtendimento[];
  procedimentos?: IProcedimento[];
  profissionalDeSaude?: IProfissionalDeSaude;
}

export class Prontuario implements IProntuario {
  constructor(
    public id?: number,
    public paciente?: IPaciente,
    public atendimentos?: IAtendimento[],
    public procedimentos?: IProcedimento[],
    public profissionalDeSaude?: IProfissionalDeSaude
  ) {}
}
