import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { AgendaConsultaUpdateComponent } from 'app/entities/agenda-consulta/agenda-consulta-update.component';
import { AgendaConsultaService } from 'app/entities/agenda-consulta/agenda-consulta.service';
import { AgendaConsulta } from 'app/shared/model/agenda-consulta.model';

describe('Component Tests', () => {
  describe('AgendaConsulta Management Update Component', () => {
    let comp: AgendaConsultaUpdateComponent;
    let fixture: ComponentFixture<AgendaConsultaUpdateComponent>;
    let service: AgendaConsultaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [AgendaConsultaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AgendaConsultaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgendaConsultaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgendaConsultaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AgendaConsulta(123);
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
        const entity = new AgendaConsulta();
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
