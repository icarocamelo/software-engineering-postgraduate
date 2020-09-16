import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILeito, Leito } from 'app/shared/model/leito.model';
import { LeitoService } from './leito.service';
import { LeitoComponent } from './leito.component';
import { LeitoDetailComponent } from './leito-detail.component';
import { LeitoUpdateComponent } from './leito-update.component';

@Injectable({ providedIn: 'root' })
export class LeitoResolve implements Resolve<ILeito> {
  constructor(private service: LeitoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILeito> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((leito: HttpResponse<Leito>) => {
          if (leito.body) {
            return of(leito.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Leito());
  }
}

export const leitoRoute: Routes = [
  {
    path: '',
    component: LeitoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.leito.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LeitoDetailComponent,
    resolve: {
      leito: LeitoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.leito.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LeitoUpdateComponent,
    resolve: {
      leito: LeitoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.leito.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LeitoUpdateComponent,
    resolve: {
      leito: LeitoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.leito.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
