export interface ILeito {
  id?: number;
  uUID?: string;
}

export class Leito implements ILeito {
  constructor(public id?: number, public uUID?: string) {}
}
