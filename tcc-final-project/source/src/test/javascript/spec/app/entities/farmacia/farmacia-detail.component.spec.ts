import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaudepluplusTestModule } from '../../../test.module';
import { FarmaciaDetailComponent } from 'app/entities/farmacia/farmacia-detail.component';
import { Farmacia } from 'app/shared/model/farmacia.model';

describe('Component Tests', () => {
  describe('Farmacia Management Detail Component', () => {
    let comp: FarmaciaDetailComponent;
    let fixture: ComponentFixture<FarmaciaDetailComponent>;
    const route = ({ data: of({ farmacia: new Farmacia(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SaudepluplusTestModule],
        declarations: [FarmaciaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FarmaciaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FarmaciaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load farmacia on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.farmacia).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
