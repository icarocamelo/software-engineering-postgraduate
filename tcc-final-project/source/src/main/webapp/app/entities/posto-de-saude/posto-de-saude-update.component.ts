import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPostoDeSaude, PostoDeSaude } from 'app/shared/model/posto-de-saude.model';
import { PostoDeSaudeService } from './posto-de-saude.service';

@Component({
  selector: 'jhi-posto-de-saude-update',
  templateUrl: './posto-de-saude-update.component.html',
})
export class PostoDeSaudeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected postoDeSaudeService: PostoDeSaudeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ postoDeSaude }) => {
      this.updateForm(postoDeSaude);
    });
  }

  updateForm(postoDeSaude: IPostoDeSaude): void {
    this.editForm.patchValue({
      id: postoDeSaude.id,
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
}
