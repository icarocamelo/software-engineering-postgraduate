import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { ProfissionalDetailComponent } from 'app/entities/profissional/profissional-detail.component';
import { Profissional } from 'app/shared/model/profissional.model';

describe('Component Tests', () => {
  describe('Profissional Management Detail Component', () => {
    let comp: ProfissionalDetailComponent;
    let fixture: ComponentFixture<ProfissionalDetailComponent>;
    const route = ({ data: of({ profissional: new Profissional(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ProfissionalDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProfissionalDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfissionalDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load profissional on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profissional).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
