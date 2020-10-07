import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILeito } from 'app/shared/model/leito.model';

type EntityResponseType = HttpResponse<ILeito>;
type EntityArrayResponseType = HttpResponse<ILeito[]>;

@Injectable({ providedIn: 'root' })
export class LeitoService {
  public resourceUrl = SERVER_API_URL + 'api/leitos';

  constructor(protected http: HttpClient) {}

  create(leito: ILeito): Observable<EntityResponseType> {
    return this.http.post<ILeito>(this.resourceUrl, leito, { observe: 'response' });
  }

  update(leito: ILeito): Observable<EntityResponseType> {
    return this.http.put<ILeito>(this.resourceUrl, leito, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILeito>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILeito[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
