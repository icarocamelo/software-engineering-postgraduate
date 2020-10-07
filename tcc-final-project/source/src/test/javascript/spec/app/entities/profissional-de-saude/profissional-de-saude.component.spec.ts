import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { ProfissionalDeSaudeComponent } from 'app/entities/profissional-de-saude/profissional-de-saude.component';
import { ProfissionalDeSaudeService } from 'app/entities/profissional-de-saude/profissional-de-saude.service';
import { ProfissionalDeSaude } from 'app/shared/model/profissional-de-saude.model';

describe('Component Tests', () => {
  describe('ProfissionalDeSaude Management Component', () => {
    let comp: ProfissionalDeSaudeComponent;
    let fixture: ComponentFixture<ProfissionalDeSaudeComponent>;
    let service: ProfissionalDeSaudeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ProfissionalDeSaudeComponent],
      })
        .overrideTemplate(ProfissionalDeSaudeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfissionalDeSaudeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfissionalDeSaudeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProfissionalDeSaude(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.profissionalDeSaudes && comp.profissionalDeSaudes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
