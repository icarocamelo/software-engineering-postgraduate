import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { LeitoComponent } from 'app/entities/leito/leito.component';
import { LeitoService } from 'app/entities/leito/leito.service';
import { Leito } from 'app/shared/model/leito.model';

describe('Component Tests', () => {
  describe('Leito Management Component', () => {
    let comp: LeitoComponent;
    let fixture: ComponentFixture<LeitoComponent>;
    let service: LeitoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [LeitoComponent],
      })
        .overrideTemplate(LeitoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LeitoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LeitoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Leito(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.leitos && comp.leitos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
