import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { ExameComponent } from 'app/entities/exame/exame.component';
import { ExameService } from 'app/entities/exame/exame.service';
import { Exame } from 'app/shared/model/exame.model';

describe('Component Tests', () => {
  describe('Exame Management Component', () => {
    let comp: ExameComponent;
    let fixture: ComponentFixture<ExameComponent>;
    let service: ExameService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ExameComponent],
      })
        .overrideTemplate(ExameComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExameComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExameService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Exame(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.exames && comp.exames[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
