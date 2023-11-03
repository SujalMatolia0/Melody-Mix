import { createGenericContext } from '../create.context';
import { useInterval, useSetState } from '@mantine/hooks';
import { type PlayerStateType } from '~/lib/types/player';
import { type MusicContextTypes } from './music.ctx.types';
import ReactHowler from 'react-howler';
import { useEffect, useRef } from 'react';
import { ErrorNotification } from '~/components/shared/notification';

const [useMusicContext, MusicContextProvider] =
  createGenericContext<MusicContextTypes>();

const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const playerRef = useRef<ReactHowler | null>(null);

  const [PlayerState, setPlayerState] = useSetState<PlayerStateType>({
    source:
      'https://bafybeid52tk3ezrjm5yc4iv47itgjyp55ibvqjrr7selwapv3ne7d2bipe.ipfs.w3s.link/SpotifyMate.com%20-%20Hasti%20Rahe%20Tu%20-%20Paradox.mp3',
    playing: false,
    volume: 0.1,
    progress: 0,
    repeat: 'none',
    shuffle: false,
    mute: false,
    duration: 0,
    loaded: false,
  });

  const internalProgressUpdate = () => {
    if (playerRef.current && PlayerState.loaded) {
      setPlayerState({ progress: playerRef.current.seek() });
    }
  };

  const setProgress = (value: number) => {
    if (playerRef.current) {
      playerRef.current.seek(value);

      internalProgressUpdate();
    }
  };

  const interval = useInterval(() => internalProgressUpdate(), 1000);

  useEffect(() => {
    if (playerRef.current) {
      setPlayerState({ duration: playerRef.current.duration() });
    }
  }, [PlayerState.source, PlayerState.loaded]);

  return (
    <MusicContextProvider
      value={{
        setProgress,
        PlayerState,
        setPlayerState,
      }}
    >
      {children}
      <ReactHowler
        ref={playerRef}
        preload
        src={PlayerState.source ?? ''}
        playing={PlayerState.playing}
        loop={PlayerState.repeat === 'all'}
        volume={PlayerState.volume}
        mute={PlayerState.mute}
        onPlay={() => {
          console.log('play');
          interval.start();
        }}
        onPause={() => {
          console.log('pause');
          interval.stop();
        }}
        onStop={() => {
          console.log('stop');
          interval.stop();
        }}
        onEnd={() => {
          console.log('end');
          interval.stop();
        }}
        onLoad={() => {
          setPlayerState({ loaded: true });
        }}
        onLoadError={(id, err) => {
          console.log(err);
          ErrorNotification('An error occured while loading the song.');
        }}
        onPlayError={(id, err) => {
          console.log(err);
          ErrorNotification('An error occured while playing the song.');
        }}
      />
    </MusicContextProvider>
  );
};

export { useMusicContext, MusicProvider };
