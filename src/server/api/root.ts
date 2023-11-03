import { createTRPCRouter } from '~/server/api/trpc';
import { trackRouter } from './routers/track';
import { playlistRouter } from './routers/playlist';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  track: trackRouter,
  playlist: playlistRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
