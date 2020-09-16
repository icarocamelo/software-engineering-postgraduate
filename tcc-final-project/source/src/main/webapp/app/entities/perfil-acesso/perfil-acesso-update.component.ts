import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPerfilAcesso, PerfilAcesso } from 'app/shared/model/perfil-acesso.model';
import { PerfilAcessoService } from './perfil-acesso.service';
import { IPermissao } from 'app/shared/model/permissao.model';
import { PermissaoService } from 'app/entities/permissao/permissao.service';

@Component({
  selector: 'jhi-perfil-acesso-update',
  templateUrl: './perfil-acesso-update.component.html',
})
export class PerfilAcessoUpdateComponent implements OnInit {
  isSaving = false;
  permissaos: IPermissao[] = [];

  editForm = this.fb.group({
    id: [],
    uUID: [],
    permissao: [],
  });

  constructor(
    protected perfilAcessoService: PerfilAcessoService,
    protected permissaoService: PermissaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ perfilAcesso }) => {
      this.updateForm(perfilAcesso);

      this.permissaoService.query().subscribe((res: HttpResponse<IPermissao[]>) => (this.permissaos = res.body || []));
    });
  }

  updateForm(perfilAcesso: IPerfilAcesso): void {
    this.editForm.patchValue({
      id: perfilAcesso.id,
      uUID: perfilAcesso.uUID,
      permissao: perfilAcesso.permissao,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const perfilAcesso = this.createFromForm();
    if (perfilAcesso.id !== undefined) {
      this.subscribeToSaveResponse(this.perfilAcessoService.update(perfilAcesso));
    } else {
      this.subscribeToSaveResponse(this.perfilAcessoService.create(perfilAcesso));
    }
  }

  private createFromForm(): IPerfilAcesso {
    return {
      ...new PerfilAcesso(),
      id: this.editForm.get(['id'])!.value,
      uUID: this.editForm.get(['uUID'])!.value,
      permissao: this.editForm.get(['permissao'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPerfilAcesso>>): void {
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

  trackById(index: number, item: IPermissao): any {
    return item.id;
  }
}
