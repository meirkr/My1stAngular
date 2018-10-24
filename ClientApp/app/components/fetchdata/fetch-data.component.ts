import { Component, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { empty } from 'rxjs/Observer';


@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];
    public forecastsEmpty: WeatherForecast[];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/SampleData/WeatherForecasts/2').subscribe(result => {
            this.forecasts = result.json() as WeatherForecast[];
        }, error => console.error(error));
    }

    public DoSomething() {

    }
    public doSearch(delayInMs:number)
    {
        
        this.forecasts = this.forecastsEmpty;
        
        this.http.get(this.baseUrl + `api/SampleData/WeatherForecasts/${delayInMs}`).subscribe(result => {
            this.forecasts = result.json() as WeatherForecast[];
        }, error => console.error(error));
    }
   
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
