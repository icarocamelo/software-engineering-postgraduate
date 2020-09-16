import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfissionalDeSaude } from 'app/shared/model/profissional-de-saude.model';

type EntityResponseType = HttpResponse<IProfissionalDeSaude>;
type EntityArrayResponseType = HttpResponse<IProfissionalDeSaude[]>;

@Injectable({ providedIn: 'root' })
export class ProfissionalDeSaudeService {
  public resourceUrl = SERVER_API_URL + 'api/profissional-de-saudes';

  constructor(protected http: HttpClient) {}

  create(profissionalDeSaude: IProfissionalDeSaude): Observable<EntityResponseType> {
    return this.http.post<IProfissionalDeSaude>(this.resourceUrl, profissionalDeSaude, { observe: 'response' });
  }

  update(profissionalDeSaude: IProfissionalDeSaude): Observable<EntityResponseType> {
    return this.http.put<IProfissionalDeSaude>(this.resourceUrl, profissionalDeSaude, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfissionalDeSaude>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfissionalDeSaude[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
