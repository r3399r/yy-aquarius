import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { ChildComponent } from 'src/app/pages/child/child.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { MyPartnerComponent } from 'src/app/pages/my-partner/my-partner.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    ChildComponent,
    TabComponent,
    MyPartnerComponent,
    UserProfileComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    IonicModule.forRoot(),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
