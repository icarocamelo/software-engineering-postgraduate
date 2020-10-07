import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SaudepluplusTestModule } from '../../../test.module';
import { PerfilAcessoComponent } from 'app/entities/perfil-acesso/perfil-acesso.component';
import { PerfilAcessoService } from 'app/entities/perfil-acesso/perfil-acesso.service';
import { PerfilAcesso } from 'app/shared/model/perfil-acesso.model';

describe('Component Tests', () => {
  describe('PerfilAcesso Management Component', () => {
    let comp: PerfilAcessoComponent;
    let fixture: ComponentFixture<PerfilAcessoComponent>;
    let service: PerfilAcessoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [PerfilAcessoComponent],
      })
        .overrideTemplate(PerfilAcessoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PerfilAcessoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PerfilAcessoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PerfilAcesso(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.perfilAcessos && comp.perfilAcessos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
