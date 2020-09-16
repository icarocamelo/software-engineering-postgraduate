import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { AgendaConsultaDetailComponent } from 'app/entities/agenda-consulta/agenda-consulta-detail.component';
import { AgendaConsulta } from 'app/shared/model/agenda-consulta.model';

describe('Component Tests', () => {
  describe('AgendaConsulta Management Detail Component', () => {
    let comp: AgendaConsultaDetailComponent;
    let fixture: ComponentFixture<AgendaConsultaDetailComponent>;
    const route = ({ data: of({ agendaConsulta: new AgendaConsulta(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [AgendaConsultaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AgendaConsultaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AgendaConsultaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load agendaConsulta on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.agendaConsulta).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
