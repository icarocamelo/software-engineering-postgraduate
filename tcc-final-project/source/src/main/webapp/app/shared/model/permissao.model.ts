export interface IPermissao {
  id?: number;
  uUID?: string;
}

export class Permissao implements IPermissao {
  constructor(public id?: number, public uUID?: string) {}
}
