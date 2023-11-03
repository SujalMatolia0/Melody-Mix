import { pino } from 'pino';
import { env } from '~/env.mjs';
import pretty from 'pino-pretty';

const stream = pretty({
  colorize: true,
});

export const TopLogger =
  env.NODE_ENV === 'development'
    ? pino(
        {
          level: 'debug',
        },
        stream
      )
    : pino({
        // TODO: add log file
        level: 'debug',
      });
