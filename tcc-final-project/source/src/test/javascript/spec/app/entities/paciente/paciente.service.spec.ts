import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PacienteService } from 'app/entities/paciente/paciente.service';
import { IPaciente, Paciente } from 'app/shared/model/paciente.model';

describe('Service Tests', () => {
  describe('Paciente Service', () => {
    let injector: TestBed;
    let service: PacienteService;
    let httpMock: HttpTestingController;
    let elemDefault: IPaciente;
    let expectedResult: IPaciente | IPaciente[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PacienteService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Paciente(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        0,
        0,
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataNascimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Paciente', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataNascimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataNascimento: currentDate,
          },
          returnedFromService
        );

        service.create(new Paciente()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Paciente', () => {
        const returnedFromService = Object.assign(
          {
            uUID: 'BBBBBB',
            nome: 'BBBBBB',
            rG: 'BBBBBB',
            cPF: 'BBBBBB',
            endereco: 'BBBBBB',
            dataNascimento: currentDate.format(DATE_FORMAT),
            telefone: 'BBBBBB',
            peso: 1,
            altura: 1,
            responsavel: 'BBBBBB',
            rNE: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataNascimento: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Paciente', () => {
        const returnedFromService = Object.assign(
          {
            uUID: 'BBBBBB',
            nome: 'BBBBBB',
            rG: 'BBBBBB',
            cPF: 'BBBBBB',
            endereco: 'BBBBBB',
            dataNascimento: currentDate.format(DATE_FORMAT),
            telefone: 'BBBBBB',
            peso: 1,
            altura: 1,
            responsavel: 'BBBBBB',
            rNE: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataNascimento: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Paciente', () => {
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