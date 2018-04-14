import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiCallProvider } from '../providers/api-call/api-call';
import { GlobalProvider } from '../providers/global/global';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { Geolocation } from '@ionic-native/geolocation'
import { HttpClientModule } from '@angular/common/http';
import { DetailsPage } from '../pages/details/details';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetailsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RoundProgressModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiCallProvider,
    GlobalProvider,
    Geolocation,
  ]
})
export class AppModule {}
