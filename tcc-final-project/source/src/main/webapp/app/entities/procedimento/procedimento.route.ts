import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProcedimento, Procedimento } from 'app/shared/model/procedimento.model';
import { ProcedimentoService } from './procedimento.service';
import { ProcedimentoComponent } from './procedimento.component';
import { ProcedimentoDetailComponent } from './procedimento-detail.component';
import { ProcedimentoUpdateComponent } from './procedimento-update.component';

@Injectable({ providedIn: 'root' })
export class ProcedimentoResolve implements Resolve<IProcedimento> {
  constructor(private service: ProcedimentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProcedimento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((procedimento: HttpResponse<Procedimento>) => {
          if (procedimento.body) {
            return of(procedimento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Procedimento());
  }
}

export const procedimentoRoute: Routes = [
  {
    path: '',
    component: ProcedimentoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.procedimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProcedimentoDetailComponent,
    resolve: {
      procedimento: ProcedimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.procedimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProcedimentoUpdateComponent,
    resolve: {
      procedimento: ProcedimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.procedimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProcedimentoUpdateComponent,
    resolve: {
      procedimento: ProcedimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.procedimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
