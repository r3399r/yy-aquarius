import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastController } from '@ionic/angular';
import { of } from 'rxjs';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { LineAuthService } from 'src/app/services/line-auth.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let lineAuthServiceSpy: jasmine.SpyObj<LineAuthService>;
  let toastControllerSpy: jasmine.Spy;

  beforeEach(async () => {
    const routeStub: any = {
      queryParams: of({ code: 'testCode', state: 'testState' }),
    };
    lineAuthServiceSpy = jasmine.createSpyObj('LineAuthService', [
      'getState',
      'login',
    ]);
    toastControllerSpy = spyOn(ToastController.prototype, 'create');

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: LineAuthService, useValue: lineAuthServiceSpy },
        { provide: ActivatedRoute, useValue: routeStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit with correct params and login succeeds', async () => {
    lineAuthServiceSpy.getState.and.returnValue('testState');
    lineAuthServiceSpy.login.and.resolveTo(true);

    await component.ngOnInit();
    expect(lineAuthServiceSpy.getState).toHaveBeenCalledTimes(1);
    expect(toastControllerSpy).toHaveBeenCalledTimes(1);
    expect(toastControllerSpy).toHaveBeenCalledWith({
      message: '登入成功',
      duration: 3000,
    });
  });

  it('ngOnInit with correct params but login fails', async () => {
    lineAuthServiceSpy.getState.and.returnValue('testState');
    lineAuthServiceSpy.login.and.resolveTo(false);

    await component.ngOnInit();
    expect(lineAuthServiceSpy.getState).toHaveBeenCalledTimes(1);
    expect(toastControllerSpy).toHaveBeenCalledTimes(1);
    expect(toastControllerSpy).toHaveBeenCalledWith({
      message: '登入失敗',
      duration: 3000,
    });
  });

  it('ngOnInit without params', async () => {
    lineAuthServiceSpy.getState.and.returnValue('');

    await component.ngOnInit();
    expect(lineAuthServiceSpy.getState).toHaveBeenCalled();
  });
});
