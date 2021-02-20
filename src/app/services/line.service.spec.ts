import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LineUserProfile } from 'src/app/model/LineUserProfile';
import { LineService } from 'src/app/services/line.service';

describe('LineService', () => {
  let service: LineService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let dummyLineUser: LineUserProfile;

  beforeAll(() => {
    dummyLineUser = {
      userId: 'testUesrId',
      displayName: 'testDisplayName',
    };
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(LineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUserProfile() should work', async () => {
    httpClientSpy.get.and.returnValue(of(dummyLineUser));
    expect(await service.getUserProfile()).toBe(dummyLineUser);
  });
});
