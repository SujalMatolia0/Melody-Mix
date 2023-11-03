export type PlayerStateType = {
  source: string | null;
  playing: boolean;
  volume: number;
  progress: number;
  repeat: 'none' | 'one' | 'all';
  shuffle: boolean;
  mute: boolean;
  duration: number;
  loaded: boolean;
};

export type SongObjectType = {
  id: string;
  title: string;
  artist: string;
  length: number;

  image: string;
  source: string;
};
