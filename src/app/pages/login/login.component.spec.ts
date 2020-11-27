import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { LineAuthService } from 'src/app/services/line-auth.service';

describe('LoginComponent', (): void => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let lineAuthServiceSpy: jasmine.SpyObj<LineAuthService>;

  beforeEach(
    async (): Promise<void> => {
      lineAuthServiceSpy = jasmine.createSpyObj('LineAuthService', ['getLink']);

      await TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [{ provide: LineAuthService, useValue: lineAuthServiceSpy }],
      }).compileComponents();
    }
  );

  beforeEach((): void => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(lineAuthServiceSpy.getLink).toHaveBeenCalledTimes(1);
    expect(component).toBeTruthy();
  });
});
