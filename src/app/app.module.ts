import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { ChildComponent } from 'src/app/pages/child/child.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent, LayoutComponent, HomeComponent, ChildComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    IonicModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
