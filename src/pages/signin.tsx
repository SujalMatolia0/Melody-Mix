import { Button, Center, Space, Stack, Text } from '@mantine/core';
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Children } from 'react';
import { MainLayout } from '~/components/shared/layout';
import { oauthIcons } from '~/lib/data/oauthIcons';
import { SigninErrCodes } from '~/lib/data/signin.errcodes';
import { getServerAuthSession } from '~/server/auth';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (session) {
    return { redirect: { destination: '/app' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? null },
  };
}

export default function SigninPage({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <>
      <MainLayout fullHeight header="external">
        <Center h="100%">
          <Stack miw={300}>
            {typeof router.query.error === 'string' && (
              <Text maw={300} c="red.5" size="sm" ta="center">
                {SigninErrCodes[router.query.error] ??
                  'Unknown error, contact support.'}
              </Text>
            )}

            <Space h="xs" />

            {providers ? (
              Children.toArray(
                Object.values(providers).map((provider) => (
                  <Button
                    variant="outline"
                    onClick={() => signIn(provider.id)}
                    leftSection={oauthIcons[provider.name]}
                  >
                    Continue with {provider.name}
                  </Button>
                ))
              )
            ) : (
              <Text>Sign in is currently unavailable.</Text>
            )}
          </Stack>
        </Center>
      </MainLayout>
    </>
  );
}
