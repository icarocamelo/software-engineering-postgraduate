import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { FarmaciaComponent } from 'app/entities/farmacia/farmacia.component';
import { FarmaciaService } from 'app/entities/farmacia/farmacia.service';
import { Farmacia } from 'app/shared/model/farmacia.model';

describe('Component Tests', () => {
  describe('Farmacia Management Component', () => {
    let comp: FarmaciaComponent;
    let fixture: ComponentFixture<FarmaciaComponent>;
    let service: FarmaciaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [FarmaciaComponent],
      })
        .overrideTemplate(FarmaciaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FarmaciaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FarmaciaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Farmacia(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.farmacias && comp.farmacias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
