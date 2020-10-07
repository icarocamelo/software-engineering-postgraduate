import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPermissao, Permissao } from 'app/shared/model/permissao.model';
import { PermissaoService } from './permissao.service';
import { PermissaoComponent } from './permissao.component';
import { PermissaoDetailComponent } from './permissao-detail.component';
import { PermissaoUpdateComponent } from './permissao-update.component';

@Injectable({ providedIn: 'root' })
export class PermissaoResolve implements Resolve<IPermissao> {
  constructor(private service: PermissaoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPermissao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((permissao: HttpResponse<Permissao>) => {
          if (permissao.body) {
            return of(permissao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Permissao());
  }
}

export const permissaoRoute: Routes = [
  {
    path: '',
    component: PermissaoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.permissao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PermissaoDetailComponent,
    resolve: {
      permissao: PermissaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.permissao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PermissaoUpdateComponent,
    resolve: {
      permissao: PermissaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.permissao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PermissaoUpdateComponent,
    resolve: {
      permissao: PermissaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.permissao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
