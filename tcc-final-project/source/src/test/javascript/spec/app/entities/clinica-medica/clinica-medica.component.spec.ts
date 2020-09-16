import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { ClinicaMedicaComponent } from 'app/entities/clinica-medica/clinica-medica.component';
import { ClinicaMedicaService } from 'app/entities/clinica-medica/clinica-medica.service';
import { ClinicaMedica } from 'app/shared/model/clinica-medica.model';

describe('Component Tests', () => {
  describe('ClinicaMedica Management Component', () => {
    let comp: ClinicaMedicaComponent;
    let fixture: ComponentFixture<ClinicaMedicaComponent>;
    let service: ClinicaMedicaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ClinicaMedicaComponent],
      })
        .overrideTemplate(ClinicaMedicaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClinicaMedicaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClinicaMedicaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ClinicaMedica(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.clinicaMedicas && comp.clinicaMedicas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
