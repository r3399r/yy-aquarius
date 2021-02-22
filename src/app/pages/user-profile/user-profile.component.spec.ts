import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { LineService } from 'src/app/services/line.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let lineServiceSpy: jasmine.SpyObj<LineService>;

  beforeEach(async () => {
    lineServiceSpy = jasmine.createSpyObj('LineService', ['getUserProfile']);

    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [{ provide: LineService, useValue: lineServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
