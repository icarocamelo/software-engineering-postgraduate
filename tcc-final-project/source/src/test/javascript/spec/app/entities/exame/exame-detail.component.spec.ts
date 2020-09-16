import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { ExameDetailComponent } from 'app/entities/exame/exame-detail.component';
import { Exame } from 'app/shared/model/exame.model';

describe('Component Tests', () => {
  describe('Exame Management Detail Component', () => {
    let comp: ExameDetailComponent;
    let fixture: ComponentFixture<ExameDetailComponent>;
    const route = ({ data: of({ exame: new Exame(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [ExameDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ExameDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExameDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load exame on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.exame).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
