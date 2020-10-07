import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEnfermeiro, Enfermeiro } from 'app/shared/model/enfermeiro.model';
import { EnfermeiroService } from './enfermeiro.service';
import { EnfermeiroComponent } from './enfermeiro.component';
import { EnfermeiroDetailComponent } from './enfermeiro-detail.component';
import { EnfermeiroUpdateComponent } from './enfermeiro-update.component';

@Injectable({ providedIn: 'root' })
export class EnfermeiroResolve implements Resolve<IEnfermeiro> {
  constructor(private service: EnfermeiroService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEnfermeiro> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((enfermeiro: HttpResponse<Enfermeiro>) => {
          if (enfermeiro.body) {
            return of(enfermeiro.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Enfermeiro());
  }
}

export const enfermeiroRoute: Routes = [
  {
    path: '',
    component: EnfermeiroComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.enfermeiro.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EnfermeiroDetailComponent,
    resolve: {
      enfermeiro: EnfermeiroResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.enfermeiro.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EnfermeiroUpdateComponent,
    resolve: {
      enfermeiro: EnfermeiroResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.enfermeiro.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EnfermeiroUpdateComponent,
    resolve: {
      enfermeiro: EnfermeiroResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.enfermeiro.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
