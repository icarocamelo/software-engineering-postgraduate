import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUsuario, Usuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'jhi-usuario-update',
  templateUrl: './usuario-update.component.html',
})
export class UsuarioUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    login: [],
    nome: [],
    sobrenome: [],
    email: [],
    ativo: [],
    perfil: [],
  });

  constructor(protected usuarioService: UsuarioService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuario }) => {
      this.updateForm(usuario);
    });
  }

  updateForm(usuario: IUsuario): void {
    this.editForm.patchValue({
      id: usuario.id,
      login: usuario.login,
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      email: usuario.email,
      ativo: usuario.ativo,
      perfil: usuario.perfil,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuario = this.createFromForm();
    if (usuario.id !== undefined) {
      this.subscribeToSaveResponse(this.usuarioService.update(usuario));
    } else {
      this.subscribeToSaveResponse(this.usuarioService.create(usuario));
    }
  }

  private createFromForm(): IUsuario {
    return {
      ...new Usuario(),
      id: this.editForm.get(['id'])!.value,
      login: this.editForm.get(['login'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      sobrenome: this.editForm.get(['sobrenome'])!.value,
      email: this.editForm.get(['email'])!.value,
      ativo: this.editForm.get(['ativo'])!.value,
      perfil: this.editForm.get(['perfil'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>): void {
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
