import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFisioterapeuta } from 'app/shared/model/fisioterapeuta.model';

type EntityResponseType = HttpResponse<IFisioterapeuta>;
type EntityArrayResponseType = HttpResponse<IFisioterapeuta[]>;

@Injectable({ providedIn: 'root' })
export class FisioterapeutaService {
  public resourceUrl = SERVER_API_URL + 'api/fisioterapeutas';

  constructor(protected http: HttpClient) {}

  create(fisioterapeuta: IFisioterapeuta): Observable<EntityResponseType> {
    return this.http.post<IFisioterapeuta>(this.resourceUrl, fisioterapeuta, { observe: 'response' });
  }

  update(fisioterapeuta: IFisioterapeuta): Observable<EntityResponseType> {
    return this.http.put<IFisioterapeuta>(this.resourceUrl, fisioterapeuta, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFisioterapeuta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFisioterapeuta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
