import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProfissionalDeSaude, ProfissionalDeSaude } from 'app/shared/model/profissional-de-saude.model';
import { ProfissionalDeSaudeService } from './profissional-de-saude.service';
import { ProfissionalDeSaudeComponent } from './profissional-de-saude.component';
import { ProfissionalDeSaudeDetailComponent } from './profissional-de-saude-detail.component';
import { ProfissionalDeSaudeUpdateComponent } from './profissional-de-saude-update.component';

@Injectable({ providedIn: 'root' })
export class ProfissionalDeSaudeResolve implements Resolve<IProfissionalDeSaude> {
  constructor(private service: ProfissionalDeSaudeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfissionalDeSaude> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((profissionalDeSaude: HttpResponse<ProfissionalDeSaude>) => {
          if (profissionalDeSaude.body) {
            return of(profissionalDeSaude.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProfissionalDeSaude());
  }
}

export const profissionalDeSaudeRoute: Routes = [
  {
    path: '',
    component: ProfissionalDeSaudeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.profissionalDeSaude.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProfissionalDeSaudeDetailComponent,
    resolve: {
      profissionalDeSaude: ProfissionalDeSaudeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.profissionalDeSaude.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProfissionalDeSaudeUpdateComponent,
    resolve: {
      profissionalDeSaude: ProfissionalDeSaudeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.profissionalDeSaude.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProfissionalDeSaudeUpdateComponent,
    resolve: {
      profissionalDeSaude: ProfissionalDeSaudeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.profissionalDeSaude.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
