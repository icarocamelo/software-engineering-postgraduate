import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAgendaConsulta } from 'app/shared/model/agenda-consulta.model';

type EntityResponseType = HttpResponse<IAgendaConsulta>;
type EntityArrayResponseType = HttpResponse<IAgendaConsulta[]>;

@Injectable({ providedIn: 'root' })
export class AgendaConsultaService {
  public resourceUrl = SERVER_API_URL + 'api/agenda-consultas';

  constructor(protected http: HttpClient) {}

  create(agendaConsulta: IAgendaConsulta): Observable<EntityResponseType> {
    return this.http.post<IAgendaConsulta>(this.resourceUrl, agendaConsulta, { observe: 'response' });
  }

  update(agendaConsulta: IAgendaConsulta): Observable<EntityResponseType> {
    return this.http.put<IAgendaConsulta>(this.resourceUrl, agendaConsulta, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgendaConsulta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAgendaConsulta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
