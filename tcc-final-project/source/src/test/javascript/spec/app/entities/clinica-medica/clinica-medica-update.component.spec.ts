import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { ClinicaMedicaUpdateComponent } from 'app/entities/clinica-medica/clinica-medica-update.component';
import { ClinicaMedicaService } from 'app/entities/clinica-medica/clinica-medica.service';
import { ClinicaMedica } from 'app/shared/model/clinica-medica.model';

describe('Component Tests', () => {
  describe('ClinicaMedica Management Update Component', () => {
    let comp: ClinicaMedicaUpdateComponent;
    let fixture: ComponentFixture<ClinicaMedicaUpdateComponent>;
    let service: ClinicaMedicaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ClinicaMedicaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ClinicaMedicaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClinicaMedicaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClinicaMedicaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ClinicaMedica(123);
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
        const entity = new ClinicaMedica();
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
