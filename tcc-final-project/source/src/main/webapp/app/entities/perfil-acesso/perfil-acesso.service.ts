import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPerfilAcesso } from 'app/shared/model/perfil-acesso.model';

type EntityResponseType = HttpResponse<IPerfilAcesso>;
type EntityArrayResponseType = HttpResponse<IPerfilAcesso[]>;

@Injectable({ providedIn: 'root' })
export class PerfilAcessoService {
  public resourceUrl = SERVER_API_URL + 'api/perfil-acessos';

  constructor(protected http: HttpClient) {}

  create(perfilAcesso: IPerfilAcesso): Observable<EntityResponseType> {
    return this.http.post<IPerfilAcesso>(this.resourceUrl, perfilAcesso, { observe: 'response' });
  }

  update(perfilAcesso: IPerfilAcesso): Observable<EntityResponseType> {
    return this.http.put<IPerfilAcesso>(this.resourceUrl, perfilAcesso, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPerfilAcesso>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPerfilAcesso[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
