import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { LeitoDetailComponent } from 'app/entities/leito/leito-detail.component';
import { Leito } from 'app/shared/model/leito.model';

describe('Component Tests', () => {
  describe('Leito Management Detail Component', () => {
    let comp: LeitoDetailComponent;
    let fixture: ComponentFixture<LeitoDetailComponent>;
    const route = ({ data: of({ leito: new Leito(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [LeitoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LeitoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LeitoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load leito on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.leito).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
