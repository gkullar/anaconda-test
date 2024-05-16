import { Component, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GameMode, GameOption, GamePlayer } from '../models';

@Component({
  selector: 'app-game-options',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './game-options.component.html'
})
export class GameOptionsComponent {
  @Input() gameMode: GameMode;

  @Input() player: GamePlayer;

  readonly selectPlayerOption = output<GameOption>();

  readonly option = GameOption;
}
