import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAgendaExame, AgendaExame } from 'app/shared/model/agenda-exame.model';
import { AgendaExameService } from './agenda-exame.service';
import { AgendaExameComponent } from './agenda-exame.component';
import { AgendaExameDetailComponent } from './agenda-exame-detail.component';
import { AgendaExameUpdateComponent } from './agenda-exame-update.component';

@Injectable({ providedIn: 'root' })
export class AgendaExameResolve implements Resolve<IAgendaExame> {
  constructor(private service: AgendaExameService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAgendaExame> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((agendaExame: HttpResponse<AgendaExame>) => {
          if (agendaExame.body) {
            return of(agendaExame.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AgendaExame());
  }
}

export const agendaExameRoute: Routes = [
  {
    path: '',
    component: AgendaExameComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.agendaExame.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AgendaExameDetailComponent,
    resolve: {
      agendaExame: AgendaExameResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.agendaExame.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AgendaExameUpdateComponent,
    resolve: {
      agendaExame: AgendaExameResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.agendaExame.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AgendaExameUpdateComponent,
    resolve: {
      agendaExame: AgendaExameResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.agendaExame.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
