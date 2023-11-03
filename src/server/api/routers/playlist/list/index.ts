import { createTRPCRouter } from '~/server/api/trpc';
import { playlistListPrivateRoute } from './private';
import { playlistListPublicRoute } from './public';

export const playlistListRouter = createTRPCRouter({
  public: playlistListPublicRoute,

  private: playlistListPrivateRoute,
});
