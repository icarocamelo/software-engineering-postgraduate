import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IExame, Exame } from 'app/shared/model/exame.model';
import { ExameService } from './exame.service';
import { ExameComponent } from './exame.component';
import { ExameDetailComponent } from './exame-detail.component';
import { ExameUpdateComponent } from './exame-update.component';

@Injectable({ providedIn: 'root' })
export class ExameResolve implements Resolve<IExame> {
  constructor(private service: ExameService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExame> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((exame: HttpResponse<Exame>) => {
          if (exame.body) {
            return of(exame.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Exame());
  }
}

export const exameRoute: Routes = [
  {
    path: '',
    component: ExameComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.exame.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExameDetailComponent,
    resolve: {
      exame: ExameResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.exame.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExameUpdateComponent,
    resolve: {
      exame: ExameResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.exame.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExameUpdateComponent,
    resolve: {
      exame: ExameResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.exame.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
