import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { ProfissionalDeSaudeDetailComponent } from 'app/entities/profissional-de-saude/profissional-de-saude-detail.component';
import { ProfissionalDeSaude } from 'app/shared/model/profissional-de-saude.model';

describe('Component Tests', () => {
  describe('ProfissionalDeSaude Management Detail Component', () => {
    let comp: ProfissionalDeSaudeDetailComponent;
    let fixture: ComponentFixture<ProfissionalDeSaudeDetailComponent>;
    const route = ({ data: of({ profissionalDeSaude: new ProfissionalDeSaude(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ProfissionalDeSaudeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProfissionalDeSaudeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfissionalDeSaudeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load profissionalDeSaude on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profissionalDeSaude).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
