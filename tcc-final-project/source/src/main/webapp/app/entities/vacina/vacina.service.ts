import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVacina } from 'app/shared/model/vacina.model';

type EntityResponseType = HttpResponse<IVacina>;
type EntityArrayResponseType = HttpResponse<IVacina[]>;

@Injectable({ providedIn: 'root' })
export class VacinaService {
  public resourceUrl = SERVER_API_URL + 'api/vacinas';

  constructor(protected http: HttpClient) {}

  create(vacina: IVacina): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vacina);
    return this.http
      .post<IVacina>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(vacina: IVacina): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vacina);
    return this.http
      .put<IVacina>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVacina>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVacina[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(vacina: IVacina): IVacina {
    const copy: IVacina = Object.assign({}, vacina, {
      dataAplicacao: vacina.dataAplicacao && vacina.dataAplicacao.isValid() ? vacina.dataAplicacao.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataAplicacao = res.body.dataAplicacao ? moment(res.body.dataAplicacao) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((vacina: IVacina) => {
        vacina.dataAplicacao = vacina.dataAplicacao ? moment(vacina.dataAplicacao) : undefined;
      });
    }
    return res;
  }
}
