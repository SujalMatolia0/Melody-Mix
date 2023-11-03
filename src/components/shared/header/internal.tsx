import { Button, Group, Text } from '@mantine/core';
import { LogoTxt } from '../logo/text';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { modals } from '@mantine/modals';
import { useState } from 'react';

export const InternalHeaderComp = () => {
  const [SigningOut, setSigningOut] = useState(false);

  const HandelSignOut = () => {
    modals.openConfirmModal({
      centered: true,
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Are you sure you want to sign out from your account?
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { loading: SigningOut, variant: 'transparent', c: 'red.5' },
      cancelProps: { disabled: SigningOut, variant: 'transparent' },
      onCancel: () => console.log('Signout canceled'),
      onConfirm: () => {
        setSigningOut(true);
        void signOut({
          callbackUrl: '/',
        });
      },
    });
  };

  return (
    <>
      <Group h="100%" px="md" justify="space-between">
        <LogoTxt />

        <Group gap="xs">
          <Button
            size="xs"
            variant="transparent"
            component={Link}
            href="/app/account"
          >
            Account
          </Button>

          <Button
            size="xs"
            variant="transparent"
            onClick={() => {
              HandelSignOut();
            }}
            c="red.5"
          >
            Logout
          </Button>
        </Group>
      </Group>
    </>
  );
};
