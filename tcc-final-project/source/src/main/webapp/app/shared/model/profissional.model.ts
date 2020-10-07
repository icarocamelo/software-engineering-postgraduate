import { IPerfilAcesso } from 'app/shared/model/perfil-acesso.model';

export interface IProfissional {
  id?: number;
  perfilAcesso?: IPerfilAcesso;
}

export class Profissional implements IProfissional {
  constructor(public id?: number, public perfilAcesso?: IPerfilAcesso) {}
}
