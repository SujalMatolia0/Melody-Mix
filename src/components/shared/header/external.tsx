import { Button, Group } from '@mantine/core';
import { useSes } from '~/lib/hooks/useSes';
import { LogoTxt } from '../logo/text';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const ExternalHeaderComp = () => {
  const { session } = useSes();

  const router = useRouter();

  return (
    <>
      <Group h="100%" px="md" justify="space-between">
        <LogoTxt />

        <Group>
          {router.pathname !== '/signin' && (
            <Button
              size="xs"
              variant="transparent"
              component={Link}
              href={session ? '/app' : '/signin'}
            >
              {session ? 'Go to App' : 'Sign In'}
            </Button>
          )}
        </Group>
      </Group>
    </>
  );
};
