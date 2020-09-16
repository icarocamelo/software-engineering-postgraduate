import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { ProcedimentoComponent } from 'app/entities/procedimento/procedimento.component';
import { ProcedimentoService } from 'app/entities/procedimento/procedimento.service';
import { Procedimento } from 'app/shared/model/procedimento.model';

describe('Component Tests', () => {
  describe('Procedimento Management Component', () => {
    let comp: ProcedimentoComponent;
    let fixture: ComponentFixture<ProcedimentoComponent>;
    let service: ProcedimentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ProcedimentoComponent],
      })
        .overrideTemplate(ProcedimentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProcedimentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcedimentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Procedimento(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.procedimentos && comp.procedimentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
