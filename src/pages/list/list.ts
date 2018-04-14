import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';
import { ApiCallProvider } from '../../providers/api-call/api-call';
import { City } from '../../objects/city';
import { GlobalProvider } from '../../providers/global/global'
import { DetailsPage } from '../details/details';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Refresher } from 'ionic-angular/components/refresher/refresher';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild(Navbar) navBar: Navbar;
  cities: any = [];
  city: any = {};
  result: any = {};
  selectedTheme: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiCall: ApiCallProvider,
    public global: GlobalProvider, public loadingCtrl: LoadingController) {
    if (!global.searchFlag)
      this.getListData(global.country);
    else
      this.getListData(global.search);
  }
  doRefresh(refresher) {
    if (!this.global.searchFlag)
      this.getListData(this.global.country);
    else
      this.getListData(this.global.search);
    refresher.complete();
  }
  getListData(keyword) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait',
    });
    loading.present();
    this.apiCall.getStationByName(keyword).then(result => {
      this.result = result;
      for (var i = 0; i < this.result.data.length; i++) {
        this.city = new City(this.result.data[i], true);
        this.cities[i] = this.city;
        this.global.setSearchFlag(false);
        if (loading) { loading.dismiss(); loading = null; }
      }
      console.log(this.cities);
    }, error => {
      loading.dismiss();
      this.global.presentToast("Check your internet connection")
    });
  }
  goToDetailPage(city) {
    this.navCtrl.push(DetailsPage, city)

  }
}
