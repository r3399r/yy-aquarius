import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TripService } from 'src/app/services/trip.service';

describe('TripService', () => {
  let service: TripService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(TripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
