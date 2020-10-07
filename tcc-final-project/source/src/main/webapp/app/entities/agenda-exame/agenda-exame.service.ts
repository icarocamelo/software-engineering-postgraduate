import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
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
    const copy = this.convertDateFromClient(agendaExame);
    return this.http
      .post<IAgendaExame>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(agendaExame: IAgendaExame): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(agendaExame);
    return this.http
      .put<IAgendaExame>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAgendaExame>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAgendaExame[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(agendaExame: IAgendaExame): IAgendaExame {
    const copy: IAgendaExame = Object.assign({}, agendaExame, {
      data: agendaExame.data && agendaExame.data.isValid() ? agendaExame.data.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.data = res.body.data ? moment(res.body.data) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((agendaExame: IAgendaExame) => {
        agendaExame.data = agendaExame.data ? moment(agendaExame.data) : undefined;
      });
    }
    return res;
  }
}
