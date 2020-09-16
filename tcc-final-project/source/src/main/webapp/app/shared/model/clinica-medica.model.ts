export interface IClinicaMedica {
  id?: number;
}

export class ClinicaMedica implements IClinicaMedica {
  constructor(public id?: number) {}
}
