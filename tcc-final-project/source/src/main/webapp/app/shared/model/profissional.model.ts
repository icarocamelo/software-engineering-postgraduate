import { IPerfilAcesso } from 'app/shared/model/perfil-acesso.model';

export interface IProfissional {
  id?: number;
  uUID?: string;
  nome?: string;
  rG?: string;
  cPF?: string;
  perfilAcesso?: IPerfilAcesso;
}

export class Profissional implements IProfissional {
  constructor(
    public id?: number,
    public uUID?: string,
    public nome?: string,
    public rG?: string,
    public cPF?: string,
    public perfilAcesso?: IPerfilAcesso
  ) {}
}
