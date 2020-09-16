import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { PostoDeSaudeUpdateComponent } from 'app/entities/posto-de-saude/posto-de-saude-update.component';
import { PostoDeSaudeService } from 'app/entities/posto-de-saude/posto-de-saude.service';
import { PostoDeSaude } from 'app/shared/model/posto-de-saude.model';

describe('Component Tests', () => {
  describe('PostoDeSaude Management Update Component', () => {
    let comp: PostoDeSaudeUpdateComponent;
    let fixture: ComponentFixture<PostoDeSaudeUpdateComponent>;
    let service: PostoDeSaudeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [PostoDeSaudeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PostoDeSaudeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PostoDeSaudeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PostoDeSaudeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PostoDeSaude(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PostoDeSaude();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
