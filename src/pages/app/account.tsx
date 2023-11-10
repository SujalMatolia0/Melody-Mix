import { Avatar, Button, Divider, Group, TextInput } from "@mantine/core";
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
        <MainLayout footer="player" header="profile" navbar="profile">
          <h2>Profile</h2>
          <p>This is how others will see you on the site.</p>
          <Divider pb={8} pt={4} />
          <Avatar
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3DF"
            alt="it's me"
            size="xl"
          />
          <form >
            <TextInput
              label="Username"
              placeholder="your name"
              maw={340}
            />

            <TextInput
              label="Email"
              placeholder="your@email.com"
              maw={340}
              
            />

            <Group justify="flex-start" mt="md">
              <Button type="submit">Update Profile</Button>
            </Group>
          </form>
        </MainLayout>
      </MusicProvider>
    </>
  );
}
