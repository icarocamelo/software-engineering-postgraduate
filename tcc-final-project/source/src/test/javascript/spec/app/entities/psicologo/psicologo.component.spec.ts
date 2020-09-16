import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { PsicologoComponent } from 'app/entities/psicologo/psicologo.component';
import { PsicologoService } from 'app/entities/psicologo/psicologo.service';
import { Psicologo } from 'app/shared/model/psicologo.model';

describe('Component Tests', () => {
  describe('Psicologo Management Component', () => {
    let comp: PsicologoComponent;
    let fixture: ComponentFixture<PsicologoComponent>;
    let service: PsicologoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [PsicologoComponent],
      })
        .overrideTemplate(PsicologoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PsicologoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PsicologoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Psicologo(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.psicologos && comp.psicologos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
