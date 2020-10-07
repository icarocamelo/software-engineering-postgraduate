import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProntuario, Prontuario } from 'app/shared/model/prontuario.model';
import { ProntuarioService } from './prontuario.service';
import { ProntuarioComponent } from './prontuario.component';
import { ProntuarioDetailComponent } from './prontuario-detail.component';
import { ProntuarioUpdateComponent } from './prontuario-update.component';

@Injectable({ providedIn: 'root' })
export class ProntuarioResolve implements Resolve<IProntuario> {
  constructor(private service: ProntuarioService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProntuario> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((prontuario: HttpResponse<Prontuario>) => {
          if (prontuario.body) {
            return of(prontuario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Prontuario());
  }
}

export const prontuarioRoute: Routes = [
  {
    path: '',
    component: ProntuarioComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.prontuario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProntuarioDetailComponent,
    resolve: {
      prontuario: ProntuarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.prontuario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProntuarioUpdateComponent,
    resolve: {
      prontuario: ProntuarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.prontuario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProntuarioUpdateComponent,
    resolve: {
      prontuario: ProntuarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.prontuario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
