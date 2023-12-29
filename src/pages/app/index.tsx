import { Image, Card, Space, Stack, Title, Text, Divider } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { type GetServerSidePropsContext } from "next";
import router from "next/router";
import { Children, useState } from "react";
import { MainLayout } from "~/components/shared/layout";
import { MusicProvider } from "~/lib/context/music/music.ctx";
import { type WorldZod } from "~/lib/zod";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

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
  const [Pagination] = useSetState<WorldZod>({
    page: 1,
    limit: 6,
  });

  const trackapi = api.track.list.useQuery(Pagination);
  const [isHovered, setIsHovered] = useState(false);
  const handleCardClick = async (songId: unknown) => {
    if (typeof songId === 'string' || typeof songId === 'number') {
      await router.push({
        query: { songId: String(songId) }
      }).catch(error => {
        console.error('Error while routing:', error);
        // Handle the routing error
      });
    } else {
      // Handle the case where songId is not a string or number
      console.error('Invalid songId type:', typeof songId);
      // You might throw an error, log it, or handle it differently based on your requirements
    }
  };
  
  

  return (
    <>
      <MusicProvider>
        <MainLayout header="internal" navbar="normal" footer="player">
          <Stack>
            <Stack gap={2}>
              <Title order={2}>Listen Now ...</Title>
              <Title order={6}>Top picks for you</Title>

              <Divider mb={8} mt={4} />
              {Children.toArray(
                trackapi.data?.tracks.map((data) => (
                  <Card
                    shadow="lg"
                    padding="lg"
                    style={{
                      maxWidth: 180,
                      background: "none",
                    }}
                    onClick={() => handleCardClick(data.id)}
                  >
                    <Card.Section
                      className="overflow-hidden py-2"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={data.image}
                        alt="album"
                        style={{
                          width: "180px",
                          height: "200px",
                          objectFit: "cover",
                          transform: isHovered ? "scale(1.1)" : "scale(1)",
                          transition: "transform 0.3s",
                          borderRadius: "8px",
                          overflowBlock: "hidden",
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      />
                    </Card.Section>
                    <Card.Section>
                      <Stack gap={0}>
                        <Text fz="md" pl="8px" pt="3px" fw={500}>
                          {data.title}
                        </Text>
                        <Text fz="xs" pl="8px" pb="2px">
                          {data.artist}
                        </Text>
                      </Stack>
                    </Card.Section>
                  </Card>
                ))
              )}

              <Space h="xs" />
            </Stack>
            <Stack gap={2}>
              <Title order={2}>Just For You</Title>
              <Title order={6}>Your moods</Title>

              <Divider mb={8} mt={4} />
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
