import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { LineAuthService } from 'src/app/services/line-auth.service';

describe('UserProfileComponent', (): void => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let lineAuthServiceSpy: jasmine.SpyObj<LineAuthService>;

  beforeEach(
    async (): Promise<void> => {
      const routeStub: any = {
        queryParams: of({ code: 'testCode', state: 'testState' }),
      };
      lineAuthServiceSpy = jasmine.createSpyObj('LineAuthService', [
        'getState',
        'getUserProfile',
      ]);

      await TestBed.configureTestingModule({
        declarations: [UserProfileComponent],
        imports: [RouterTestingModule],
        providers: [
          { provide: LineAuthService, useValue: lineAuthServiceSpy },
          { provide: ActivatedRoute, useValue: routeStub },
        ],
      }).compileComponents();
    }
  );

  beforeEach((): void => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit with correct params', async (): Promise<void> => {
    lineAuthServiceSpy.getState.and.returnValue('testState');

    await component.ngOnInit();
    expect(lineAuthServiceSpy.getState).toHaveBeenCalled();
  });

  it('should ngOnInit without params', async (): Promise<void> => {
    lineAuthServiceSpy.getState.and.returnValue('');

    await component.ngOnInit();
    expect(lineAuthServiceSpy.getState).toHaveBeenCalled();
  });
});
