import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideComponentStore } from '@ngrx/component-store';
import { filter, map, withLatestFrom } from 'rxjs';
import { GameOption, GamePlayer } from '../models';
import { GameStore } from '../store';
import { GameMenuComponent } from './game-menu.component';
import { GameOptionsComponent } from './game-options.component';
import { GamePlayerFormComponent } from './game-player-form.component';
import { GameResultComponent } from './game-result.component';

@Component({
  selector: 'app-game-container',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    GameMenuComponent,
    GamePlayerFormComponent,
    GameOptionsComponent,
    GameResultComponent
  ],
  providers: [provideComponentStore(GameStore)],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.scss'
})
export class GameContainerComponent {
  readonly store = inject(GameStore);

  readonly result$ = this.store.status$.pipe(
    filter((status) => status === 'finished'),
    withLatestFrom(this.store.playerOne$, this.store.playerTwo$),
    map(([_, playerOne, playerTwo]) => this.calculateResult(playerOne, playerTwo))
  );

  private winningCombinations = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };

  private calculateResult(playerOne: GamePlayer, playerTwo: GamePlayer) {
    const options = Object.values(GameOption);

    const playerOneOption = playerOne.currentSelectedOption;

    const playerTwoOption =
      playerTwo.type === 'computer'
        ? options[Math.floor(Math.random() * options.length)]
        : playerTwo.currentSelectedOption;

    if (playerOneOption === playerTwoOption) {
      return `Draw! Both chose ${playerOneOption}`;
    }

    const playerOneWins =
      playerTwoOption === this.winningCombinations[playerOneOption as GameOption];

    if (playerOneWins) {
      this.store.setPlayerOneWins(playerOne.wins + 1);
      return `${playerOne.name} (Player 1) wins! ${playerOneOption} beats ${playerTwoOption}.`;
    } else {
      this.store.setPlayerTwoWins(playerTwo.wins + 1);
      return `${playerTwo.name} ${playerTwo.type !== 'computer' ? '(Player 2)' : ''} wins! ${playerTwoOption} beats ${playerOneOption}.`;
    }
  }
}
