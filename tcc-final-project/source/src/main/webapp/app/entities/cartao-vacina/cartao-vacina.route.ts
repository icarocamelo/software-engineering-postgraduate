import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICartaoVacina, CartaoVacina } from 'app/shared/model/cartao-vacina.model';
import { CartaoVacinaService } from './cartao-vacina.service';
import { CartaoVacinaComponent } from './cartao-vacina.component';
import { CartaoVacinaDetailComponent } from './cartao-vacina-detail.component';
import { CartaoVacinaUpdateComponent } from './cartao-vacina-update.component';

@Injectable({ providedIn: 'root' })
export class CartaoVacinaResolve implements Resolve<ICartaoVacina> {
  constructor(private service: CartaoVacinaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICartaoVacina> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cartaoVacina: HttpResponse<CartaoVacina>) => {
          if (cartaoVacina.body) {
            return of(cartaoVacina.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CartaoVacina());
  }
}

export const cartaoVacinaRoute: Routes = [
  {
    path: '',
    component: CartaoVacinaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.cartaoVacina.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CartaoVacinaDetailComponent,
    resolve: {
      cartaoVacina: CartaoVacinaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.cartaoVacina.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CartaoVacinaUpdateComponent,
    resolve: {
      cartaoVacina: CartaoVacinaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.cartaoVacina.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CartaoVacinaUpdateComponent,
    resolve: {
      cartaoVacina: CartaoVacinaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.cartaoVacina.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
