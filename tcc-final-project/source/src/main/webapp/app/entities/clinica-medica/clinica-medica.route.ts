import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IClinicaMedica, ClinicaMedica } from 'app/shared/model/clinica-medica.model';
import { ClinicaMedicaService } from './clinica-medica.service';
import { ClinicaMedicaComponent } from './clinica-medica.component';
import { ClinicaMedicaDetailComponent } from './clinica-medica-detail.component';
import { ClinicaMedicaUpdateComponent } from './clinica-medica-update.component';

@Injectable({ providedIn: 'root' })
export class ClinicaMedicaResolve implements Resolve<IClinicaMedica> {
  constructor(private service: ClinicaMedicaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClinicaMedica> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((clinicaMedica: HttpResponse<ClinicaMedica>) => {
          if (clinicaMedica.body) {
            return of(clinicaMedica.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ClinicaMedica());
  }
}

export const clinicaMedicaRoute: Routes = [
  {
    path: '',
    component: ClinicaMedicaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.clinicaMedica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ClinicaMedicaDetailComponent,
    resolve: {
      clinicaMedica: ClinicaMedicaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.clinicaMedica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ClinicaMedicaUpdateComponent,
    resolve: {
      clinicaMedica: ClinicaMedicaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.clinicaMedica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ClinicaMedicaUpdateComponent,
    resolve: {
      clinicaMedica: ClinicaMedicaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.clinicaMedica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
