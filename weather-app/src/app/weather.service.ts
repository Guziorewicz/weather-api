import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lng: number): Observable<any> {
    const url = `http://localhost:3000/meteo-data?lat=${lat}&lng=${lng}`;
    return this.http.get<any>(url);
  }
  // getWeather(lat: number, lng: number): Observable<any> {
  //   const url = `/api/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=sunrise,sunset&hourly=relative_humidity_2m,precipitation,cloudcover,windspeed_10m,surface_pressure&timezone=auto`;
  //   return this.http.get<any>(url);
  // }
}
