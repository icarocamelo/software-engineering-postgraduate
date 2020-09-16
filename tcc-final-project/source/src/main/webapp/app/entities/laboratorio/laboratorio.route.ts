import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILaboratorio, Laboratorio } from 'app/shared/model/laboratorio.model';
import { LaboratorioService } from './laboratorio.service';
import { LaboratorioComponent } from './laboratorio.component';
import { LaboratorioDetailComponent } from './laboratorio-detail.component';
import { LaboratorioUpdateComponent } from './laboratorio-update.component';

@Injectable({ providedIn: 'root' })
export class LaboratorioResolve implements Resolve<ILaboratorio> {
  constructor(private service: LaboratorioService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILaboratorio> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((laboratorio: HttpResponse<Laboratorio>) => {
          if (laboratorio.body) {
            return of(laboratorio.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Laboratorio());
  }
}

export const laboratorioRoute: Routes = [
  {
    path: '',
    component: LaboratorioComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.laboratorio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LaboratorioDetailComponent,
    resolve: {
      laboratorio: LaboratorioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.laboratorio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LaboratorioUpdateComponent,
    resolve: {
      laboratorio: LaboratorioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.laboratorio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LaboratorioUpdateComponent,
    resolve: {
      laboratorio: LaboratorioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.laboratorio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
