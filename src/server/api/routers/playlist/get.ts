import { PlaylistZod } from '~/lib/zod/playlist';
import { protectedProcedure } from '../../trpc';
import { TRPCError } from '@trpc/server';

export const playlistGetRoute = protectedProcedure
  .input(PlaylistZod.$Id)
  .query(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;

    const playlist = await ctx.db.playlist.findUnique({
      where: {
        id: input,
      },

      select: {
        id: true,
        image: true,
        title: true,
        public: true,
        CreatorId: true,
        songsCount: true,
        Songs: {
          select: {
            id: true,
            title: true,
            artist: true,
            image: true,
            source: true,
            length: true,
          },
        },
      },
    });

    if (!playlist) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Playlist not found',
      });
    }

    if (!playlist.public && playlist.CreatorId !== userId) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You do not have permission to view this playlist',
      });
    }

    return playlist;
  });
