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
import { LoginComponent } from 'src/app/pages/login/login.component';
import { MyPartnerComponent } from 'src/app/pages/my-partner/my-partner.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';

const rootRoute: Route = {
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
};
const wildcardRoute: Route = {
  path: '**',
  redirectTo: 'home',
  pathMatch: 'full',
};

// Route children
const loginRoute: Route = {
  path: 'login',
  component: LoginComponent,
};
const homeRoute: Route = {
  path: 'home',
  component: HomeComponent,
};
const childRoute: Route = {
  path: 'child',
  component: ChildComponent,
};
const myPartnerRoute: Route = {
  path: 'my-partner',
  component: MyPartnerComponent,
};
const userProfileRoute: Route = {
  path: 'user-profile',
  component: UserProfileComponent,
};

// private and public Route
const privateRoute: Route = {
  path: '',
  component: LayoutComponent,
  children: [childRoute, myPartnerRoute, userProfileRoute],
};
const publicRoute: Route = {
  path: '',
  component: LayoutComponent,
  children: [homeRoute, loginRoute],
};

const routes: Routes = [rootRoute, publicRoute, privateRoute, wildcardRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
