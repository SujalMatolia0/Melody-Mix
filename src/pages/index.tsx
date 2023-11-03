import { Center, Stack, Title } from '@mantine/core';
import { MainLayout } from '~/components/shared/layout';

export default function HomePage() {
  return (
    <>
      <MainLayout fullHeight header="external">
        <Center h="100%">
          <Stack>
            <Title maw={700} ta="center">
            Melody Mix: Your groove maestro, remixing your musical journey for every vibe.
            </Title>
          </Stack>
        </Center>
      </MainLayout>
    </>
  );
}
