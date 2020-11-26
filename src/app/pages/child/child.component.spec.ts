import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildComponent } from 'src/app/pages/child/child.component';

describe('ChildComponent', (): void => {
  let component: ChildComponent;
  let fixture: ComponentFixture<ChildComponent>;

  beforeEach(
    async (): Promise<void> => {
      await TestBed.configureTestingModule({
        declarations: [ChildComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ChildComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  );

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
