import { GameOption } from './game-option.enum';

export interface GamePlayer {
  type: 'player' | 'computer' | undefined;
  name: string | undefined;
  currentSelectedOption: GameOption | undefined;
  wins: number;
}
