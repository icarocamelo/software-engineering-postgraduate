import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { UnidadeSaudeComponent } from 'app/entities/unidade-saude/unidade-saude.component';
import { UnidadeSaudeService } from 'app/entities/unidade-saude/unidade-saude.service';
import { UnidadeSaude } from 'app/shared/model/unidade-saude.model';

describe('Component Tests', () => {
  describe('UnidadeSaude Management Component', () => {
    let comp: UnidadeSaudeComponent;
    let fixture: ComponentFixture<UnidadeSaudeComponent>;
    let service: UnidadeSaudeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [UnidadeSaudeComponent],
      })
        .overrideTemplate(UnidadeSaudeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnidadeSaudeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnidadeSaudeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UnidadeSaude(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.unidadeSaudes && comp.unidadeSaudes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
