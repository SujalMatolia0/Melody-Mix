import {
  ActionIcon,
  Center,
  Group,
  Skeleton,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconPlus, IconRefresh } from '@tabler/icons-react';
import { api } from '~/utils/api';
import { NavBarButton } from './button';

export const NavbarPlaylistComp = () => {
  const GetPlaylistApi = api.playlist.list.private.useQuery({
    limit: 50,
    page: 1,
  });

  return (
    <>
      <Stack gap={0}>
        <Group justify="space-between">
          <Title order={4}>Playlists</Title>

          <Group>
            <ActionIcon
              size="xs"
              variant="transparent"
              disabled={GetPlaylistApi.isLoading}
            >
              <IconPlus size={18} />
            </ActionIcon>

            <ActionIcon
              size="xs"
              variant="transparent"
              disabled={GetPlaylistApi.isLoading}
              onClick={() => GetPlaylistApi.refetch()}
            >
              <IconRefresh size={18} />
            </ActionIcon>
          </Group>
        </Group>

        <Space h="xs" />

        {GetPlaylistApi.isLoading && (
          <>
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} h={28} mt="sm" />
              ))}
          </>
        )}

        {GetPlaylistApi.isError && (
          <>
            <Text c="red.5" size="xs">
              Unexpected error occurred while fetching your playlists, please
              try again else contact skull.
            </Text>
          </>
        )}

        {GetPlaylistApi.isSuccess && (
          <>
            {GetPlaylistApi.data.total > 0 ? (
              GetPlaylistApi.data.playlists.map((playlist) => (
                <NavBarButton
                  key={playlist.id}
                  href={`/app/playlist/${playlist.id}`}
                  icon={
                    <Text size="sm" fw="bold" c="gray.6">
                      {playlist.id}.
                    </Text>
                  }
                >
                  {playlist.title}
                </NavBarButton>
              ))
            ) : (
              <Center h={100}>
                <Text size="xs" ta="center" c="gray.6">
                  No playlist found
                </Text>
              </Center>
            )}
          </>
        )}
      </Stack>
    </>
  );
};
