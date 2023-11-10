import {
  Divider,
  TextInput,
  Group,
  Button,
  Radio,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDidUpdate } from "@mantine/hooks";
import { type GetServerSidePropsContext } from "next";
import router from "next/router";
import { MainLayout } from "~/components/shared/layout";
import { MusicProvider } from "~/lib/context/music/music.ctx";
import { SucessNoti, WarnNoti } from "~/lib/function/Notification";
import { type SongNew } from "~/lib/zod/track";
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
  const createApi = api.track.new.useMutation();

  const SongForm = useForm<SongNew>({
    initialValues: {
      title: "",
      artist: "",
      image: "",
      source: "",
      type: "public",
      length: 0,
    },
  });

  useDidUpdate(() => {
    if (createApi.isSuccess) {
      SongForm.reset();
      SucessNoti("Added successfully");
      void router.push("/app");
    } else if (createApi.error?.data?.zodError) {
      SongForm.setErrors(createApi.error?.data?.zodError?.fieldErrors);
    } else if (createApi.isError) {
      WarnNoti(createApi.error.message);
    }
  }, [createApi.isSuccess, createApi.isError]);

  return (
    <>
      <MusicProvider>
        <MainLayout footer="player" header="profile" navbar="profile">
          <h2>New Song</h2>
          <p>Add a Song for you and your loved one&apos;s.</p>
          <Divider pb={8} pt={4} />
          <form
            onSubmit={SongForm.onSubmit((values) => {
              const valuesWithNumberLength = {
                ...values,
                length: Number(values.length),
              };
              createApi.mutate(valuesWithNumberLength);
            })}
          >
            <TextInput
              withAsterisk
              name="title"
              label="Song Title"
              placeholder="Title"
              disabled={createApi.isLoading}
              {...SongForm.getInputProps("title")}
              maw={340}
            />

            <TextInput
              withAsterisk
              name="artist"
              label="Artist Name"
              placeholder="Name"
              disabled={createApi.isLoading}
              {...SongForm.getInputProps("artist")}
              maw={340}
            />

            <TextInput
              withAsterisk
              name="image"
              label="URL of Image for Song"
              placeholder="Source"
              disabled={createApi.isLoading}
              {...SongForm.getInputProps("image")}
              maw={340}
            />

            <TextInput
              withAsterisk
              name="track"
              label="URL of Track"
              placeholder="Source of Track"
              disabled={createApi.isLoading}
              {...SongForm.getInputProps("source")}
              maw={340}
            />

            <NumberInput
              withAsterisk
              name="length"
              label="Song Length (in seconds)"
              placeholder="Length"
              hideControls
              disabled={createApi.isLoading}
              {...SongForm.getInputProps("length")}
              maw={340}
            />

            <Radio.Group
              name="type"
              label="Select your song to be Public or Private"
              withAsterisk
              {...SongForm.getInputProps("type")}
            >
              <Group mt="xs">
                <Radio value="public" label="Public" disabled={createApi.isLoading} />
                <Radio value="private" label="Private" disabled={createApi.isLoading} />
              </Group>
            </Radio.Group>

            <Group justify="flex-start" mt="md">
              <Button type="submit">Add</Button>
            </Group>
          </form>
        </MainLayout>
      </MusicProvider>
    </>
  );
}
