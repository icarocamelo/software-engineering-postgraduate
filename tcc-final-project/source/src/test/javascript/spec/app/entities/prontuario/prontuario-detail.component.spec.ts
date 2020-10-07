import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { ProntuarioDetailComponent } from 'app/entities/prontuario/prontuario-detail.component';
import { Prontuario } from 'app/shared/model/prontuario.model';

describe('Component Tests', () => {
  describe('Prontuario Management Detail Component', () => {
    let comp: ProntuarioDetailComponent;
    let fixture: ComponentFixture<ProntuarioDetailComponent>;
    const route = ({ data: of({ prontuario: new Prontuario(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ProntuarioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProntuarioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProntuarioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load prontuario on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.prontuario).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
