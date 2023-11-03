import { createTRPCRouter } from '../../trpc';
import { playlistNewRoute } from './new';
import { playlistGetRoute } from './get';
import { playlistSongRouter } from './song';
import { playlistListRouter } from './list';

export const playlistRouter = createTRPCRouter({
  new: playlistNewRoute,

  get: playlistGetRoute,

  list: playlistListRouter,

  song: playlistSongRouter,
});
