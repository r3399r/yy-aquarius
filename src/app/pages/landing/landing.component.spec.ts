import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { LandingComponent } from 'src/app/pages/landing/landing.component';

describe('LandingComponent', (): void => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(
    async (): Promise<void> => {
      TestBed.configureTestingModule({
        declarations: [LandingComponent],
        imports: [IonicModule.forRoot(), RouterTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(LandingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  );

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
