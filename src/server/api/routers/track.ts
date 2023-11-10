import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { WorldZod } from '~/lib/zod';
import { SongZod } from '~/lib/zod/track';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const trackRouter = createTRPCRouter({
  get: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const track = await ctx.db.song.findUnique({
      where: {
        id: input,
      },

      select: {
        id: true,
        artist: true,
        image: true,
        PlaylistId: true,
        source: true,
        title: true,
      },
    });

    if (!track) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Track not found',
      });
    }

    return track;
  }),

  list: protectedProcedure
    .input(WorldZod.Pagination)
    .query(async ({ input, ctx }) => {
      const dataPromise = ctx.db.song.findMany({
        skip: (input.page - 1) * input.limit,
        take: input.limit,
      });

      const countPromise = ctx.db.song.count();

      const [data, count] = await ctx.db.$transaction([
        dataPromise,
        countPromise,
      ]); 

      return {
        tracks: data,
        total: count,
        query: input,
  
      };
    }),



  new: protectedProcedure
    .input(SongZod.New)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.song.create({
        data: {
          title: input.title,
          artist: input.artist,
          image: input.image,
          source: input.source,
          length: input.length,
          type: input.type,
        },
      });
    }),
});
