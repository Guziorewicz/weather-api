import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherMapComponent } from './weather-map/weather-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WeatherMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app';
}
