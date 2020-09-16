import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { MedicamentoDetailComponent } from 'app/entities/medicamento/medicamento-detail.component';
import { Medicamento } from 'app/shared/model/medicamento.model';

describe('Component Tests', () => {
  describe('Medicamento Management Detail Component', () => {
    let comp: MedicamentoDetailComponent;
    let fixture: ComponentFixture<MedicamentoDetailComponent>;
    const route = ({ data: of({ medicamento: new Medicamento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [MedicamentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MedicamentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedicamentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load medicamento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.medicamento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
