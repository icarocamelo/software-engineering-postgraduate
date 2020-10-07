import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { PerfilAcessoDetailComponent } from 'app/entities/perfil-acesso/perfil-acesso-detail.component';
import { PerfilAcesso } from 'app/shared/model/perfil-acesso.model';

describe('Component Tests', () => {
  describe('PerfilAcesso Management Detail Component', () => {
    let comp: PerfilAcessoDetailComponent;
    let fixture: ComponentFixture<PerfilAcessoDetailComponent>;
    const route = ({ data: of({ perfilAcesso: new PerfilAcesso(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [PerfilAcessoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PerfilAcessoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PerfilAcessoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load perfilAcesso on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.perfilAcesso).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
