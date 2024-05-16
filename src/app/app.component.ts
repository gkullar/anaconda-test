import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GameContainerComponent } from './game/ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, GameContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
