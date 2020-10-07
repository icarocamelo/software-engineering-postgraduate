import { IPerfilAcesso } from 'app/shared/model/perfil-acesso.model';

export interface IPermissao {
  id?: number;
  nome?: string;
  perfilAcesso?: IPerfilAcesso;
}

export class Permissao implements IPermissao {
  constructor(public id?: number, public nome?: string, public perfilAcesso?: IPerfilAcesso) {}
}
