import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMedicamento } from 'app/shared/model/medicamento.model';

type EntityResponseType = HttpResponse<IMedicamento>;
type EntityArrayResponseType = HttpResponse<IMedicamento[]>;

@Injectable({ providedIn: 'root' })
export class MedicamentoService {
  public resourceUrl = SERVER_API_URL + 'api/medicamentos';

  constructor(protected http: HttpClient) {}

  create(medicamento: IMedicamento): Observable<EntityResponseType> {
    return this.http.post<IMedicamento>(this.resourceUrl, medicamento, { observe: 'response' });
  }

  update(medicamento: IMedicamento): Observable<EntityResponseType> {
    return this.http.put<IMedicamento>(this.resourceUrl, medicamento, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMedicamento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMedicamento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
