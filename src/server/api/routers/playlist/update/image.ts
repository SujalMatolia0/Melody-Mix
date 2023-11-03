import { TRPCError } from '@trpc/server';
import { PlaylistZod } from '~/lib/zod/playlist';
import { protectedProcedure } from '~/server/api/trpc';

export const playlistUpdateImageRoute = protectedProcedure
  .input(PlaylistZod.UpdateImage)
  .query(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;

    const playlist = await ctx.db.playlist.findUnique({
      where: {
        id: input.id,
      },

      select: {
        CreatorId: true,
        image: true,
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
        message: 'You do not have permission to update this playlist',
      });
    }

    if (playlist.image === input.image) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Image is the same',
      });
    }

    const updatedPlaylist = await ctx.db.playlist.update({
      where: {
        id: input.id,
      },

      data: {
        image: input.image,
      },

      select: {
        image: true,
      },
    });

    return updatedPlaylist;
  });
