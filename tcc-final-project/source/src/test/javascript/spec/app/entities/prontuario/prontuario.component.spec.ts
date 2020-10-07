import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { ProntuarioComponent } from 'app/entities/prontuario/prontuario.component';
import { ProntuarioService } from 'app/entities/prontuario/prontuario.service';
import { Prontuario } from 'app/shared/model/prontuario.model';

describe('Component Tests', () => {
  describe('Prontuario Management Component', () => {
    let comp: ProntuarioComponent;
    let fixture: ComponentFixture<ProntuarioComponent>;
    let service: ProntuarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ProntuarioComponent],
      })
        .overrideTemplate(ProntuarioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProntuarioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProntuarioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Prontuario(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.prontuarios && comp.prontuarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
