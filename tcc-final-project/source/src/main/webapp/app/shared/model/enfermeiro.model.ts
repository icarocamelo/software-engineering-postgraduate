export interface IEnfermeiro {
  id?: number;
}

export class Enfermeiro implements IEnfermeiro {
  constructor(public id?: number) {}
}
