import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { ProntuarioUpdateComponent } from 'app/entities/prontuario/prontuario-update.component';
import { ProntuarioService } from 'app/entities/prontuario/prontuario.service';
import { Prontuario } from 'app/shared/model/prontuario.model';

describe('Component Tests', () => {
  describe('Prontuario Management Update Component', () => {
    let comp: ProntuarioUpdateComponent;
    let fixture: ComponentFixture<ProntuarioUpdateComponent>;
    let service: ProntuarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ProntuarioUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProntuarioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProntuarioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProntuarioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Prontuario(123);
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
        const entity = new Prontuario();
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
