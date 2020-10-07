import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
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
    const copy = this.convertDateFromClient(agendaConsulta);
    return this.http
      .post<IAgendaConsulta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(agendaConsulta: IAgendaConsulta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(agendaConsulta);
    return this.http
      .put<IAgendaConsulta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAgendaConsulta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAgendaConsulta[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(agendaConsulta: IAgendaConsulta): IAgendaConsulta {
    const copy: IAgendaConsulta = Object.assign({}, agendaConsulta, {
      data: agendaConsulta.data && agendaConsulta.data.isValid() ? agendaConsulta.data.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((agendaConsulta: IAgendaConsulta) => {
        agendaConsulta.data = agendaConsulta.data ? moment(agendaConsulta.data) : undefined;
      });
    }
    return res;
  }
}
