import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { UnidadeSaudeUpdateComponent } from 'app/entities/unidade-saude/unidade-saude-update.component';
import { UnidadeSaudeService } from 'app/entities/unidade-saude/unidade-saude.service';
import { UnidadeSaude } from 'app/shared/model/unidade-saude.model';

describe('Component Tests', () => {
  describe('UnidadeSaude Management Update Component', () => {
    let comp: UnidadeSaudeUpdateComponent;
    let fixture: ComponentFixture<UnidadeSaudeUpdateComponent>;
    let service: UnidadeSaudeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [UnidadeSaudeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UnidadeSaudeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnidadeSaudeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnidadeSaudeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UnidadeSaude(123);
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
        const entity = new UnidadeSaude();
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
