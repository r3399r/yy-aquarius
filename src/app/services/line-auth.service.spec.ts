import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LineToken } from 'src/app/model/LineToken';
import { LineAuthService } from 'src/app/services/line-auth.service';

describe('LineAuthService', (): void => {
  let service: LineAuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let localStorageGetSpy: jasmine.Spy;
  let localStorageSetSpy: jasmine.Spy;
  let dummyAccessToken: LineToken;

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
    localStorageGetSpy = spyOn(localStorage, 'getItem').and.callFake(
      (): string => 'value'
    );
    localStorageSetSpy = spyOn(
      localStorage,
      'setItem'
    ).and.callFake((): void => {});

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
      'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1655679061&redirect_uri=http://localhost:4200/home&state=12345abcde&scope=profile&bot_prompt=aggressive'
    );
  });

  it('getState() should work', (): void => {
    expect(service.getState()).toEqual('12345abcde');
  });

  it('isAuth() should work', async (): Promise<void> => {
    httpClientSpy.post.and.returnValue(of(dummyAccessToken));
    expect(await service.isAuth()).toBeTrue();
  });

  it('isAuth() should return false when api request fails', async (): Promise<void> => {
    httpClientSpy.post.and.returnValue(throwError({}));
    expect(await service.isAuth()).toBeFalse();
  });

  it('isAuth() should return false when localStorage is empty', async (): Promise<void> => {
    localStorageGetSpy.and.callFake((): null => null);
    expect(await service.isAuth()).toBeFalse();
  });

  it('login() should work', async (): Promise<void> => {
    httpClientSpy.post.and.returnValue(of(dummyAccessToken));
    expect(await service.login('aaa')).toBeTrue();
    expect(localStorageSetSpy).toHaveBeenCalledTimes(2);
    expect(localStorageGetSpy).toHaveBeenCalledTimes(0);
  });

  it('login() should work', async (): Promise<void> => {
    httpClientSpy.post.and.returnValue(throwError({}));
    const res: boolean = await service.login('aaa');
    expect(res).toBeFalse();
    expect(localStorageSetSpy).toHaveBeenCalledTimes(0);
    expect(localStorageGetSpy).toHaveBeenCalledTimes(0);
  });
});
