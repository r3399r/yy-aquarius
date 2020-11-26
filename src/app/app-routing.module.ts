import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  Route,
  RouterModule,
  Routes,
} from '@angular/router';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { ChildComponent } from 'src/app/pages/child/child.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { LandingComponent } from 'src/app/pages/landing/landing.component';

const rootRoute: Route = {
  path: '',
  redirectTo: 'welcome',
  pathMatch: 'full',
};
const wildcardRoute: Route = {
  path: '**',
  redirectTo: 'welcome',
  pathMatch: 'full',
};

// Route children
const homeRoute: Route = {
  path: 'home',
  component: HomeComponent,
};
const childRoute: Route = {
  path: 'child',
  component: ChildComponent,
};

// Route
const privateRoute: Route = {
  path: '',
  component: LayoutComponent,
  children: [homeRoute, childRoute],
};
const landingRoute: Route = {
  path: 'welcome',
  component: LandingComponent,
};

const routes: Routes = [rootRoute, landingRoute, privateRoute, wildcardRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
