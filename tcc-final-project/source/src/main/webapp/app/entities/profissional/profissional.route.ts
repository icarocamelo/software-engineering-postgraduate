import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProfissional, Profissional } from 'app/shared/model/profissional.model';
import { ProfissionalService } from './profissional.service';
import { ProfissionalComponent } from './profissional.component';
import { ProfissionalDetailComponent } from './profissional-detail.component';
import { ProfissionalUpdateComponent } from './profissional-update.component';

@Injectable({ providedIn: 'root' })
export class ProfissionalResolve implements Resolve<IProfissional> {
  constructor(private service: ProfissionalService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfissional> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((profissional: HttpResponse<Profissional>) => {
          if (profissional.body) {
            return of(profissional.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Profissional());
  }
}

export const profissionalRoute: Routes = [
  {
    path: '',
    component: ProfissionalComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.profissional.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProfissionalDetailComponent,
    resolve: {
      profissional: ProfissionalResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.profissional.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProfissionalUpdateComponent,
    resolve: {
      profissional: ProfissionalResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.profissional.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProfissionalUpdateComponent,
    resolve: {
      profissional: ProfissionalResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.profissional.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
