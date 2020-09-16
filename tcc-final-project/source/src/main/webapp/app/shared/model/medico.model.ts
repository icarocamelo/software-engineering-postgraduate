export interface IMedico {
  id?: number;
}

export class Medico implements IMedico {
  constructor(public id?: number) {}
}
