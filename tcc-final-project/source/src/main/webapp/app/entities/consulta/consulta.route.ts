import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IConsulta, Consulta } from 'app/shared/model/consulta.model';
import { ConsultaService } from './consulta.service';
import { ConsultaComponent } from './consulta.component';
import { ConsultaDetailComponent } from './consulta-detail.component';
import { ConsultaUpdateComponent } from './consulta-update.component';

@Injectable({ providedIn: 'root' })
export class ConsultaResolve implements Resolve<IConsulta> {
  constructor(private service: ConsultaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsulta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((consulta: HttpResponse<Consulta>) => {
          if (consulta.body) {
            return of(consulta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Consulta());
  }
}

export const consultaRoute: Routes = [
  {
    path: '',
    component: ConsultaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.consulta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConsultaDetailComponent,
    resolve: {
      consulta: ConsultaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.consulta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConsultaUpdateComponent,
    resolve: {
      consulta: ConsultaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.consulta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConsultaUpdateComponent,
    resolve: {
      consulta: ConsultaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.consulta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
