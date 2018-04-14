import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiCallProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiCallProvider {
  private token = '17172517795fa29d7ecb9845d8e72cd318fa3f39';
  constructor(public http: HttpClient) {
    console.log('Hello ApiCallProvider Provider');
  }
  getNearestStation(longitude,latitude){
    return new Promise(resolve =>{
      this.http.get('https://api.waqi.info/feed/geo:' + longitude + ';' + latitude + '/?token=' + this.token)
      .subscribe(data => {
        resolve(data);
        console.log(data);
      })
    });
  }
  getStationByName(name) {
    return new Promise(resolve => {
      this.http.get('https://api.waqi.info/search/?token=' + this.token + '&keyword=' + name).subscribe(data => {
        resolve(data);
        console.log(data);
      }, error => {
        console.log(error.message);
      })
    });
  }
}
