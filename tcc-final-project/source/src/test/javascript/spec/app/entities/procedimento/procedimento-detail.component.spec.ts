import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { ProcedimentoDetailComponent } from 'app/entities/procedimento/procedimento-detail.component';
import { Procedimento } from 'app/shared/model/procedimento.model';

describe('Component Tests', () => {
  describe('Procedimento Management Detail Component', () => {
    let comp: ProcedimentoDetailComponent;
    let fixture: ComponentFixture<ProcedimentoDetailComponent>;
    const route = ({ data: of({ procedimento: new Procedimento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ProcedimentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProcedimentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcedimentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load procedimento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.procedimento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
