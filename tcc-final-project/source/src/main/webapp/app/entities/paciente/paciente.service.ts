import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPaciente } from 'app/shared/model/paciente.model';

type EntityResponseType = HttpResponse<IPaciente>;
type EntityArrayResponseType = HttpResponse<IPaciente[]>;

@Injectable({ providedIn: 'root' })
export class PacienteService {
  public resourceUrl = SERVER_API_URL + 'api/pacientes';

  constructor(protected http: HttpClient) {}

  create(paciente: IPaciente): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paciente);
    return this.http
      .post<IPaciente>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(paciente: IPaciente): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paciente);
    return this.http
      .put<IPaciente>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPaciente>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPaciente[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(paciente: IPaciente): IPaciente {
    const copy: IPaciente = Object.assign({}, paciente, {
      dataNascimento:
        paciente.dataNascimento && paciente.dataNascimento.isValid() ? paciente.dataNascimento.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataNascimento = res.body.dataNascimento ? moment(res.body.dataNascimento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((paciente: IPaciente) => {
        paciente.dataNascimento = paciente.dataNascimento ? moment(paciente.dataNascimento) : undefined;
      });
    }
    return res;
  }
}
