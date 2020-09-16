import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProcedimento } from 'app/shared/model/procedimento.model';

type EntityResponseType = HttpResponse<IProcedimento>;
type EntityArrayResponseType = HttpResponse<IProcedimento[]>;

@Injectable({ providedIn: 'root' })
export class ProcedimentoService {
  public resourceUrl = SERVER_API_URL + 'api/procedimentos';

  constructor(protected http: HttpClient) {}

  create(procedimento: IProcedimento): Observable<EntityResponseType> {
    return this.http.post<IProcedimento>(this.resourceUrl, procedimento, { observe: 'response' });
  }

  update(procedimento: IProcedimento): Observable<EntityResponseType> {
    return this.http.put<IProcedimento>(this.resourceUrl, procedimento, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProcedimento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProcedimento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
