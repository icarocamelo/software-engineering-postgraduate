import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProfissional, Profissional } from 'app/shared/model/profissional.model';
import { ProfissionalService } from './profissional.service';
import { IPerfilAcesso } from 'app/shared/model/perfil-acesso.model';
import { PerfilAcessoService } from 'app/entities/perfil-acesso/perfil-acesso.service';

@Component({
  selector: 'jhi-profissional-update',
  templateUrl: './profissional-update.component.html',
})
export class ProfissionalUpdateComponent implements OnInit {
  isSaving = false;
  perfilacessos: IPerfilAcesso[] = [];

  editForm = this.fb.group({
    id: [],
    perfilAcesso: [],
  });

  constructor(
    protected profissionalService: ProfissionalService,
    protected perfilAcessoService: PerfilAcessoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profissional }) => {
      this.updateForm(profissional);

      this.perfilAcessoService
        .query({ filter: 'profissional-is-null' })
        .pipe(
          map((res: HttpResponse<IPerfilAcesso[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPerfilAcesso[]) => {
          if (!profissional.perfilAcesso || !profissional.perfilAcesso.id) {
            this.perfilacessos = resBody;
          } else {
            this.perfilAcessoService
              .find(profissional.perfilAcesso.id)
              .pipe(
                map((subRes: HttpResponse<IPerfilAcesso>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPerfilAcesso[]) => (this.perfilacessos = concatRes));
          }
        });
    });
  }

  updateForm(profissional: IProfissional): void {
    this.editForm.patchValue({
      id: profissional.id,
      perfilAcesso: profissional.perfilAcesso,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profissional = this.createFromForm();
    if (profissional.id !== undefined) {
      this.subscribeToSaveResponse(this.profissionalService.update(profissional));
    } else {
      this.subscribeToSaveResponse(this.profissionalService.create(profissional));
    }
  }

  private createFromForm(): IProfissional {
    return {
      ...new Profissional(),
      id: this.editForm.get(['id'])!.value,
      perfilAcesso: this.editForm.get(['perfilAcesso'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfissional>>): void {
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
