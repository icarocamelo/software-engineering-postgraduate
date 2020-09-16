import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICartaoVacina } from 'app/shared/model/cartao-vacina.model';

type EntityResponseType = HttpResponse<ICartaoVacina>;
type EntityArrayResponseType = HttpResponse<ICartaoVacina[]>;

@Injectable({ providedIn: 'root' })
export class CartaoVacinaService {
  public resourceUrl = SERVER_API_URL + 'api/cartao-vacinas';

  constructor(protected http: HttpClient) {}

  create(cartaoVacina: ICartaoVacina): Observable<EntityResponseType> {
    return this.http.post<ICartaoVacina>(this.resourceUrl, cartaoVacina, { observe: 'response' });
  }

  update(cartaoVacina: ICartaoVacina): Observable<EntityResponseType> {
    return this.http.put<ICartaoVacina>(this.resourceUrl, cartaoVacina, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICartaoVacina>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICartaoVacina[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
