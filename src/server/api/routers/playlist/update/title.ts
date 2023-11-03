import { TRPCError } from '@trpc/server';
import { PlaylistZod } from '~/lib/zod/playlist';
import { protectedProcedure } from '~/server/api/trpc';

export const playlistUpdateTitleRoute = protectedProcedure
  .input(PlaylistZod.UpdateTitle)
  .query(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;

    const playlist = await ctx.db.playlist.findUnique({
      where: {
        id: input.id,
      },

      select: {
        CreatorId: true,
        title: true,
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

    if (playlist.title === input.title) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Title is the same',
      });
    }

    const playlistName = await ctx.db.playlist.findFirst({
      where: {
        CreatorId: userId,
        id: { not: input.id },
        title: input.title,
      },

      select: {
        title: true,
      },
    });

    if (playlistName) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Playlist with title "${playlistName.title}" already exists`,
      });
    }

    const updatedPlaylist = await ctx.db.playlist.update({
      where: {
        id: input.id,
      },

      data: {
        title: input.title,
      },

      select: {
        title: true,
      },
    });

    return updatedPlaylist;
  });
