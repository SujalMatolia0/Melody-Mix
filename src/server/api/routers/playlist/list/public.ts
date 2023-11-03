import { WorldZod } from '~/lib/zod';
import { protectedProcedure } from '~/server/api/trpc';

export const playlistListPublicRoute = protectedProcedure
  .input(WorldZod.Pagination)
  .query(async ({ input, ctx }) => {
    const dataPromise = ctx.db.playlist.findMany({
      skip: (input.page - 1) * input.limit,
      take: input.limit,
      where: {
        public: true,
      },

      select: {
        id: true,
        image: true,
        title: true,
        songsCount: true,
      },
    });

    const countPromise = ctx.db.playlist.count();

    const [data, count] = await ctx.db.$transaction([
      dataPromise,
      countPromise,
    ]);

    return {
      playlists: data,
      total: count,
      query: input,
    };
  });
