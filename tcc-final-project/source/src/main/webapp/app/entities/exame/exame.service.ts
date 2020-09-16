import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExame } from 'app/shared/model/exame.model';

type EntityResponseType = HttpResponse<IExame>;
type EntityArrayResponseType = HttpResponse<IExame[]>;

@Injectable({ providedIn: 'root' })
export class ExameService {
  public resourceUrl = SERVER_API_URL + 'api/exames';

  constructor(protected http: HttpClient) {}

  create(exame: IExame): Observable<EntityResponseType> {
    return this.http.post<IExame>(this.resourceUrl, exame, { observe: 'response' });
  }

  update(exame: IExame): Observable<EntityResponseType> {
    return this.http.put<IExame>(this.resourceUrl, exame, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExame>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExame[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
