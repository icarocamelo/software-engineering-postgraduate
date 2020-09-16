import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { ClinicaMedicaDetailComponent } from 'app/entities/clinica-medica/clinica-medica-detail.component';
import { ClinicaMedica } from 'app/shared/model/clinica-medica.model';

describe('Component Tests', () => {
  describe('ClinicaMedica Management Detail Component', () => {
    let comp: ClinicaMedicaDetailComponent;
    let fixture: ComponentFixture<ClinicaMedicaDetailComponent>;
    const route = ({ data: of({ clinicaMedica: new ClinicaMedica(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ClinicaMedicaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ClinicaMedicaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClinicaMedicaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load clinicaMedica on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.clinicaMedica).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
