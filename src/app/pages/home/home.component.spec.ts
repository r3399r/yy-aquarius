import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from 'src/app/pages/home/home.component';

describe('HomeComponent', (): void => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(
    async (): Promise<void> => {
      await TestBed.configureTestingModule({
        declarations: [HomeComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(HomeComponent); // create the component
      component = fixture.componentInstance;
      fixture.detectChanges(); // run ngOnInit()
    }
  );

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
