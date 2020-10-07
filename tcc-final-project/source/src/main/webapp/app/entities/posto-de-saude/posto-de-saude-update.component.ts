import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPostoDeSaude, PostoDeSaude } from 'app/shared/model/posto-de-saude.model';
import { PostoDeSaudeService } from './posto-de-saude.service';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco/endereco.service';

@Component({
  selector: 'jhi-posto-de-saude-update',
  templateUrl: './posto-de-saude-update.component.html',
})
export class PostoDeSaudeUpdateComponent implements OnInit {
  isSaving = false;
  enderecos: IEndereco[] = [];

  editForm = this.fb.group({
    id: [],
    cNPJ: [],
    telefone: [],
    cEP: [],
    razaoSocial: [],
    nomeFantasia: [],
    tipoUnidadeSaude: [],
    endereco: [],
  });

  constructor(
    protected postoDeSaudeService: PostoDeSaudeService,
    protected enderecoService: EnderecoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ postoDeSaude }) => {
      this.updateForm(postoDeSaude);

      this.enderecoService
        .query({ filter: 'postodesaude-is-null' })
        .pipe(
          map((res: HttpResponse<IEndereco[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEndereco[]) => {
          if (!postoDeSaude.endereco || !postoDeSaude.endereco.id) {
            this.enderecos = resBody;
          } else {
            this.enderecoService
              .find(postoDeSaude.endereco.id)
              .pipe(
                map((subRes: HttpResponse<IEndereco>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEndereco[]) => (this.enderecos = concatRes));
          }
        });
    });
  }

  updateForm(postoDeSaude: IPostoDeSaude): void {
    this.editForm.patchValue({
      id: postoDeSaude.id,
      cNPJ: postoDeSaude.cNPJ,
      telefone: postoDeSaude.telefone,
      cEP: postoDeSaude.cEP,
      razaoSocial: postoDeSaude.razaoSocial,
      nomeFantasia: postoDeSaude.nomeFantasia,
      tipoUnidadeSaude: postoDeSaude.tipoUnidadeSaude,
      endereco: postoDeSaude.endereco,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const postoDeSaude = this.createFromForm();
    if (postoDeSaude.id !== undefined) {
      this.subscribeToSaveResponse(this.postoDeSaudeService.update(postoDeSaude));
    } else {
      this.subscribeToSaveResponse(this.postoDeSaudeService.create(postoDeSaude));
    }
  }

  private createFromForm(): IPostoDeSaude {
    return {
      ...new PostoDeSaude(),
      id: this.editForm.get(['id'])!.value,
      cNPJ: this.editForm.get(['cNPJ'])!.value,
      telefone: this.editForm.get(['telefone'])!.value,
      cEP: this.editForm.get(['cEP'])!.value,
      razaoSocial: this.editForm.get(['razaoSocial'])!.value,
      nomeFantasia: this.editForm.get(['nomeFantasia'])!.value,
      tipoUnidadeSaude: this.editForm.get(['tipoUnidadeSaude'])!.value,
      endereco: this.editForm.get(['endereco'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPostoDeSaude>>): void {
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

  trackById(index: number, item: IEndereco): any {
    return item.id;
  }
}
