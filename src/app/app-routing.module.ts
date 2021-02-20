import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  Route,
  RouterModule,
  Routes,
} from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { EventListComponent } from 'src/app/pages/event-list/event-list.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
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
  path: 'event-list',
  component: EventListComponent,
};
const userProfileRoute: Route = {
  path: 'user-profile',
  component: UserProfileComponent,
};

// private and public Route
const privateRoute: Route = {
  path: '',
  canActivate: [AuthGuard],
  component: LayoutComponent,
  children: [childRoute, userProfileRoute],
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
