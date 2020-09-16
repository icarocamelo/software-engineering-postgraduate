import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { PsicologoUpdateComponent } from 'app/entities/psicologo/psicologo-update.component';
import { PsicologoService } from 'app/entities/psicologo/psicologo.service';
import { Psicologo } from 'app/shared/model/psicologo.model';

describe('Component Tests', () => {
  describe('Psicologo Management Update Component', () => {
    let comp: PsicologoUpdateComponent;
    let fixture: ComponentFixture<PsicologoUpdateComponent>;
    let service: PsicologoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [PsicologoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PsicologoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PsicologoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PsicologoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Psicologo(123);
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
        const entity = new Psicologo();
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
