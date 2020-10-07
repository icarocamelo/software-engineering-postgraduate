import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostoDeSaudeService } from 'app/entities/posto-de-saude/posto-de-saude.service';
import { IPostoDeSaude, PostoDeSaude } from 'app/shared/model/posto-de-saude.model';
import { TipoUnidadeSaude } from 'app/shared/model/enumerations/tipo-unidade-saude.model';

describe('Service Tests', () => {
  describe('PostoDeSaude Service', () => {
    let injector: TestBed;
    let service: PostoDeSaudeService;
    let httpMock: HttpTestingController;
    let elemDefault: IPostoDeSaude;
    let expectedResult: IPostoDeSaude | IPostoDeSaude[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PostoDeSaudeService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new PostoDeSaude(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', TipoUnidadeSaude.PUBLICA);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PostoDeSaude', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new PostoDeSaude()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PostoDeSaude', () => {
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

      it('should return a list of PostoDeSaude', () => {
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

      it('should delete a PostoDeSaude', () => {
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
