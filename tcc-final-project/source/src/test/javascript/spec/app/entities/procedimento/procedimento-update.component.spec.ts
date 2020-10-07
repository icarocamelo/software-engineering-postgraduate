import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { ProcedimentoUpdateComponent } from 'app/entities/procedimento/procedimento-update.component';
import { ProcedimentoService } from 'app/entities/procedimento/procedimento.service';
import { Procedimento } from 'app/shared/model/procedimento.model';

describe('Component Tests', () => {
  describe('Procedimento Management Update Component', () => {
    let comp: ProcedimentoUpdateComponent;
    let fixture: ComponentFixture<ProcedimentoUpdateComponent>;
    let service: ProcedimentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ProcedimentoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProcedimentoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProcedimentoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcedimentoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Procedimento(123);
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
        const entity = new Procedimento();
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
