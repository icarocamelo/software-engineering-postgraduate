export interface IPsicologo {
  id?: number;
}

export class Psicologo implements IPsicologo {
  constructor(public id?: number) {}
}
