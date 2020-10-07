import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPermissao, Permissao } from 'app/shared/model/permissao.model';
import { PermissaoService } from './permissao.service';
import { IPerfilAcesso } from 'app/shared/model/perfil-acesso.model';
import { PerfilAcessoService } from 'app/entities/perfil-acesso/perfil-acesso.service';

@Component({
  selector: 'jhi-permissao-update',
  templateUrl: './permissao-update.component.html',
})
export class PermissaoUpdateComponent implements OnInit {
  isSaving = false;
  perfilacessos: IPerfilAcesso[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    perfilAcesso: [],
  });

  constructor(
    protected permissaoService: PermissaoService,
    protected perfilAcessoService: PerfilAcessoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ permissao }) => {
      this.updateForm(permissao);

      this.perfilAcessoService.query().subscribe((res: HttpResponse<IPerfilAcesso[]>) => (this.perfilacessos = res.body || []));
    });
  }

  updateForm(permissao: IPermissao): void {
    this.editForm.patchValue({
      id: permissao.id,
      nome: permissao.nome,
      perfilAcesso: permissao.perfilAcesso,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const permissao = this.createFromForm();
    if (permissao.id !== undefined) {
      this.subscribeToSaveResponse(this.permissaoService.update(permissao));
    } else {
      this.subscribeToSaveResponse(this.permissaoService.create(permissao));
    }
  }

  private createFromForm(): IPermissao {
    return {
      ...new Permissao(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      perfilAcesso: this.editForm.get(['perfilAcesso'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPermissao>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IPerfilAcesso): any {
    return item.id;
  }
}
