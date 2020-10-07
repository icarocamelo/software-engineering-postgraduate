import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { MedicamentoUpdateComponent } from 'app/entities/medicamento/medicamento-update.component';
import { MedicamentoService } from 'app/entities/medicamento/medicamento.service';
import { Medicamento } from 'app/shared/model/medicamento.model';

describe('Component Tests', () => {
  describe('Medicamento Management Update Component', () => {
    let comp: MedicamentoUpdateComponent;
    let fixture: ComponentFixture<MedicamentoUpdateComponent>;
    let service: MedicamentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [MedicamentoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MedicamentoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedicamentoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedicamentoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Medicamento(123);
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
        const entity = new Medicamento();
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
