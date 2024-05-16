import { Component, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GamePlayer } from '../models';

@Component({
  selector: 'app-game-result',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './game-result.component.html'
})
export class GameResultComponent {
  @Input() result: string;

  @Input() playerOne: GamePlayer;

  @Input() playerTwo: GamePlayer;

  readonly play = output();

  readonly save = output();

  readonly finish = output();
}
