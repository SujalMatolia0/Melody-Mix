import { Image, Card, Space, Stack, Title, Text } from "@mantine/core";
import { type GetServerSidePropsContext } from "next";
import { MainLayout } from "~/components/shared/layout";
import { MusicProvider } from "~/lib/context/music/music.ctx";
import { getServerAuthSession } from "~/server/auth";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }

  return {
    props: {},
  };
}

export default function AppPage() {
  return (
    <>
      <MusicProvider>
        <MainLayout header="internal" navbar="normal" footer="player">
          <Stack>
             <Title order={2} >Liked Playlist</Title>   
          </Stack>
        </MainLayout>
      </MusicProvider>
    </>
  );
}
