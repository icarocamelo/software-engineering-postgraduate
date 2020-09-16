import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { FisioterapeutaComponent } from 'app/entities/fisioterapeuta/fisioterapeuta.component';
import { FisioterapeutaService } from 'app/entities/fisioterapeuta/fisioterapeuta.service';
import { Fisioterapeuta } from 'app/shared/model/fisioterapeuta.model';

describe('Component Tests', () => {
  describe('Fisioterapeuta Management Component', () => {
    let comp: FisioterapeutaComponent;
    let fixture: ComponentFixture<FisioterapeutaComponent>;
    let service: FisioterapeutaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [FisioterapeutaComponent],
      })
        .overrideTemplate(FisioterapeutaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FisioterapeutaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FisioterapeutaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Fisioterapeuta(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fisioterapeutas && comp.fisioterapeutas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
