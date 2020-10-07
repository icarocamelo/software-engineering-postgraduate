import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEnfermeiro } from 'app/shared/model/enfermeiro.model';

type EntityResponseType = HttpResponse<IEnfermeiro>;
type EntityArrayResponseType = HttpResponse<IEnfermeiro[]>;

@Injectable({ providedIn: 'root' })
export class EnfermeiroService {
  public resourceUrl = SERVER_API_URL + 'api/enfermeiros';

  constructor(protected http: HttpClient) {}

  create(enfermeiro: IEnfermeiro): Observable<EntityResponseType> {
    return this.http.post<IEnfermeiro>(this.resourceUrl, enfermeiro, { observe: 'response' });
  }

  update(enfermeiro: IEnfermeiro): Observable<EntityResponseType> {
    return this.http.put<IEnfermeiro>(this.resourceUrl, enfermeiro, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEnfermeiro>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEnfermeiro[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
