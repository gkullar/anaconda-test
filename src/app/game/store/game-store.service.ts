import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import { tap, withLatestFrom } from 'rxjs';
import { GameMode, GamePlayer, GameOption } from '../models';

export interface State {
  gameMode: GameMode | undefined;
  playerOne: GamePlayer;
  playerTwo: GamePlayer;
  status: 'idle' | 'start' | 'player-one-turn' | 'player-two-turn' | 'finished';
  hasSavedGame: boolean;
}

const INITAL_PLAYER_STATE: GamePlayer = {
  type: undefined,
  name: undefined,
  currentSelectedOption: undefined,
  wins: 0
};

export const INITIAL_STATE: State = {
  gameMode: undefined,
  playerOne: INITAL_PLAYER_STATE,
  playerTwo: INITAL_PLAYER_STATE,
  status: 'idle',
  hasSavedGame: false
};

const LOCAL_STORAGE_KEY = 'game';

@Injectable()
export class GameStore extends ComponentStore<State> {
  private notification = inject(MatSnackBar);

  readonly gameMode$ = this.select((state) => state.gameMode);

  readonly playerOne$ = this.select((state) => state.playerOne);

  readonly playerTwo$ = this.select((state) => state.playerTwo);

  readonly status$ = this.select((state) => state.status);

  readonly hasSavedGame$ = this.select((state) => state.hasSavedGame);

  readonly vm$ = this.select(
    {
      gameMode: this.gameMode$,
      playerOne: this.playerOne$,
      playerTwo: this.playerTwo$,
      status: this.status$,
      hasSavedGame: this.hasSavedGame$
    },
    { debounce: true }
  );

  readonly setGameMode = this.updater((state, gameMode: GameMode) => ({
    ...state,
    gameMode,
    status: 'start'
  }));

  readonly setPlayers = this.updater(
    (
      state,
      { playerOneName, playerTwoName }: { playerOneName: string; playerTwoName?: string }
    ) => ({
      ...state,
      playerOne: {
        ...state.playerOne,
        type: 'player',
        name: playerOneName
      },
      playerTwo: {
        ...state.playerTwo,
        type: playerTwoName ? 'player' : 'computer',
        name: playerTwoName || 'Computer'
      },
      status: 'player-one-turn'
    })
  );

  readonly setPlayerOneOption = this.updater((state, option: GameOption) => ({
    ...state,
    playerOne: { ...state.playerOne, currentSelectedOption: option },
    status: state.gameMode === 'multiplayer' ? 'player-two-turn' : 'finished'
  }));

  readonly setPlayerTwoOption = this.updater((state, option: GameOption) => ({
    ...state,
    playerTwo: { ...state.playerTwo, currentSelectedOption: option },
    status: 'finished'
  }));

  readonly setPlayerOneWins = this.updater((state, value: number) => ({
    ...state,
    playerOne: { ...state.playerOne, wins: value }
  }));

  readonly setPlayerTwoWins = this.updater((state, value: number) => ({
    ...state,
    playerTwo: { ...state.playerTwo, wins: value }
  }));

  readonly setGameStatus = this.updater((state, status: State['status']) => ({
    ...state,
    status
  }));

  readonly saveGame = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.state$),
      tap(([_, state]) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        this.notification.open('Game saved', 'Close', { duration: 3000 });
        this.patchState(() => ({
          hasSavedGame: true,
          status: 'idle'
        }));
      })
    )
  );

  readonly loadGame = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.setState((state) => ({
          ...state,
          ...JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string),
          status: 'player-one-turn'
        }));
        this.notification.open('Game loaded', 'Close', { duration: 3000 });
      })
    )
  );

  readonly finishGame = this.effect(($) =>
    $.pipe(
      tap(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        this.setState((state) => ({
          ...state,
          ...INITIAL_STATE
        }));
      })
    )
  );

  constructor() {
    super(INITIAL_STATE);
  }
}
