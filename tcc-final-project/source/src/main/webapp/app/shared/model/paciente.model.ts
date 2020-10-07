import { Moment } from 'moment';
import { IPerfilAcesso } from 'app/shared/model/perfil-acesso.model';
import { IEndereco } from 'app/shared/model/endereco.model';

export interface IPaciente {
  id?: number;
  nome?: string;
  rG?: string;
  cPF?: string;
  dataNascimento?: Moment;
  telefone?: string;
  peso?: number;
  altura?: number;
  responsavel?: string;
  rNE?: string;
  perfilAcesso?: IPerfilAcesso;
  endereco?: IEndereco;
}

export class Paciente implements IPaciente {
  constructor(
    public id?: number,
    public nome?: string,
    public rG?: string,
    public cPF?: string,
    public dataNascimento?: Moment,
    public telefone?: string,
    public peso?: number,
    public altura?: number,
    public responsavel?: string,
    public rNE?: string,
    public perfilAcesso?: IPerfilAcesso,
    public endereco?: IEndereco
  ) {}
}
