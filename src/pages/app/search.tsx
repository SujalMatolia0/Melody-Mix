import React from "react";
import { Stack, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
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

  return (
    <>
      <MusicProvider>
        <MainLayout header="internal" navbar="normal" footer="player">
          <Stack>
            <Group>
              <Group style={{ position: "relative" }}>
                <TextInput
                  variant="filled"
                  placeholder="Search..."
                  size="md"
                  value={searchText}
                />
                <IconSearch
                  height="19"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              </Group>
            </Group>
          </Stack>
        </MainLayout>
      </MusicProvider>
    </>
  );
}
