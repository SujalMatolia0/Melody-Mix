import { type PlayerStateType } from '~/lib/types/player';

export type MusicContextTypes = {
  PlayerState: PlayerStateType;
  setProgress: (value: number) => void;
  setPlayerState: (
    statePartial:
      | Partial<PlayerStateType>
      | ((currentState: PlayerStateType) => Partial<PlayerStateType>)
  ) => void;
};
