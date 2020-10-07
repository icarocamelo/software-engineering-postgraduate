import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { AgendaExameComponent } from 'app/entities/agenda-exame/agenda-exame.component';
import { AgendaExameService } from 'app/entities/agenda-exame/agenda-exame.service';
import { AgendaExame } from 'app/shared/model/agenda-exame.model';

describe('Component Tests', () => {
  describe('AgendaExame Management Component', () => {
    let comp: AgendaExameComponent;
    let fixture: ComponentFixture<AgendaExameComponent>;
    let service: AgendaExameService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [AgendaExameComponent],
      })
        .overrideTemplate(AgendaExameComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgendaExameComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgendaExameService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AgendaExame(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.agendaExames && comp.agendaExames[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
