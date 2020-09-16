import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { LaboratorioDetailComponent } from 'app/entities/laboratorio/laboratorio-detail.component';
import { Laboratorio } from 'app/shared/model/laboratorio.model';

describe('Component Tests', () => {
  describe('Laboratorio Management Detail Component', () => {
    let comp: LaboratorioDetailComponent;
    let fixture: ComponentFixture<LaboratorioDetailComponent>;
    const route = ({ data: of({ laboratorio: new Laboratorio(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [LaboratorioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LaboratorioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LaboratorioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load laboratorio on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.laboratorio).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
