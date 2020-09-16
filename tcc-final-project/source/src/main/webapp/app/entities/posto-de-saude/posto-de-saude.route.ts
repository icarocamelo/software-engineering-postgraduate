import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPostoDeSaude, PostoDeSaude } from 'app/shared/model/posto-de-saude.model';
import { PostoDeSaudeService } from './posto-de-saude.service';
import { PostoDeSaudeComponent } from './posto-de-saude.component';
import { PostoDeSaudeDetailComponent } from './posto-de-saude-detail.component';
import { PostoDeSaudeUpdateComponent } from './posto-de-saude-update.component';

@Injectable({ providedIn: 'root' })
export class PostoDeSaudeResolve implements Resolve<IPostoDeSaude> {
  constructor(private service: PostoDeSaudeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPostoDeSaude> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((postoDeSaude: HttpResponse<PostoDeSaude>) => {
          if (postoDeSaude.body) {
            return of(postoDeSaude.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PostoDeSaude());
  }
}

export const postoDeSaudeRoute: Routes = [
  {
    path: '',
    component: PostoDeSaudeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.postoDeSaude.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PostoDeSaudeDetailComponent,
    resolve: {
      postoDeSaude: PostoDeSaudeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.postoDeSaude.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PostoDeSaudeUpdateComponent,
    resolve: {
      postoDeSaude: PostoDeSaudeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.postoDeSaude.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PostoDeSaudeUpdateComponent,
    resolve: {
      postoDeSaude: PostoDeSaudeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'saudepluplusApp.postoDeSaude.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
