import { PlaylistZod } from '~/lib/zod/playlist';
import { protectedProcedure } from '../../trpc';
import { TRPCError } from '@trpc/server';

export const playlistNewRoute = protectedProcedure
  .input(PlaylistZod.New)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;

    const playlistCount = await ctx.db.playlist.count({
      where: {
        CreatorId: userId,
      },
    });

    // max 20 playlists
    if (playlistCount >= 20) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You have reached the maximum number of playlists',
      });
    }

    const playlistTitle = await ctx.db.playlist.findFirst({
      where: {
        title: input.title,
        CreatorId: userId,
      },
    });

    if (playlistTitle) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You already have a playlist with this title',
      });
    }

    await ctx.db.playlist.create({
      data: {
        title: input.title,
        image: input.image,
        CreatorId: userId,
      },
    });
  });
