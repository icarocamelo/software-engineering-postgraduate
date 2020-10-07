import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { EnfermeiroDetailComponent } from 'app/entities/enfermeiro/enfermeiro-detail.component';
import { Enfermeiro } from 'app/shared/model/enfermeiro.model';

describe('Component Tests', () => {
  describe('Enfermeiro Management Detail Component', () => {
    let comp: EnfermeiroDetailComponent;
    let fixture: ComponentFixture<EnfermeiroDetailComponent>;
    const route = ({ data: of({ enfermeiro: new Enfermeiro(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [EnfermeiroDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EnfermeiroDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EnfermeiroDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load enfermeiro on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.enfermeiro).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
