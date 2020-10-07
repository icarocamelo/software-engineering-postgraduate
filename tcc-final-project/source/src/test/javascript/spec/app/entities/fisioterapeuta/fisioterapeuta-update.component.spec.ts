import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { FisioterapeutaUpdateComponent } from 'app/entities/fisioterapeuta/fisioterapeuta-update.component';
import { FisioterapeutaService } from 'app/entities/fisioterapeuta/fisioterapeuta.service';
import { Fisioterapeuta } from 'app/shared/model/fisioterapeuta.model';

describe('Component Tests', () => {
  describe('Fisioterapeuta Management Update Component', () => {
    let comp: FisioterapeutaUpdateComponent;
    let fixture: ComponentFixture<FisioterapeutaUpdateComponent>;
    let service: FisioterapeutaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [FisioterapeutaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FisioterapeutaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FisioterapeutaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FisioterapeutaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fisioterapeuta(123);
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
        const entity = new Fisioterapeuta();
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
