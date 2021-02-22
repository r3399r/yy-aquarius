import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from 'src/app/auth.guard';
import { LineAuthService } from 'src/app/services/line-auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let lineAuthServiceSpy: jasmine.SpyObj<LineAuthService>;
  let routerSpy: jasmine.Spy;

  beforeEach(() => {
    lineAuthServiceSpy = jasmine.createSpyObj('LineAuthService', ['isAuth']);
    routerSpy = spyOn(Router.prototype, 'navigate');

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: LineAuthService, useValue: lineAuthServiceSpy }],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate should work when isAuth return true', async () => {
    lineAuthServiceSpy.isAuth.and.resolveTo(true);
    expect(await guard.canActivate()).toBe(true);
    expect(lineAuthServiceSpy.isAuth).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledTimes(0);
  });

  it('canActivate should work when isAuth return false', async () => {
    lineAuthServiceSpy.isAuth.and.resolveTo(false);
    expect(await guard.canActivate()).toBe(false);
    expect(lineAuthServiceSpy.isAuth).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledWith(['login']);
  });
});
