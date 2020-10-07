import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClinicaMedicaService } from 'app/entities/clinica-medica/clinica-medica.service';
import { IClinicaMedica, ClinicaMedica } from 'app/shared/model/clinica-medica.model';
import { TipoUnidadeSaude } from 'app/shared/model/enumerations/tipo-unidade-saude.model';

describe('Service Tests', () => {
  describe('ClinicaMedica Service', () => {
    let injector: TestBed;
    let service: ClinicaMedicaService;
    let httpMock: HttpTestingController;
    let elemDefault: IClinicaMedica;
    let expectedResult: IClinicaMedica | IClinicaMedica[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ClinicaMedicaService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new ClinicaMedica(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', TipoUnidadeSaude.PUBLICA);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ClinicaMedica', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ClinicaMedica()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ClinicaMedica', () => {
        const returnedFromService = Object.assign(
          {
            cNPJ: 'BBBBBB',
            telefone: 'BBBBBB',
            cEP: 'BBBBBB',
            razaoSocial: 'BBBBBB',
            nomeFantasia: 'BBBBBB',
            tipoUnidadeSaude: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ClinicaMedica', () => {
        const returnedFromService = Object.assign(
          {
            cNPJ: 'BBBBBB',
            telefone: 'BBBBBB',
            cEP: 'BBBBBB',
            razaoSocial: 'BBBBBB',
            nomeFantasia: 'BBBBBB',
            tipoUnidadeSaude: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ClinicaMedica', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
