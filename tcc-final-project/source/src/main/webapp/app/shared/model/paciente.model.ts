import { Moment } from 'moment';
import { IPerfilAcesso } from 'app/shared/model/perfil-acesso.model';

export interface IPaciente {
  id?: number;
  uUID?: string;
  nome?: string;
  rG?: string;
  cPF?: string;
  endereco?: string;
  dataNascimento?: Moment;
  telefone?: string;
  peso?: number;
  altura?: number;
  responsavel?: string;
  rNE?: string;
  perfilAcesso?: IPerfilAcesso;
}

export class Paciente implements IPaciente {
  constructor(
    public id?: number,
    public uUID?: string,
    public nome?: string,
    public rG?: string,
    public cPF?: string,
    public endereco?: string,
    public dataNascimento?: Moment,
    public telefone?: string,
    public peso?: number,
    public altura?: number,
    public responsavel?: string,
    public rNE?: string,
    public perfilAcesso?: IPerfilAcesso
  ) {}
}
