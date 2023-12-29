import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import {
  IconArrowsShuffle,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerTrackNextFilled,
  IconPlayerTrackPrevFilled,
  IconRepeat,
  IconRepeatOff,
  IconRepeatOnce,
  IconVolume,
  IconVolumeOff,
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMusicContext } from "~/lib/context/music/music.ctx";
import { api } from "~/utils/api";

export const PlayerFooterComp = () => {
  
  const { PlayerState, setPlayerState, setProgress } = useMusicContext();
const [isLiked, setIsLiked] = useState(false);
const { query : songId } = useRouter();



if (typeof songId === 'string') {
  console.log("found")
  const { data: tracks = [] } = api.track.play.useQuery(songId);
} else {
   console.log("Track not Found", songId);
}

  return (
    <Group justify="space-between" h="100%" px="xl" grow>
      <Group>
        <Avatar
          src="https://i.scdn.co/image/ab67616d000048516f04e53cb5309f8e88286842"
          alt="goat"
          size={50}
          radius="sm"
        />

        <Stack gap={5}>
          <Text size="xs" fw="bold" maw={200} truncate="end">
            Lovely Song!
          </Text>
          <Text size="10px" c="gray.6" maw={200} truncate="end">
            Anuv Jain
          </Text>
        </Stack>

        <ActionIcon
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
          size={18}
          onClick={() => setIsLiked((prevIsLiked) => !prevIsLiked)}
        >
          {isLiked ? <IconHeartFilled /> : <IconHeart />}
        </ActionIcon>
      </Group>

      <Stack gap={7} w="100%">
        <Group justify="center">
          <ActionIcon
            variant="transparent"
            onClick={() => setPlayerState({ shuffle: !PlayerState.shuffle })}
            disabled={!PlayerState.loaded}
            color={PlayerState.shuffle ? "#ff6b6b" : "#fff"}
          >
            <IconArrowsShuffle size={18} />
          </ActionIcon>

          <ActionIcon variant="transparent" disabled={!PlayerState.loaded}>
            <IconPlayerTrackPrevFilled size={20} />
          </ActionIcon>

          <ActionIcon
            variant="transparent"
            disabled={!PlayerState.loaded}
            onClick={() => setPlayerState({ playing: !PlayerState.playing })}
            color={PlayerState.playing ? "#ff6b6b" : "#fff"}
          >
            {PlayerState.playing ? (
              <IconPlayerPauseFilled />
            ) : (
              <IconPlayerPlayFilled />
            )}
          </ActionIcon>

          <ActionIcon variant="transparent" disabled={!PlayerState.loaded}>
            <IconPlayerTrackNextFilled size={20} />
          </ActionIcon>

          <ActionIcon
            disabled={!PlayerState.loaded}
            variant="transparent"
            onClick={() => {
              switch (PlayerState.repeat) {
                case "none":
                  setPlayerState({ repeat: "one" });
                  break;

                case "one":
                  setPlayerState({ repeat: "all" });
                  break;

                case "all":
                  setPlayerState({ repeat: "none" });
                  break;
              }
            }}
            color={PlayerState.repeat !== "none" ? "#ff6b6b" : "#fff"}
          >
            {PlayerState.repeat === "none" ? (
              <IconRepeatOff size={18} />
            ) : PlayerState.repeat === "one" ? (
              <IconRepeatOnce size={18} />
            ) : (
              <IconRepeat size={18} />
            )}
          </ActionIcon>
        </Group>

        <Flex gap="xs" align="center">
          <Text size="xs" c="gray.6">
            {new Date(PlayerState.progress * 1000).toISOString().substr(14, 5)}
          </Text>
          <Slider
            disabled={!PlayerState.loaded}
            w="100%"
            size="xs"
            color="gray.0"
            showLabelOnHover={false}
            defaultValue={0}
            thumbSize={10}
            min={0}
            max={PlayerState.duration}
            value={PlayerState.progress}
            onChange={(value) => setProgress(value)}
          />
          <Text size="xs" c="gray.6">
            {new Date(PlayerState.duration * 1000).toISOString().substr(14, 5)}
          </Text>
        </Flex>
      </Stack>

      <Group justify="end">
        <ActionIcon
          variant="transparent"
          onClick={() => setPlayerState({ mute: !PlayerState.mute })}
        >
          {PlayerState.mute || PlayerState.volume === 0 ? (
            <IconVolumeOff size={18} />
          ) : (
            <IconVolume size={18} />
          )}
        </ActionIcon>
        <Slider
          miw={100}
          min={0}
          step={0.01}
          max={1}
          size="xs"
          color="gray.0"
          showLabelOnHover={false}
          value={PlayerState.mute ? 0 : PlayerState.volume}
          onChange={(value) => {
            if (value === 0) {
              setPlayerState({ mute: true });
            } else {
              setPlayerState({ mute: false, volume: value });
            }
          }}
          thumbSize={10}
        />
      </Group>
    </Group>
  );
};
