import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPermissao } from 'app/shared/model/permissao.model';

@Component({
  selector: 'jhi-permissao-detail',
  templateUrl: './permissao-detail.component.html',
})
export class PermissaoDetailComponent implements OnInit {
  permissao: IPermissao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ permissao }) => (this.permissao = permissao));
  }

  previousState(): void {
    window.history.back();
  }
}
