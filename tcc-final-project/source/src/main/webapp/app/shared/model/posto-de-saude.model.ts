export interface IPostoDeSaude {
  id?: number;
}

export class PostoDeSaude implements IPostoDeSaude {
  constructor(public id?: number) {}
}
