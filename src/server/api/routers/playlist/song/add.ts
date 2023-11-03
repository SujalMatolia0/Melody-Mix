import { TRPCError } from '@trpc/server';
import { PlaylistZod } from '~/lib/zod/playlist';
import { protectedProcedure } from '~/server/api/trpc';

export const playlistTrackSongRoute = protectedProcedure
  .input(PlaylistZod.AddSong)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;

    const playlist = await ctx.db.playlist.findUnique({
      where: {
        id: input.id,
      },

      select: {
        CreatorId: true,
        public: true,
      },
    });

    if (!playlist) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Playlist not found',
      });
    }

    if (playlist.CreatorId !== userId) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You do not have permission to add songs to this playlist',
      });
    }

    await ctx.db.playlist.update({
      where: {
        id: input.id,
      },

      data: {
        Songs: {
          connect: {
            id: input.songId,
          },
        },
      },
    });
  });
