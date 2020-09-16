import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPermissao, Permissao } from 'app/shared/model/permissao.model';
import { PermissaoService } from './permissao.service';

@Component({
  selector: 'jhi-permissao-update',
  templateUrl: './permissao-update.component.html',
})
export class PermissaoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    uUID: [],
  });

  constructor(protected permissaoService: PermissaoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ permissao }) => {
      this.updateForm(permissao);
    });
  }

  updateForm(permissao: IPermissao): void {
    this.editForm.patchValue({
      id: permissao.id,
      uUID: permissao.uUID,
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
      uUID: this.editForm.get(['uUID'])!.value,
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
}
