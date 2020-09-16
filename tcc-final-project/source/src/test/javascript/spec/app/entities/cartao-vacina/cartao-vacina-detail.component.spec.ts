import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { CartaoVacinaDetailComponent } from 'app/entities/cartao-vacina/cartao-vacina-detail.component';
import { CartaoVacina } from 'app/shared/model/cartao-vacina.model';

describe('Component Tests', () => {
  describe('CartaoVacina Management Detail Component', () => {
    let comp: CartaoVacinaDetailComponent;
    let fixture: ComponentFixture<CartaoVacinaDetailComponent>;
    const route = ({ data: of({ cartaoVacina: new CartaoVacina(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [CartaoVacinaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CartaoVacinaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CartaoVacinaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cartaoVacina on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cartaoVacina).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
