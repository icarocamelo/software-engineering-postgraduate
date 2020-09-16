import { TipoUnidadeSaude } from 'app/shared/model/enumerations/tipo-unidade-saude.model';

export interface IUnidadeSaude {
  id?: number;
  uUID?: string;
  endereco?: string;
  cNPJ?: string;
  telefone?: string;
  cEP?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  tipoUnidadeSaude?: TipoUnidadeSaude;
}

export class UnidadeSaude implements IUnidadeSaude {
  constructor(
    public id?: number,
    public uUID?: string,
    public endereco?: string,
    public cNPJ?: string,
    public telefone?: string,
    public cEP?: string,
    public razaoSocial?: string,
    public nomeFantasia?: string,
    public tipoUnidadeSaude?: TipoUnidadeSaude
  ) {}
}
