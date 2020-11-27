import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';

describe('UserProfileComponent', (): void => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(
    async (): Promise<void> => {
      await TestBed.configureTestingModule({
        declarations: [UserProfileComponent],
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
});
