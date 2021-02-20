import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventListComponent } from 'src/app/pages/event-list/event-list.component';

describe('EventListComponent', (): void => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(
    async (): Promise<void> => {
      await TestBed.configureTestingModule({
        declarations: [EventListComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(EventListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  );

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
