import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { FisioterapeutaDetailComponent } from 'app/entities/fisioterapeuta/fisioterapeuta-detail.component';
import { Fisioterapeuta } from 'app/shared/model/fisioterapeuta.model';

describe('Component Tests', () => {
  describe('Fisioterapeuta Management Detail Component', () => {
    let comp: FisioterapeutaDetailComponent;
    let fixture: ComponentFixture<FisioterapeutaDetailComponent>;
    const route = ({ data: of({ fisioterapeuta: new Fisioterapeuta(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [FisioterapeutaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FisioterapeutaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FisioterapeutaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load fisioterapeuta on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fisioterapeuta).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
