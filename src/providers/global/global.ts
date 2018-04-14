import { Injectable } from '@angular/core';
import { RoundProgressConfig } from 'angular-svg-round-progressbar';
import { BehaviorSubject } from 'rxjs/Rx';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Injectable()
export class GlobalProvider {
  country;
  searchFlag;
  listCityFlag;
  search;
  themeColor;
  private theme : BehaviorSubject<String>;
  constructor(public circleConfig : RoundProgressConfig, public toastCtrl: ToastController) {
    this.theme = new BehaviorSubject ('green-theme');
  }
  presentToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  setActiveTheme(val){
    this.theme.next(val);
  }
  getActiveTheme(){
    return this.theme.asObservable();
  }
  setCountry(x){
    this.country = x;
  }
  setSearchFlag(x){
    this.searchFlag = x;
  }
  setSearch(x){
    this.search = x;
  }
  setThemeColor(x){
    this.themeColor = x;
  }
  toggleAppTheme(color) {
    switch(color){
      case 'green':{
        this.setActiveTheme('green-theme');
        break;
      }
      case 'yellow':{
        this.setActiveTheme('yellow-theme');
        break;
      }
      case 'orange':{
        this.setActiveTheme('orange-theme');
        break;
      }
      case 'red':{
        this.setActiveTheme('red-theme');
        break;
      }
      case 'purple':{
        this.setActiveTheme('purple-theme');
        break;
      }
    }
  }
  progressBarDefaults() {
    this.circleConfig.setDefaults({
      animation: 'easeOutBounce',
      duration: 1000,
      radius: 125,
      semicircle: false,
      rounded: true,
      stroke: 30,
      animationDelay: 20,
    })
  }

}
