import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConsulta } from 'app/shared/model/consulta.model';

type EntityResponseType = HttpResponse<IConsulta>;
type EntityArrayResponseType = HttpResponse<IConsulta[]>;

@Injectable({ providedIn: 'root' })
export class ConsultaService {
  public resourceUrl = SERVER_API_URL + 'api/consultas';

  constructor(protected http: HttpClient) {}

  create(consulta: IConsulta): Observable<EntityResponseType> {
    return this.http.post<IConsulta>(this.resourceUrl, consulta, { observe: 'response' });
  }

  update(consulta: IConsulta): Observable<EntityResponseType> {
    return this.http.put<IConsulta>(this.resourceUrl, consulta, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConsulta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConsulta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
