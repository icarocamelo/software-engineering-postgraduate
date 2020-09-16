export interface ILaboratorio {
  id?: number;
}

export class Laboratorio implements ILaboratorio {
  constructor(public id?: number) {}
}
