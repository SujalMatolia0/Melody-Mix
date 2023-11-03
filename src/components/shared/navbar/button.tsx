import { Button } from '@mantine/core';
import Link from 'next/link';
import { type ReactNode } from 'react';

export const NavBarButton = (props: {
  icon: ReactNode;
  href: string;
  children: ReactNode;
}) => (
  <Button
    variant="subtle"
    leftSection={props.icon}
    justify="left"
    component={Link}
    href={props.href}
    size="sm"
  >
    {props.children}
  </Button>
);
