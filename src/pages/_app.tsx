import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";

import "~/styles/globals.css";

import "~/styles/components/menu.css";
import "~/styles/components/appShell.css";
import "~/styles/components/actionIcon.css";
import "~/styles/components/slider.css";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import {
  MantineProvider,
  type VariantColorsResolver,
  createTheme,
  defaultVariantColorsResolver,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { Provider } from "jotai";
import { Inter } from "next/font/google";
import Head from "next/head";
import { SeoTags } from "~/components/shared/seo-tags";
import { type NextComponentType, type NextPageContext } from "next";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
});

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  if (input.variant === "subtle") {
    return {
      background: "transparent",
      hover: "#27272a",
      color: "#fff",
      border: "none",
    };
  }

  if (input.variant === "outline") {
    return {
      background: "transparent",
      hover: "#27272a",
      color: "#fff",
      border: "1px solid #27272a",
    };
  }

  if (input.variant === "transparent") {
    return {
      background: "transparent",
      hover: "transparent",
      color: "#fff",
      border: "none",
    };
  }

  return defaultResolvedColors;
};

const theme = createTheme({
  headings: {
    fontFamily: inter.style.fontFamily,
  },

  fontFamily: inter.style.fontFamily,

  primaryColor: "dark",

  colors: {
    dark: [
      "#f3f4f6",
      "#e3e4e8",
      "#ccced7",
      "#a7aab9",
      "#27272a",
      "#60647b",
      "#515367",
      "#09090b",
      "#474957",
      "#3f3f4b",
      "#393a41",
    ],

    gray: [
      "#f7f7f8",
      "#eeeef0",
      "#dadadd",
      "#babbbf",
      "#94959c",
      "#767681",
      "#606169",
      "#4e4e56",
      "#434349",
      "#3b3c3f",
      "#27272a",
    ],
  },

  variantColorResolver,
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: {
    session: Session | null;
    response?: {
      music?: {
        id: string;
      };
    };
  };
}) => {
  return (
    <>
      <Head>
        <title>Melody Mix</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

        <link rel="icon" type="image/x-icon" href="/fav.svg" />

        {!pageProps.response?.music && (
          <SeoTags
            description="BOP Music is a free music streaming service that allows you to listen to your favorite songs, create playlists and share them with your friends."
            image="https://bop.mohitxskull.dev/banner.png"
            title="BOP Music"
            url="https://bop.mohitxskull.dev"
          />
        )}
      </Head>
      <Provider>
        <SessionProvider session={session}>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            <ModalsProvider>
              <Notifications />
              <Component {...pageProps} />
            </ModalsProvider>
          </MantineProvider>
        </SessionProvider>
      </Provider>
    </>
  );
};

export default api.withTRPC(MyApp);
