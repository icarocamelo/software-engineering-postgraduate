import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUnidadeSaude } from 'app/shared/model/unidade-saude.model';

type EntityResponseType = HttpResponse<IUnidadeSaude>;
type EntityArrayResponseType = HttpResponse<IUnidadeSaude[]>;

@Injectable({ providedIn: 'root' })
export class UnidadeSaudeService {
  public resourceUrl = SERVER_API_URL + 'api/unidade-saudes';

  constructor(protected http: HttpClient) {}

  create(unidadeSaude: IUnidadeSaude): Observable<EntityResponseType> {
    return this.http.post<IUnidadeSaude>(this.resourceUrl, unidadeSaude, { observe: 'response' });
  }

  update(unidadeSaude: IUnidadeSaude): Observable<EntityResponseType> {
    return this.http.put<IUnidadeSaude>(this.resourceUrl, unidadeSaude, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUnidadeSaude>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUnidadeSaude[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
