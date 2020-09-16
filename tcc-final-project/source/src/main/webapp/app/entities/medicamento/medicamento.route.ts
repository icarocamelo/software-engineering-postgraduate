import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMedicamento, Medicamento } from 'app/shared/model/medicamento.model';
import { MedicamentoService } from './medicamento.service';
import { MedicamentoComponent } from './medicamento.component';
import { MedicamentoDetailComponent } from './medicamento-detail.component';
import { MedicamentoUpdateComponent } from './medicamento-update.component';

@Injectable({ providedIn: 'root' })
export class MedicamentoResolve implements Resolve<IMedicamento> {
  constructor(private service: MedicamentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMedicamento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((medicamento: HttpResponse<Medicamento>) => {
          if (medicamento.body) {
            return of(medicamento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Medicamento());
  }
}

export const medicamentoRoute: Routes = [
  {
    path: '',
    component: MedicamentoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.medicamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MedicamentoDetailComponent,
    resolve: {
      medicamento: MedicamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.medicamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MedicamentoUpdateComponent,
    resolve: {
      medicamento: MedicamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.medicamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MedicamentoUpdateComponent,
    resolve: {
      medicamento: MedicamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.medicamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
