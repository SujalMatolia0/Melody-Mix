import { createTRPCRouter } from '~/server/api/trpc';
import { playlistUpdateTitleRoute } from './title';
import { playlistUpdateImageRoute } from './image';

export const playlistUpdateRouter = createTRPCRouter({
  title: playlistUpdateTitleRoute,
  image: playlistUpdateImageRoute,
});
