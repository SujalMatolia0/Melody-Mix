import { z } from 'zod';
import { SongZod } from './track';

export class PlaylistZod {
  public static $Id = z.string().min(1).max(50);
  public static $Title = z.string().min(1).max(100);
  public static $Image = z.string().min(1).max(1000); // URL

  public static New = z.object({
    title: PlaylistZod.$Title,
    image: PlaylistZod.$Image,
  });

  public static AddSong = z.object({
    id: PlaylistZod.$Id,
    songId: SongZod.$Id,
  });

  public static UpdateTitle = z.object({
    id: PlaylistZod.$Id,
    title: PlaylistZod.$Title,
  });

  public static UpdateImage = z.object({
    id: PlaylistZod.$Id,
    image: PlaylistZod.$Image,
  });
}
