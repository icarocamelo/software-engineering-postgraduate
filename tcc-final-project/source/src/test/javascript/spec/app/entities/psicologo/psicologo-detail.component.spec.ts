import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { PsicologoDetailComponent } from 'app/entities/psicologo/psicologo-detail.component';
import { Psicologo } from 'app/shared/model/psicologo.model';

describe('Component Tests', () => {
  describe('Psicologo Management Detail Component', () => {
    let comp: PsicologoDetailComponent;
    let fixture: ComponentFixture<PsicologoDetailComponent>;
    const route = ({ data: of({ psicologo: new Psicologo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [PsicologoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PsicologoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PsicologoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load psicologo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.psicologo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
