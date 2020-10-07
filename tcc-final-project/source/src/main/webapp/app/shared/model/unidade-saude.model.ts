export interface IUnidadeSaude {
  id?: number;
}

export class UnidadeSaude implements IUnidadeSaude {
  constructor(public id?: number) {}
}
