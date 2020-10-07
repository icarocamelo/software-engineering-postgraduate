import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { PostoDeSaudeComponent } from 'app/entities/posto-de-saude/posto-de-saude.component';
import { PostoDeSaudeService } from 'app/entities/posto-de-saude/posto-de-saude.service';
import { PostoDeSaude } from 'app/shared/model/posto-de-saude.model';

describe('Component Tests', () => {
  describe('PostoDeSaude Management Component', () => {
    let comp: PostoDeSaudeComponent;
    let fixture: ComponentFixture<PostoDeSaudeComponent>;
    let service: PostoDeSaudeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [PostoDeSaudeComponent],
      })
        .overrideTemplate(PostoDeSaudeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PostoDeSaudeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PostoDeSaudeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PostoDeSaude(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.postoDeSaudes && comp.postoDeSaudes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
