import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from 'src/app/pages/home/home.component';

describe('HomeComponent', (): void => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerSpy: jasmine.Spy;

  beforeEach(
    async (): Promise<void> => {
      routerSpy = spyOn(Router.prototype, 'navigate');

      await TestBed.configureTestingModule({
        declarations: [HomeComponent],
        imports: [RouterTestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(HomeComponent); // create the component
      component = fixture.componentInstance;
      fixture.detectChanges(); // run ngOnInit()
    }
  );

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('onClick should work', async (): Promise<void> => {
    await component.onClick();
    expect(routerSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledWith(['child']);
  });
});
