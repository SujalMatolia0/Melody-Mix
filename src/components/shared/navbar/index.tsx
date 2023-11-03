import { Space, Stack, Title } from '@mantine/core';
import {
  IconDisc,
  IconHeart,
  IconHome,
  IconPlaylist,
  IconSearch,
} from '@tabler/icons-react';
import { NavBarButton } from './button';
import { NavbarPlaylistComp } from './playlist';

export const NavbarComp = () => {
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
          <Title order={4}>Library</Title>

          <Space h="xs" />

          <NavBarButton href="/app/like" icon={<IconHeart size={18} />}>
            Liked Songs
          </NavBarButton>

          <NavBarButton href="/app/playlist" icon={<IconPlaylist size={18} />}>
            Playlist
          </NavBarButton>

          <NavBarButton href="/app/song" icon={<IconDisc size={18} />}>
            Song
          </NavBarButton>
        </Stack>

        <NavbarPlaylistComp />
      </Stack>
    </>
  );
};
