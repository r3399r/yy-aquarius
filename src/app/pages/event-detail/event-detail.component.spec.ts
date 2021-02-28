import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EventDetailComponent } from 'src/app/pages/event-detail/event-detail.component';
import { LineAuthService } from 'src/app/services/line-auth.service';
import { TripService } from 'src/app/services/trip.service';

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;
  let tripServiceSpy: jasmine.SpyObj<TripService>;
  let lineAuthServiceSpy: jasmine.SpyObj<LineAuthService>;

  beforeEach(async () => {
    tripServiceSpy = jasmine.createSpyObj('TripService', ['getTrip']);
    lineAuthServiceSpy = jasmine.createSpyObj('LineAuthService', [
      'isAuth',
      'isFriend',
    ]);

    await TestBed.configureTestingModule({
      declarations: [EventDetailComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: TripService, useValue: tripServiceSpy },
        { provide: LineAuthService, useValue: lineAuthServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    tripServiceSpy.getTrip.and.resolveTo({
      date: '2021-02-26',
      startDate: '09:00',
      endDate: '16:00',
    });
    expect(component).toBeTruthy();
  });
});
