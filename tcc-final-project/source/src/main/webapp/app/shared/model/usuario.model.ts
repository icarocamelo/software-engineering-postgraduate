import { Perfil } from 'app/shared/model/enumerations/perfil.model';

export interface IUsuario {
  id?: number;
  login?: string;
  nome?: string;
  sobrenome?: string;
  email?: string;
  ativo?: boolean;
  perfil?: Perfil;
}

export class Usuario implements IUsuario {
  constructor(
    public id?: number,
    public login?: string,
    public nome?: string,
    public sobrenome?: string,
    public email?: string,
    public ativo?: boolean,
    public perfil?: Perfil
  ) {
    this.ativo = this.ativo || false;
  }
}
