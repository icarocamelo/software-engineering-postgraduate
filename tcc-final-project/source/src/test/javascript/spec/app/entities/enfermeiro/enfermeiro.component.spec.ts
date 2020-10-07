import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { EnfermeiroComponent } from 'app/entities/enfermeiro/enfermeiro.component';
import { EnfermeiroService } from 'app/entities/enfermeiro/enfermeiro.service';
import { Enfermeiro } from 'app/shared/model/enfermeiro.model';

describe('Component Tests', () => {
  describe('Enfermeiro Management Component', () => {
    let comp: EnfermeiroComponent;
    let fixture: ComponentFixture<EnfermeiroComponent>;
    let service: EnfermeiroService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [EnfermeiroComponent],
      })
        .overrideTemplate(EnfermeiroComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EnfermeiroComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EnfermeiroService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Enfermeiro(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.enfermeiros && comp.enfermeiros[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
