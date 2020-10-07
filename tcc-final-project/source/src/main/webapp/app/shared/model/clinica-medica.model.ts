import { IEndereco } from 'app/shared/model/endereco.model';
import { TipoUnidadeSaude } from 'app/shared/model/enumerations/tipo-unidade-saude.model';

export interface IClinicaMedica {
  id?: number;
  cNPJ?: string;
  telefone?: string;
  cEP?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  tipoUnidadeSaude?: TipoUnidadeSaude;
  endereco?: IEndereco;
}

export class ClinicaMedica implements IClinicaMedica {
  constructor(
    public id?: number,
    public cNPJ?: string,
    public telefone?: string,
    public cEP?: string,
    public razaoSocial?: string,
    public nomeFantasia?: string,
    public tipoUnidadeSaude?: TipoUnidadeSaude,
    public endereco?: IEndereco
  ) {}
}
