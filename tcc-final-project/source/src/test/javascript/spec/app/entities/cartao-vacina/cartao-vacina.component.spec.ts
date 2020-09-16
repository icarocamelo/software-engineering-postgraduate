import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { CartaoVacinaComponent } from 'app/entities/cartao-vacina/cartao-vacina.component';
import { CartaoVacinaService } from 'app/entities/cartao-vacina/cartao-vacina.service';
import { CartaoVacina } from 'app/shared/model/cartao-vacina.model';

describe('Component Tests', () => {
  describe('CartaoVacina Management Component', () => {
    let comp: CartaoVacinaComponent;
    let fixture: ComponentFixture<CartaoVacinaComponent>;
    let service: CartaoVacinaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [CartaoVacinaComponent],
      })
        .overrideTemplate(CartaoVacinaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CartaoVacinaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CartaoVacinaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CartaoVacina(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cartaoVacinas && comp.cartaoVacinas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
