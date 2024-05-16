import { Component, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GameMode } from '../models';

@Component({
  selector: 'app-game-menu',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './game-menu.component.html'
})
export class GameMenuComponent {
  @Input() hasSavedGame: boolean;

  readonly setGameMode = output<GameMode>();

  readonly loadGame = output();
}
