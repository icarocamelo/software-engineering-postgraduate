import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAgendaExame } from 'app/shared/model/agenda-exame.model';

type EntityResponseType = HttpResponse<IAgendaExame>;
type EntityArrayResponseType = HttpResponse<IAgendaExame[]>;

@Injectable({ providedIn: 'root' })
export class AgendaExameService {
  public resourceUrl = SERVER_API_URL + 'api/agenda-exames';

  constructor(protected http: HttpClient) {}

  create(agendaExame: IAgendaExame): Observable<EntityResponseType> {
    return this.http.post<IAgendaExame>(this.resourceUrl, agendaExame, { observe: 'response' });
  }

  update(agendaExame: IAgendaExame): Observable<EntityResponseType> {
    return this.http.put<IAgendaExame>(this.resourceUrl, agendaExame, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgendaExame>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAgendaExame[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
