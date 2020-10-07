import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAgendaConsulta, AgendaConsulta } from 'app/shared/model/agenda-consulta.model';
import { AgendaConsultaService } from './agenda-consulta.service';
import { AgendaConsultaComponent } from './agenda-consulta.component';
import { AgendaConsultaDetailComponent } from './agenda-consulta-detail.component';
import { AgendaConsultaUpdateComponent } from './agenda-consulta-update.component';

@Injectable({ providedIn: 'root' })
export class AgendaConsultaResolve implements Resolve<IAgendaConsulta> {
  constructor(private service: AgendaConsultaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAgendaConsulta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((agendaConsulta: HttpResponse<AgendaConsulta>) => {
          if (agendaConsulta.body) {
            return of(agendaConsulta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AgendaConsulta());
  }
}

export const agendaConsultaRoute: Routes = [
  {
    path: '',
    component: AgendaConsultaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.agendaConsulta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AgendaConsultaDetailComponent,
    resolve: {
      agendaConsulta: AgendaConsultaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.agendaConsulta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AgendaConsultaUpdateComponent,
    resolve: {
      agendaConsulta: AgendaConsultaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.agendaConsulta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AgendaConsultaUpdateComponent,
    resolve: {
      agendaConsulta: AgendaConsultaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.agendaConsulta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
