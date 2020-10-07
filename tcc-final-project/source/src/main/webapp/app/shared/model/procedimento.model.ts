import { IPaciente } from 'app/shared/model/paciente.model';
import { IProfissionalDeSaude } from 'app/shared/model/profissional-de-saude.model';
import { IEndereco } from 'app/shared/model/endereco.model';
import { IAgenda } from 'app/shared/model/agenda.model';
import { IProntuario } from 'app/shared/model/prontuario.model';

export interface IProcedimento {
  id?: number;
  descricao?: string;
  preco?: number;
  codigo?: string;
  paciente?: IPaciente;
  profissionalDeSaude?: IProfissionalDeSaude;
  endereco?: IEndereco;
  agenda?: IAgenda;
  prontuario?: IProntuario;
}

export class Procedimento implements IProcedimento {
  constructor(
    public id?: number,
    public descricao?: string,
    public preco?: number,
    public codigo?: string,
    public paciente?: IPaciente,
    public profissionalDeSaude?: IProfissionalDeSaude,
    public endereco?: IEndereco,
    public agenda?: IAgenda,
    public prontuario?: IProntuario
  ) {}
}
