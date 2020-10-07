import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { ProfissionalUpdateComponent } from 'app/entities/profissional/profissional-update.component';
import { ProfissionalService } from 'app/entities/profissional/profissional.service';
import { Profissional } from 'app/shared/model/profissional.model';

describe('Component Tests', () => {
  describe('Profissional Management Update Component', () => {
    let comp: ProfissionalUpdateComponent;
    let fixture: ComponentFixture<ProfissionalUpdateComponent>;
    let service: ProfissionalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ProfissionalUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProfissionalUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfissionalUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfissionalService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Profissional(123);
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
        const entity = new Profissional();
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
