import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { MedicamentoComponent } from 'app/entities/medicamento/medicamento.component';
import { MedicamentoService } from 'app/entities/medicamento/medicamento.service';
import { Medicamento } from 'app/shared/model/medicamento.model';

describe('Component Tests', () => {
  describe('Medicamento Management Component', () => {
    let comp: MedicamentoComponent;
    let fixture: ComponentFixture<MedicamentoComponent>;
    let service: MedicamentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [MedicamentoComponent],
      })
        .overrideTemplate(MedicamentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedicamentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedicamentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Medicamento(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.medicamentos && comp.medicamentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
