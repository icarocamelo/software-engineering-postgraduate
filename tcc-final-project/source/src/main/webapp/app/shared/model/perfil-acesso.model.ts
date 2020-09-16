import { IPermissao } from 'app/shared/model/permissao.model';

export interface IPerfilAcesso {
  id?: number;
  uUID?: string;
  permissao?: IPermissao;
}

export class PerfilAcesso implements IPerfilAcesso {
  constructor(public id?: number, public uUID?: string, public permissao?: IPermissao) {}
}
