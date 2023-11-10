import { Space, Stack, Title } from "@mantine/core";
import {
  IconHome,
  IconMusicPlus,
  IconPlaylistAdd,
  IconSearch,
  IconUserCircle,
} from "@tabler/icons-react";
import { NavBarButton } from "./button";

export const ProfileNavbarComp = () => {
  return (
    <>
      <Stack>
        <Stack gap={0}>
          <Title order={4}>Discover</Title>

          <Space h="xs" />

          <NavBarButton href="/app" icon={<IconHome size={18} />}>
            Home
          </NavBarButton>

          <NavBarButton href="/app/search" icon={<IconSearch size={18} />}>
            Search
          </NavBarButton>
        </Stack>

        <Stack gap={0}>
          <Title order={4}>Setting</Title>

          <Space h="xs" />

          <NavBarButton href="/app/account" icon={<IconUserCircle size={18} />}>
            Profile
          </NavBarButton>

          <NavBarButton href="/app/account/addPlaylist" icon={<IconPlaylistAdd size={18} />}>
           Add Playlist
          </NavBarButton>

          <NavBarButton href="/app/account/addSong" icon={<IconMusicPlus size={18} />}>
           Add Song
          </NavBarButton>
        </Stack>
      </Stack>
    </>
  );
};
