import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { UnidadeSaudeDetailComponent } from 'app/entities/unidade-saude/unidade-saude-detail.component';
import { UnidadeSaude } from 'app/shared/model/unidade-saude.model';

describe('Component Tests', () => {
  describe('UnidadeSaude Management Detail Component', () => {
    let comp: UnidadeSaudeDetailComponent;
    let fixture: ComponentFixture<UnidadeSaudeDetailComponent>;
    const route = ({ data: of({ unidadeSaude: new UnidadeSaude(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [UnidadeSaudeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UnidadeSaudeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UnidadeSaudeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load unidadeSaude on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.unidadeSaude).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
