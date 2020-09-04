export class City {
    aqi;
    cityName;
    country;
    timeMeasured;
    color;
    message;
    constructor(x,list) {
      if(!list){
        this.aqi = x.data.aqi;
        this.cityName = x.data.city.name.split(',')[0];
        this.timeMeasured = x.data.time.s;
        this.country = this.getCountryName(x.data.city.url);
        this.getMessageAndColor();
      }
      else{
        this.aqi = x.aqi;
        this.cityName = x.station.name.split(',')[0];
        this.timeMeasured = x.time.stime;
        this.getMessageAndColor()
      }
    }
    getCountryName(x) {
        var splitUrl = x.split("/");
        return splitUrl[4];
    }
    getMessageAndColor() {
        if (this.aqi <= 50) {
          this.color = "green";
          this.message = "GOOD";
        }
        else if (this.aqi <= 100) {
          this.color = "yellow";
          this.message = "LOW POLLUTED";
        }
        else if (this.aqi <= 150) {
          this.color = "orange";
          this.message = "UNHEALTHY";
        }
        else if (this.aqi <= 250) {
          this.color = "red";
          this.message = "VERY UNHEALTHY";
        }
        else if (this.aqi > 250) {
          this.color = "purple";
          this.message = "HAZARDOUS";
        }
        else {
          this.color = "green";
          this.message = "No data provided for this station.";
        }
      }

}
