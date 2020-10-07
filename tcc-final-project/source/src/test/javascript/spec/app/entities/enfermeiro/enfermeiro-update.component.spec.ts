import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { EnfermeiroUpdateComponent } from 'app/entities/enfermeiro/enfermeiro-update.component';
import { EnfermeiroService } from 'app/entities/enfermeiro/enfermeiro.service';
import { Enfermeiro } from 'app/shared/model/enfermeiro.model';

describe('Component Tests', () => {
  describe('Enfermeiro Management Update Component', () => {
    let comp: EnfermeiroUpdateComponent;
    let fixture: ComponentFixture<EnfermeiroUpdateComponent>;
    let service: EnfermeiroService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [EnfermeiroUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EnfermeiroUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EnfermeiroUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EnfermeiroService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Enfermeiro(123);
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
        const entity = new Enfermeiro();
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
