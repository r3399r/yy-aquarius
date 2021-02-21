import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LineToken } from 'src/app/model/LineToken';
import { LineAuthService } from 'src/app/services/line-auth.service';
import { environment } from 'src/environments/environment';

describe('LineAuthService', () => {
  let service: LineAuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let localStorageGetSpy: jasmine.Spy;
  let localStorageSetSpy: jasmine.Spy;
  let dummyAccessToken: LineToken;

  beforeAll(() => {
    dummyAccessToken = {
      access_token: 'testToken',
      expires_in: 10000,
      refresh_token: 'testRefresh',
      scope: 'profile',
      token_type: 'Bearer',
    };
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    localStorageGetSpy = spyOn(localStorage, 'getItem').and.callFake(
      (): string => 'value'
    );
    localStorageSetSpy = spyOn(localStorage, 'setItem').and.callFake(() => {});

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(LineAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getLink() should work', () => {
    expect(service.getLink()).toEqual(
      `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${environment.clientId}&redirect_uri=${environment.redirectUri}&state=12345abcde&scope=profile&bot_prompt=aggressive`
    );
  });

  it('getState() should work', () => {
    expect(service.getState()).toEqual('12345abcde');
  });

  it('isAuth() should work', async () => {
    httpClientSpy.post.and.returnValue(of(dummyAccessToken));
    expect(await service.isAuth()).toBeTrue();
  });

  it('isAuth() should return false when api request fails', async () => {
    httpClientSpy.post.and.returnValue(throwError({}));
    expect(await service.isAuth()).toBeFalse();
  });

  it('isAuth() should return false when localStorage is empty', async () => {
    localStorageGetSpy.and.callFake((): null => null);
    expect(await service.isAuth()).toBeFalse();
  });

  it('login() should work', async () => {
    httpClientSpy.post.and.returnValue(of(dummyAccessToken));
    expect(await service.login('aaa')).toBeTrue();
    expect(localStorageSetSpy).toHaveBeenCalledTimes(2);
    expect(localStorageGetSpy).toHaveBeenCalledTimes(0);
  });

  it('login() should work', async () => {
    httpClientSpy.post.and.returnValue(throwError({}));
    const res: boolean = await service.login('aaa');
    expect(res).toBeFalse();
    expect(localStorageSetSpy).toHaveBeenCalledTimes(0);
    expect(localStorageGetSpy).toHaveBeenCalledTimes(0);
  });
});
