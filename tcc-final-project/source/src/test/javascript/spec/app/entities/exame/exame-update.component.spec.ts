import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { ExameUpdateComponent } from 'app/entities/exame/exame-update.component';
import { ExameService } from 'app/entities/exame/exame.service';
import { Exame } from 'app/shared/model/exame.model';

describe('Component Tests', () => {
  describe('Exame Management Update Component', () => {
    let comp: ExameUpdateComponent;
    let fixture: ComponentFixture<ExameUpdateComponent>;
    let service: ExameService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ExameUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ExameUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExameUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExameService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Exame(123);
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
        const entity = new Exame();
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
