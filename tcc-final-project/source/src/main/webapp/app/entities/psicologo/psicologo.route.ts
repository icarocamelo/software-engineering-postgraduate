import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPsicologo, Psicologo } from 'app/shared/model/psicologo.model';
import { PsicologoService } from './psicologo.service';
import { PsicologoComponent } from './psicologo.component';
import { PsicologoDetailComponent } from './psicologo-detail.component';
import { PsicologoUpdateComponent } from './psicologo-update.component';

@Injectable({ providedIn: 'root' })
export class PsicologoResolve implements Resolve<IPsicologo> {
  constructor(private service: PsicologoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPsicologo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((psicologo: HttpResponse<Psicologo>) => {
          if (psicologo.body) {
            return of(psicologo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Psicologo());
  }
}

export const psicologoRoute: Routes = [
  {
    path: '',
    component: PsicologoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.psicologo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PsicologoDetailComponent,
    resolve: {
      psicologo: PsicologoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.psicologo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PsicologoUpdateComponent,
    resolve: {
      psicologo: PsicologoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.psicologo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PsicologoUpdateComponent,
    resolve: {
      psicologo: PsicologoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.psicologo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
