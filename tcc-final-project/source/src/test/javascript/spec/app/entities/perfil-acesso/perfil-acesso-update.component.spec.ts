import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { PerfilAcessoUpdateComponent } from 'app/entities/perfil-acesso/perfil-acesso-update.component';
import { PerfilAcessoService } from 'app/entities/perfil-acesso/perfil-acesso.service';
import { PerfilAcesso } from 'app/shared/model/perfil-acesso.model';

describe('Component Tests', () => {
  describe('PerfilAcesso Management Update Component', () => {
    let comp: PerfilAcessoUpdateComponent;
    let fixture: ComponentFixture<PerfilAcessoUpdateComponent>;
    let service: PerfilAcessoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [PerfilAcessoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PerfilAcessoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PerfilAcessoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PerfilAcessoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PerfilAcesso(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PerfilAcesso();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
