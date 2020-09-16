import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { AgendaExameDetailComponent } from 'app/entities/agenda-exame/agenda-exame-detail.component';
import { AgendaExame } from 'app/shared/model/agenda-exame.model';

describe('Component Tests', () => {
  describe('AgendaExame Management Detail Component', () => {
    let comp: AgendaExameDetailComponent;
    let fixture: ComponentFixture<AgendaExameDetailComponent>;
    const route = ({ data: of({ agendaExame: new AgendaExame(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [AgendaExameDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AgendaExameDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AgendaExameDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load agendaExame on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.agendaExame).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
