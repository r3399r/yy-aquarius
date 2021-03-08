import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EventDetailComponent } from 'src/app/pages/event-detail/event-detail.component';
import { LineAuthService } from 'src/app/services/line-auth.service';
import { LineService } from 'src/app/services/line.service';
import { TripService } from 'src/app/services/trip.service';

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;
  let tripServiceSpy: jasmine.SpyObj<TripService>;
  let lineAuthServiceSpy: jasmine.SpyObj<LineAuthService>;
  let lineServiceSpy: jasmine.SpyObj<LineService>;

  beforeEach(async () => {
    tripServiceSpy = jasmine.createSpyObj('TripService', [
      'getTrip',
      'signTrip',
    ]);
    lineAuthServiceSpy = jasmine.createSpyObj('LineAuthService', [
      'isAuth',
      'isFriend',
    ]);
    lineServiceSpy = jasmine.createSpyObj('LineService', ['getUserProfile']);

    await TestBed.configureTestingModule({
      declarations: [EventDetailComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: TripService, useValue: tripServiceSpy },
        { provide: LineAuthService, useValue: lineAuthServiceSpy },
        { provide: LineService, useValue: lineServiceSpy },
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
