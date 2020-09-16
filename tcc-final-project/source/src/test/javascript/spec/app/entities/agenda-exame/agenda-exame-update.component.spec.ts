import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { AgendaExameUpdateComponent } from 'app/entities/agenda-exame/agenda-exame-update.component';
import { AgendaExameService } from 'app/entities/agenda-exame/agenda-exame.service';
import { AgendaExame } from 'app/shared/model/agenda-exame.model';

describe('Component Tests', () => {
  describe('AgendaExame Management Update Component', () => {
    let comp: AgendaExameUpdateComponent;
    let fixture: ComponentFixture<AgendaExameUpdateComponent>;
    let service: AgendaExameService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [AgendaExameUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AgendaExameUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgendaExameUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgendaExameService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AgendaExame(123);
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
        const entity = new AgendaExame();
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
