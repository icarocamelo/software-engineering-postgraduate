import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { LeitoUpdateComponent } from 'app/entities/leito/leito-update.component';
import { LeitoService } from 'app/entities/leito/leito.service';
import { Leito } from 'app/shared/model/leito.model';

describe('Component Tests', () => {
  describe('Leito Management Update Component', () => {
    let comp: LeitoUpdateComponent;
    let fixture: ComponentFixture<LeitoUpdateComponent>;
    let service: LeitoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [LeitoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LeitoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LeitoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LeitoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Leito(123);
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
        const entity = new Leito();
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
