import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { ProfissionalComponent } from 'app/entities/profissional/profissional.component';
import { ProfissionalService } from 'app/entities/profissional/profissional.service';
import { Profissional } from 'app/shared/model/profissional.model';

describe('Component Tests', () => {
  describe('Profissional Management Component', () => {
    let comp: ProfissionalComponent;
    let fixture: ComponentFixture<ProfissionalComponent>;
    let service: ProfissionalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ProfissionalComponent],
      })
        .overrideTemplate(ProfissionalComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfissionalComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfissionalService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Profissional(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.profissionals && comp.profissionals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
