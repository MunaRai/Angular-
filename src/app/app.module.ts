import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { RealTimeDataService } from '@shared/services/real-time-data.service';
import { Page404Component } from './page-404/page-404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastService } from '@shared/services/toast.service';
import { AgmDirectionModule } from 'agm-direction';
import { ToastModule } from 'ng2-toastr';
import { LiveTrackingModule } from './modules/live-tracking/live-tracking.module';
import { RouteInformationService } from '@shared/services/route-information.service';

export function tokenGetter() {
  return localStorage.getItem('p2s_access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LiveTrackingModule,
    AgmDirectionModule,
    HttpClientModule,
    SharedModule.forRoot(),
    ToastModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          // local server
          'localhost:8080',

          // nepal server
          '103.233.58.147:8080',

          // singapore server
          '139.162.47.56:8080',

          //india server
          '139.162.210.59:8080',

          '192.168.1.65:8080'

        ],

        authScheme: ''
      }
    })
  ],
  providers: [
    NgxSpinnerService,
    RealTimeDataService,
    ToastService,
    RouteInformationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
