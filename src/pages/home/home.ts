import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { City } from '../../objects/city';
import { ApiCallProvider } from '../../providers/api-call/api-call';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { AlertController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global'
import { ListPage } from '../list/list';
import { Geolocation } from '@ionic-native/geolocation'
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  city: any = {};
  watch: any;
  selectedTheme: String;
  constructor(public navCtrl: NavController, public apiCall: ApiCallProvider,
    public circleProgressBar: RoundProgressModule, public alertCtrl: AlertController,
    public global: GlobalProvider, public toastCtrl: ToastController, private geoLocation: Geolocation,
    public loadingCtrl: LoadingController) {
    this.global.getActiveTheme().subscribe(val => this.selectedTheme = val);
    global.progressBarDefaults();

    this.getNearestStation();
  }
  doRefresh(refresher) {
    this.global.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.getNearestStation();
    refresher.complete();
  }
  getNearestStation() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loading.present();
    this.geoLocation.getCurrentPosition().then(pos => {
      this.apiCall.getNearestStation(pos.coords.latitude, pos.coords.longitude).then(result => {
        this.city = new City(result, false);
        this.global.setCountry(this.city.country);
        this.global.toggleAppTheme(this.city.color);
        loading.dismiss();
        console.log(this.city);
      }, error => {
        loading.dismiss();
        this.global.presentToast("Check your internet connection");
      })
    }, error => {
      loading.dismiss();
      this.global.presentToast("Cannot find your location");
    })
  }

  goToSearchPopUp() {
    let alert = this.alertCtrl.create({
      title: 'Search',
      subTitle: 'Enter city name or any keyword',
      inputs: [{
        name: 'keyword',
        placeholder: 'Enter keyword, city name, country'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Search',
        handler: data => {
          console.log(data.keyword);
          this.global.setSearch(data.keyword);
          this.global.setSearchFlag(true);
          this.navCtrl.push(ListPage);
        }
      }]
    })
    alert.present();
  }
  goToCountryStations() {
    this.global.setSearchFlag(false);
  }


}