import { IProntuario } from 'app/shared/model/prontuario.model';

export interface IProfissionalDeSaude {
  id?: number;
  prontuarios?: IProntuario[];
}

export class ProfissionalDeSaude implements IProfissionalDeSaude {
  constructor(public id?: number, public prontuarios?: IProntuario[]) {}
}
