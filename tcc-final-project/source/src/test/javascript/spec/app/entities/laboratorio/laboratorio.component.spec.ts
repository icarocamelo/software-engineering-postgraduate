import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { LaboratorioComponent } from 'app/entities/laboratorio/laboratorio.component';
import { LaboratorioService } from 'app/entities/laboratorio/laboratorio.service';
import { Laboratorio } from 'app/shared/model/laboratorio.model';

describe('Component Tests', () => {
  describe('Laboratorio Management Component', () => {
    let comp: LaboratorioComponent;
    let fixture: ComponentFixture<LaboratorioComponent>;
    let service: LaboratorioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [LaboratorioComponent],
      })
        .overrideTemplate(LaboratorioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LaboratorioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LaboratorioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Laboratorio(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.laboratorios && comp.laboratorios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
