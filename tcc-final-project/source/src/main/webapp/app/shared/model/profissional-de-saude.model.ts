export interface IProfissionalDeSaude {
  id?: number;
  numeroRegistro?: string;
}

export class ProfissionalDeSaude implements IProfissionalDeSaude {
  constructor(public id?: number, public numeroRegistro?: string) {}
}
