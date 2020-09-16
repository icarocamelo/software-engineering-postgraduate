import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFisioterapeuta, Fisioterapeuta } from 'app/shared/model/fisioterapeuta.model';
import { FisioterapeutaService } from './fisioterapeuta.service';
import { FisioterapeutaComponent } from './fisioterapeuta.component';
import { FisioterapeutaDetailComponent } from './fisioterapeuta-detail.component';
import { FisioterapeutaUpdateComponent } from './fisioterapeuta-update.component';

@Injectable({ providedIn: 'root' })
export class FisioterapeutaResolve implements Resolve<IFisioterapeuta> {
  constructor(private service: FisioterapeutaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFisioterapeuta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((fisioterapeuta: HttpResponse<Fisioterapeuta>) => {
          if (fisioterapeuta.body) {
            return of(fisioterapeuta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Fisioterapeuta());
  }
}

export const fisioterapeutaRoute: Routes = [
  {
    path: '',
    component: FisioterapeutaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.fisioterapeuta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FisioterapeutaDetailComponent,
    resolve: {
      fisioterapeuta: FisioterapeutaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.fisioterapeuta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FisioterapeutaUpdateComponent,
    resolve: {
      fisioterapeuta: FisioterapeutaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.fisioterapeuta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FisioterapeutaUpdateComponent,
    resolve: {
      fisioterapeuta: FisioterapeutaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.fisioterapeuta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
