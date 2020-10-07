import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProntuario } from 'app/shared/model/prontuario.model';

type EntityResponseType = HttpResponse<IProntuario>;
type EntityArrayResponseType = HttpResponse<IProntuario[]>;

@Injectable({ providedIn: 'root' })
export class ProntuarioService {
  public resourceUrl = SERVER_API_URL + 'api/prontuarios';

  constructor(protected http: HttpClient) {}

  create(prontuario: IProntuario): Observable<EntityResponseType> {
    return this.http.post<IProntuario>(this.resourceUrl, prontuario, { observe: 'response' });
  }

  update(prontuario: IProntuario): Observable<EntityResponseType> {
    return this.http.put<IProntuario>(this.resourceUrl, prontuario, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProntuario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProntuario[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
