import { z } from 'zod';

export class SongZod {
 public static $Id = z.string().min(1).max(50);
 public static $Title = z.string().min(1).max(100);
 public static $Artist = z.string().min(1).max(100);
 public static $Image = z.string().min(1).max(1000);
 public static $Source = z.string().min(1).max(1000);
 public static $Length = z.number().min(1)
 public static $type = z.enum(['public', 'private']);

 public static New = z.object({
    title: SongZod.$Title,
    artist: SongZod.$Artist,
    image: SongZod.$Image,
    source: SongZod.$Source,
    type: SongZod.$type,
    length: SongZod.$Length
 });
}

export type SongNew = z.infer<typeof SongZod.New>;