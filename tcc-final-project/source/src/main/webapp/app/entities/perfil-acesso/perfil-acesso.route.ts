import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPerfilAcesso, PerfilAcesso } from 'app/shared/model/perfil-acesso.model';
import { PerfilAcessoService } from './perfil-acesso.service';
import { PerfilAcessoComponent } from './perfil-acesso.component';
import { PerfilAcessoDetailComponent } from './perfil-acesso-detail.component';
import { PerfilAcessoUpdateComponent } from './perfil-acesso-update.component';

@Injectable({ providedIn: 'root' })
export class PerfilAcessoResolve implements Resolve<IPerfilAcesso> {
  constructor(private service: PerfilAcessoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPerfilAcesso> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((perfilAcesso: HttpResponse<PerfilAcesso>) => {
          if (perfilAcesso.body) {
            return of(perfilAcesso.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PerfilAcesso());
  }
}

export const perfilAcessoRoute: Routes = [
  {
    path: '',
    component: PerfilAcessoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.perfilAcesso.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PerfilAcessoDetailComponent,
    resolve: {
      perfilAcesso: PerfilAcessoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.perfilAcesso.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PerfilAcessoUpdateComponent,
    resolve: {
      perfilAcesso: PerfilAcessoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.perfilAcesso.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PerfilAcessoUpdateComponent,
    resolve: {
      perfilAcesso: PerfilAcessoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.perfilAcesso.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
