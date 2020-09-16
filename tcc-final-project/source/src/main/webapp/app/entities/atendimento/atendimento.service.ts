import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAtendimento } from 'app/shared/model/atendimento.model';

type EntityResponseType = HttpResponse<IAtendimento>;
type EntityArrayResponseType = HttpResponse<IAtendimento[]>;

@Injectable({ providedIn: 'root' })
export class AtendimentoService {
  public resourceUrl = SERVER_API_URL + 'api/atendimentos';

  constructor(protected http: HttpClient) {}

  create(atendimento: IAtendimento): Observable<EntityResponseType> {
    return this.http.post<IAtendimento>(this.resourceUrl, atendimento, { observe: 'response' });
  }

  update(atendimento: IAtendimento): Observable<EntityResponseType> {
    return this.http.put<IAtendimento>(this.resourceUrl, atendimento, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAtendimento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAtendimento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
