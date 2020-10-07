import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPsicologo } from 'app/shared/model/psicologo.model';

type EntityResponseType = HttpResponse<IPsicologo>;
type EntityArrayResponseType = HttpResponse<IPsicologo[]>;

@Injectable({ providedIn: 'root' })
export class PsicologoService {
  public resourceUrl = SERVER_API_URL + 'api/psicologos';

  constructor(protected http: HttpClient) {}

  create(psicologo: IPsicologo): Observable<EntityResponseType> {
    return this.http.post<IPsicologo>(this.resourceUrl, psicologo, { observe: 'response' });
  }

  update(psicologo: IPsicologo): Observable<EntityResponseType> {
    return this.http.put<IPsicologo>(this.resourceUrl, psicologo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPsicologo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPsicologo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
