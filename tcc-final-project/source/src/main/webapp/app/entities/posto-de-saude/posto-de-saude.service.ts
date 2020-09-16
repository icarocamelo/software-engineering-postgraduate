import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPostoDeSaude } from 'app/shared/model/posto-de-saude.model';

type EntityResponseType = HttpResponse<IPostoDeSaude>;
type EntityArrayResponseType = HttpResponse<IPostoDeSaude[]>;

@Injectable({ providedIn: 'root' })
export class PostoDeSaudeService {
  public resourceUrl = SERVER_API_URL + 'api/posto-de-saudes';

  constructor(protected http: HttpClient) {}

  create(postoDeSaude: IPostoDeSaude): Observable<EntityResponseType> {
    return this.http.post<IPostoDeSaude>(this.resourceUrl, postoDeSaude, { observe: 'response' });
  }

  update(postoDeSaude: IPostoDeSaude): Observable<EntityResponseType> {
    return this.http.put<IPostoDeSaude>(this.resourceUrl, postoDeSaude, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPostoDeSaude>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPostoDeSaude[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
