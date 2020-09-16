import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILaboratorio } from 'app/shared/model/laboratorio.model';

type EntityResponseType = HttpResponse<ILaboratorio>;
type EntityArrayResponseType = HttpResponse<ILaboratorio[]>;

@Injectable({ providedIn: 'root' })
export class LaboratorioService {
  public resourceUrl = SERVER_API_URL + 'api/laboratorios';

  constructor(protected http: HttpClient) {}

  create(laboratorio: ILaboratorio): Observable<EntityResponseType> {
    return this.http.post<ILaboratorio>(this.resourceUrl, laboratorio, { observe: 'response' });
  }

  update(laboratorio: ILaboratorio): Observable<EntityResponseType> {
    return this.http.put<ILaboratorio>(this.resourceUrl, laboratorio, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILaboratorio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILaboratorio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
