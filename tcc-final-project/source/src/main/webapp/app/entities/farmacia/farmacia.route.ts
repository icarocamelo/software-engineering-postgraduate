import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFarmacia, Farmacia } from 'app/shared/model/farmacia.model';
import { FarmaciaService } from './farmacia.service';
import { FarmaciaComponent } from './farmacia.component';
import { FarmaciaDetailComponent } from './farmacia-detail.component';
import { FarmaciaUpdateComponent } from './farmacia-update.component';

@Injectable({ providedIn: 'root' })
export class FarmaciaResolve implements Resolve<IFarmacia> {
  constructor(private service: FarmaciaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFarmacia> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((farmacia: HttpResponse<Farmacia>) => {
          if (farmacia.body) {
            return of(farmacia.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Farmacia());
  }
}

export const farmaciaRoute: Routes = [
  {
    path: '',
    component: FarmaciaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.farmacia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FarmaciaDetailComponent,
    resolve: {
      farmacia: FarmaciaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.farmacia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FarmaciaUpdateComponent,
    resolve: {
      farmacia: FarmaciaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.farmacia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FarmaciaUpdateComponent,
    resolve: {
      farmacia: FarmaciaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.farmacia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
