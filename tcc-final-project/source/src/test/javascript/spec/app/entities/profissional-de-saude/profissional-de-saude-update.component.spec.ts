import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { ProfissionalDeSaudeUpdateComponent } from 'app/entities/profissional-de-saude/profissional-de-saude-update.component';
import { ProfissionalDeSaudeService } from 'app/entities/profissional-de-saude/profissional-de-saude.service';
import { ProfissionalDeSaude } from 'app/shared/model/profissional-de-saude.model';

describe('Component Tests', () => {
  describe('ProfissionalDeSaude Management Update Component', () => {
    let comp: ProfissionalDeSaudeUpdateComponent;
    let fixture: ComponentFixture<ProfissionalDeSaudeUpdateComponent>;
    let service: ProfissionalDeSaudeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ProfissionalDeSaudeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProfissionalDeSaudeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfissionalDeSaudeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfissionalDeSaudeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfissionalDeSaude(123);
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
        const entity = new ProfissionalDeSaude();
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
