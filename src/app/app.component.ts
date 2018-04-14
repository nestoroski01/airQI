import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { GlobalProvider } from '../providers/global/global';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  selectedTheme: String;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar : StatusBar, public splashScreen: SplashScreen,private global : GlobalProvider) {
    this.initializeApp();
    this.global.getActiveTheme().subscribe(val => this.selectedTheme = val);
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Nearest Station', component: HomePage, icon: "md-home" },
      { title: 'Country Stations', component: ListPage, icon: 'md-cloud'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.styleBlackTranslucent();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
