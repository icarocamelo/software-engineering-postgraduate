import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { AgendaConsultaComponent } from 'app/entities/agenda-consulta/agenda-consulta.component';
import { AgendaConsultaService } from 'app/entities/agenda-consulta/agenda-consulta.service';
import { AgendaConsulta } from 'app/shared/model/agenda-consulta.model';

describe('Component Tests', () => {
  describe('AgendaConsulta Management Component', () => {
    let comp: AgendaConsultaComponent;
    let fixture: ComponentFixture<AgendaConsultaComponent>;
    let service: AgendaConsultaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [AgendaConsultaComponent],
      })
        .overrideTemplate(AgendaConsultaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgendaConsultaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgendaConsultaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AgendaConsulta(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.agendaConsultas && comp.agendaConsultas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
