import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, scheduled } from 'rxjs';
import { LineAuthService } from 'src/app/services/line-auth.service';

describe('LineAuthService', (): void => {
  let service: LineAuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let dummyAccessToken: any;

  beforeAll((): void => {
    dummyAccessToken = {
      access_token: 'testToken',
      expires_in: 10000,
      refresh_token: 'testRefresh',
      scope: 'profile',
      token_type: 'Bearer',
    };
  });

  beforeEach((): void => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    httpClientSpy.post.and.returnValue(of(dummyAccessToken));

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(LineAuthService);
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  it('getLink() should work', (): void => {
    expect(service.getLink()).toEqual(
      'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1654301960&redirect_uri=http://localhost:4200/user-profile&state=12345abcde&scope=profile'
    );
  });

  it('getState() should work', (): void => {
    expect(service.getState()).toEqual('12345abcde');
  });

  it('getUserProfile() should work', async (): Promise<void> => {
    const res: any = await service.getUserProfile('aaa');
    expect(res).toEqual(dummyAccessToken);
  });
});
