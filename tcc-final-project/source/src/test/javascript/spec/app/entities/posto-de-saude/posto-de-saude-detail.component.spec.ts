import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { PostoDeSaudeDetailComponent } from 'app/entities/posto-de-saude/posto-de-saude-detail.component';
import { PostoDeSaude } from 'app/shared/model/posto-de-saude.model';

describe('Component Tests', () => {
  describe('PostoDeSaude Management Detail Component', () => {
    let comp: PostoDeSaudeDetailComponent;
    let fixture: ComponentFixture<PostoDeSaudeDetailComponent>;
    const route = ({ data: of({ postoDeSaude: new PostoDeSaude(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [PostoDeSaudeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PostoDeSaudeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PostoDeSaudeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load postoDeSaude on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.postoDeSaude).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
