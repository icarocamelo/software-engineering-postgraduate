export interface IEndereco {
  id?: number;
  tipo?: string;
  numero?: string;
  pais?: string;
  estado?: string;
  cidade?: string;
  bairro?: string;
  cEP?: string;
  coordenadasGeograficas?: string;
}

export class Endereco implements IEndereco {
  constructor(
    public id?: number,
    public tipo?: string,
    public numero?: string,
    public pais?: string,
    public estado?: string,
    public cidade?: string,
    public bairro?: string,
    public cEP?: string,
    public coordenadasGeograficas?: string
  ) {}
}
