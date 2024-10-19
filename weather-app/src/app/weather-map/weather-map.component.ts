import { Component, DestroyRef, inject } from '@angular/core';
import { WeatherService } from '../weather.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather-map',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css']
})
export class WeatherMapComponent {

  private destroyRef = inject(DestroyRef);

  public isDataFetched = false;

  // Data
  cities = [
    { name: 'Sydney', lat: -33.8688, lng: 151.2093, timezone: 'Australia/Sydney' },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503, timezone: 'Asia/Tokyo' },
    { name: 'Pekin', lat: 39.9042, lng: 116.4074, timezone: 'Asia/Shanghai' },
    { name: 'New Delhi', lat: 28.6139, lng: 77.2090, timezone: 'Asia/Kolkata' },
    { name: 'Warsaw', lat: 52.2297, lng: 21.0122, timezone: 'Europe/Warsaw' },
    { name: 'Madrid', lat: 40.4168, lng: -3.7038, timezone: 'Europe/Madrid' },
    { name: 'Nairobi', lat: -1.286389, lng: 36.817223, timezone: 'Africa/Nairobi' },
    { name: 'Johannesburg', lat: -26.2041, lng: 28.0473, timezone: 'Africa/Johannesburg' },
    { name: 'Santiago', lat: -33.4489, lng: -70.6693, timezone: 'America/Santiago' },
    { name: 'Toronto', lat: 43.651070, lng: -79.347015, timezone: 'America/Toronto' },
  ];

  public targetedCity: string = '';

  weatherDataString: string | null = null;
  currentCityTime: string | null = null;
  selectedTimezone: string | null = null;
  intervalId: any;  // To operate watch
  weatherData:{
  temperature:number
  windspeed:number
  humidity:number
  precipitation:number
  cloudcover:number
  sunrise:string
  sunset:string
  pressure:number
  } = {
  temperature: 0,
  windspeed: 0,
  humidity: 0,
  precipitation: 0,
  cloudcover: 0,
  sunrise: '',
  sunset: '',
  pressure: 0,
  }

  constructor(private weatherService: WeatherService) {}

 // Fetch data and set timezone
  getWeatherData(city: {name: string, lat: number, lng: number, timezone: string }): void {
    console.log(`Fetching weather data for ${city.name}, Timezone: ${city.timezone}`);
    this.targetedCity = city.name;
    this.selectedTimezone = city.timezone;
    this.updateCityTime();

    if (this.intervalId) {
      clearInterval(this.intervalId);  
    }

    this.intervalId = setInterval(() => {
      this.updateCityTime();
    }, 1000);

    const subscription = this.weatherService.getWeather(city.lat, city.lng).subscribe(
      (data) => {

        this.isDataFetched = true;

        this.weatherData.temperature = data.current_weather.temperature;
        this.weatherData.windspeed = data.current_weather.windspeed;
        this.weatherData.humidity = data.hourly.relative_humidity_2m[0];  
        this.weatherData.precipitation = data.hourly.precipitation[0];    
        this.weatherData.cloudcover = data.hourly.cloudcover[0];          
        this.weatherData.sunrise = data.daily.sunrise[0];                 
        this.weatherData.sunset = data.daily.sunset[0];  
        this.weatherData.pressure = data.hourly.surface_pressure[0];

        console.log(data);
      },
      (error) => {
        console.error('An error occurred: ', error);
      }
    );

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.isDataFetched = false;
    })
  }

  updateCityTime(): void {
    if (this.selectedTimezone) {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: this.selectedTimezone,
      });
      this.currentCityTime = formatter.format(now);  // Actual time
    }
  }

}


