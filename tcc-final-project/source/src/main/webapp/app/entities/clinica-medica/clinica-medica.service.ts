import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IClinicaMedica } from 'app/shared/model/clinica-medica.model';

type EntityResponseType = HttpResponse<IClinicaMedica>;
type EntityArrayResponseType = HttpResponse<IClinicaMedica[]>;

@Injectable({ providedIn: 'root' })
export class ClinicaMedicaService {
  public resourceUrl = SERVER_API_URL + 'api/clinica-medicas';

  constructor(protected http: HttpClient) {}

  create(clinicaMedica: IClinicaMedica): Observable<EntityResponseType> {
    return this.http.post<IClinicaMedica>(this.resourceUrl, clinicaMedica, { observe: 'response' });
  }

  update(clinicaMedica: IClinicaMedica): Observable<EntityResponseType> {
    return this.http.put<IClinicaMedica>(this.resourceUrl, clinicaMedica, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClinicaMedica>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClinicaMedica[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
