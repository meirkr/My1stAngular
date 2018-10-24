import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { empty } from 'rxjs/Observer';


@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];
    public forecastsEmpty: WeatherForecast[];

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
        http.get<WeatherForecast[]>(this.baseUrl + 'api/SampleData/WeatherForecasts/2').subscribe(result => {
            this.forecasts = result;
        }, error => console.error(error));
    }

    public DoSomething() {

    }
    public doSearch(delayInMs:number)
    {
        
        this.forecasts = this.forecastsEmpty;
        
        this.http.get<WeatherForecast[]>(this.baseUrl + `api/SampleData/WeatherForecasts/${delayInMs}`).subscribe(result => {
            this.forecasts = result;
        }, error => console.error(error));
    }
   
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
