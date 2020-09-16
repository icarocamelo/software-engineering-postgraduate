export interface IHospital {
  id?: number;
}

export class Hospital implements IHospital {
  constructor(public id?: number) {}
}
