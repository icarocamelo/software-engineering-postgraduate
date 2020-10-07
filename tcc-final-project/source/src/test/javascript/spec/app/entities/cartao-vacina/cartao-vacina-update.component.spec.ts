import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { CartaoVacinaUpdateComponent } from 'app/entities/cartao-vacina/cartao-vacina-update.component';
import { CartaoVacinaService } from 'app/entities/cartao-vacina/cartao-vacina.service';
import { CartaoVacina } from 'app/shared/model/cartao-vacina.model';

describe('Component Tests', () => {
  describe('CartaoVacina Management Update Component', () => {
    let comp: CartaoVacinaUpdateComponent;
    let fixture: ComponentFixture<CartaoVacinaUpdateComponent>;
    let service: CartaoVacinaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [CartaoVacinaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CartaoVacinaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CartaoVacinaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CartaoVacinaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CartaoVacina(123);
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
        const entity = new CartaoVacina();
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
