import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUnidadeSaude, UnidadeSaude } from 'app/shared/model/unidade-saude.model';
import { UnidadeSaudeService } from './unidade-saude.service';
import { UnidadeSaudeComponent } from './unidade-saude.component';
import { UnidadeSaudeDetailComponent } from './unidade-saude-detail.component';
import { UnidadeSaudeUpdateComponent } from './unidade-saude-update.component';

@Injectable({ providedIn: 'root' })
export class UnidadeSaudeResolve implements Resolve<IUnidadeSaude> {
  constructor(private service: UnidadeSaudeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUnidadeSaude> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((unidadeSaude: HttpResponse<UnidadeSaude>) => {
          if (unidadeSaude.body) {
            return of(unidadeSaude.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UnidadeSaude());
  }
}

export const unidadeSaudeRoute: Routes = [
  {
    path: '',
    component: UnidadeSaudeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.unidadeSaude.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UnidadeSaudeDetailComponent,
    resolve: {
      unidadeSaude: UnidadeSaudeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.unidadeSaude.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UnidadeSaudeUpdateComponent,
    resolve: {
      unidadeSaude: UnidadeSaudeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.unidadeSaude.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UnidadeSaudeUpdateComponent,
    resolve: {
      unidadeSaude: UnidadeSaudeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.unidadeSaude.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
