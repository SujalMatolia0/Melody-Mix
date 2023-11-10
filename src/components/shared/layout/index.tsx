import React from 'react';
import { AppShell } from '@mantine/core';
import { useAtom } from 'jotai';
import { NavbarAtom } from '~/lib/jotai';
import { ExternalHeaderComp } from '../header/external';
import { InternalHeaderComp } from '../header/internal';
import { NavbarComp } from '../navbar';
import { PlayerFooterComp } from '../footer/player';
import { ProfileHeaderComp } from '../header/profile';
import { ProfileNavbarComp } from '../navbar/profile';

const HeadersObj = {
  external: {
    height: 45,
    Component: ExternalHeaderComp,
  },
  internal: {
    height: 45,
    Component: InternalHeaderComp,
  },
  profile: {
    height: 45,
    Component: ProfileHeaderComp,
  },
  none: {
    height: 0,
    Component: () => <></>,
  },
};

const FooterObj = {
  // normal: FooterComp,
  player: {
    height: 80,
    Component: PlayerFooterComp,
  },
  none: {
    height: 0,
    Component: () => <></>,
  },
};

const NavbarObj = {
  normal: {
    width: 300,
    Component: NavbarComp,
  },
  profile: {
    width: 300,
    Component: ProfileNavbarComp
  },
  none: {
    width: 0,
    Component: () => <></>,
  },
};

interface MainLayoutProps {
  children: React.ReactNode;
  header?: keyof typeof HeadersObj;
  footer?: keyof typeof FooterObj;
  navbar?: keyof typeof NavbarObj;
  fullHeight?: boolean;
}

export const MainLayout = ({
  children,
  footer = 'none',
  header = 'none',
  navbar = 'none',
  fullHeight = false,
}: MainLayoutProps) => {
  const [NavbarState] = useAtom(NavbarAtom);

  const Header = HeadersObj[header];
  const Footer = FooterObj[footer];
  const Navbar = NavbarObj[navbar];

  return (
    <AppShell
      header={{
        height: Header.height,
        collapsed: Header.height === 0,
      }}
      footer={{
        height: Footer.height,
        collapsed: Footer.height === 0,
      }}
      navbar={{
        width: Navbar.width,
        breakpoint: 'sm',
        collapsed: {
          mobile: !NavbarState && Navbar.width === 0,
          desktop: Navbar.width === 0,
        },
      }}
      padding="md"
    >
      <AppShell.Header withBorder={Header.height !== 0}>
        <Header.Component />
      </AppShell.Header>

      <AppShell.Navbar
        p={Navbar.width === 0 ? 0 : 'md'}
        h="100%"
        withBorder={Navbar.width !== 0}
      >
        <Navbar.Component />
      </AppShell.Navbar>

      <AppShell.Main h={fullHeight ? '100vh' : 'auto'}>
        {children}
      </AppShell.Main>

      <AppShell.Footer zIndex={200} withBorder={Footer.height !== 0}>
        <Footer.Component />
      </AppShell.Footer>
    </AppShell>
  );
};
