export type PlayerStateType = {
  avatar: string | null | undefined;
  title: ReactNode;
  artist: ReactNode;
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
