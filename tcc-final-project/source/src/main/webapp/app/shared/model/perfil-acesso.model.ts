import { IPermissao } from 'app/shared/model/permissao.model';

export interface IPerfilAcesso {
  id?: number;
  nome?: string;
  permissoes?: IPermissao[];
}

export class PerfilAcesso implements IPerfilAcesso {
  constructor(public id?: number, public nome?: string, public permissoes?: IPermissao[]) {}
}
