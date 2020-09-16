import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { LaboratorioUpdateComponent } from 'app/entities/laboratorio/laboratorio-update.component';
import { LaboratorioService } from 'app/entities/laboratorio/laboratorio.service';
import { Laboratorio } from 'app/shared/model/laboratorio.model';

describe('Component Tests', () => {
  describe('Laboratorio Management Update Component', () => {
    let comp: LaboratorioUpdateComponent;
    let fixture: ComponentFixture<LaboratorioUpdateComponent>;
    let service: LaboratorioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [LaboratorioUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LaboratorioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LaboratorioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LaboratorioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Laboratorio(123);
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
        const entity = new Laboratorio();
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
