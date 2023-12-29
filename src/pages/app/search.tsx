import React from "react";
import { Stack, Group, TextInput, Title, Divider, Text, Card } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { type GetServerSidePropsContext } from "next";
import { MainLayout } from "~/components/shared/layout";
import { MusicProvider } from "~/lib/context/music/music.ctx";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function AppPage() {
  const [searchText, setSearchText] = React.useState("");
  const { data: tracks = [], error, isLoading } = api.track.get.useQuery(searchText);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <MusicProvider>
        <MainLayout header="internal" navbar="normal" footer="player">
          <Stack>
            <Group style={{ position: "relative" }}>
              <Stack>
                <TextInput
                  radius="md"
                  variant="unstyled"
                  placeholder="Search..."
                  size="md"
                  rightSection={<IconSearch />}
                  value={searchText}
                  onChange={handleSearch}
                  style={{
                    outline: "2px solid white",
                    outlineOffset: "3px",
                    borderRadius: "5px",
                  }}
                />
                <Title order={5}>Recents</Title>
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>No Track Found</p>
                ) : (
                  tracks.map((track) => (
                    <Card key={track.id} shadow="md" padding="md" radius="md" style={{ marginBottom: "15px" }}>
                    <Text size="lg"  style={{ marginBottom: "8px" }}>
                      {track.title}
                    </Text>
                    <Text size="sm" style={{ marginBottom: "8px" }}>
                      Artist: {track.artist}
                    </Text>
                   
                  </Card>
                  ))
                )}
              </Stack>
            </Group>
            <Divider />
          </Stack>
        </MainLayout>
      </MusicProvider>
    </>
  );
}
