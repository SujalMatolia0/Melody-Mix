import { z } from 'zod';

export class WorldZod {
  public static Pagination = z.object({
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(50).default(10),
  });
}
