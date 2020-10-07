import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfissional } from 'app/shared/model/profissional.model';

type EntityResponseType = HttpResponse<IProfissional>;
type EntityArrayResponseType = HttpResponse<IProfissional[]>;

@Injectable({ providedIn: 'root' })
export class ProfissionalService {
  public resourceUrl = SERVER_API_URL + 'api/profissionals';

  constructor(protected http: HttpClient) {}

  create(profissional: IProfissional): Observable<EntityResponseType> {
    return this.http.post<IProfissional>(this.resourceUrl, profissional, { observe: 'response' });
  }

  update(profissional: IProfissional): Observable<EntityResponseType> {
    return this.http.put<IProfissional>(this.resourceUrl, profissional, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfissional>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfissional[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
