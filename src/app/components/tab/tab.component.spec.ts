import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TabComponent } from 'src/app/components/tab/tab.component';

describe('TabComponent', (): void => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;
  let routerSpy: jasmine.Spy;

  beforeEach(
    async (): Promise<void> => {
      routerSpy = spyOn(Router.prototype, 'navigate');

      await TestBed.configureTestingModule({
        declarations: [TabComponent],
        imports: [RouterTestingModule],
      }).compileComponents();
    }
  );

  beforeEach((): void => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('onClickTab() should work', async (): Promise<void> => {
    await component.onClickTab('test');
    expect(routerSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledWith(['test']);
  });
});
