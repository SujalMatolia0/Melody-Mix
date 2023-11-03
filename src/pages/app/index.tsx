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
            <Stack gap={2}>
              <Title order={4}>Top hits </Title>
              <Card
                shadow="lg"
                padding="lg"
                style={{
                  maxWidth: 140,
                  background: "gray",
                }}
              >
                <Card.Section className="overflow-visible py-2">
                  <Image
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f101ee52097223.590463d3471b4.jpg"
                    alt="album"
                    style={{
                      border: "5px solid gray",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Card.Section>
                <Card.Section>
                  <Stack gap={0}>
                    <Text fz="md" pl="8px" pt="3px" fw={500}>
                      song name
                    </Text>
                    <Text fz="sm" pl="8px" pb="2px">
                      artist
                    </Text>
                  </Stack>
                </Card.Section>
              </Card>
              <Space h="xs" />
            </Stack>
            <Stack gap={2}>
              <Title order={4}>Your top mix </Title>
              <Card
                shadow="lg"
                padding="lg"
                style={{
                  maxWidth: 140,
                  background: "gray",
                }}
              >
                <Card.Section className="overflow-visible py-2">
                  <Image
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f101ee52097223.590463d3471b4.jpg"
                    alt="album"
                    style={{
                      border: "5px solid gray",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Card.Section>
                <Card.Section>
                  <Stack gap={0}>
                    <Text fz="md" pl="8px" pt="3px" fw={500}>
                      song name
                    </Text>
                    <Text fz="sm" pl="8px" pb="2px">
                      artist
                    </Text>
                  </Stack>
                </Card.Section>
              </Card>
              <Space h="xs" />
            </Stack>
          </Stack>
        </MainLayout>
      </MusicProvider>
    </>
  );
}
