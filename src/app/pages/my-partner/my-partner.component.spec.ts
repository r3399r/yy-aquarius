import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyPartnerComponent } from 'src/app/pages/my-partner/my-partner.component';

describe('MyPartnerComponent', (): void => {
  let component: MyPartnerComponent;
  let fixture: ComponentFixture<MyPartnerComponent>;

  beforeEach(
    async (): Promise<void> => {
      await TestBed.configureTestingModule({
        declarations: [MyPartnerComponent],
      }).compileComponents();
    }
  );

  beforeEach((): void => {
    fixture = TestBed.createComponent(MyPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
