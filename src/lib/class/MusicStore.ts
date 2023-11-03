import { get, set, keys, setMany } from 'idb-keyval';
import { type SongObjectType } from '../types/player';

export class MusicStore {
  private isWindowSupported() {
    return typeof window !== 'undefined';
  }

  private isIndexedDBSupported() {
    return this.isWindowSupported() && 'indexedDB' in window;
  }

  private likedSongs: string[] = [];

  private keys: IDBValidKey[] = [];

  constructor() {
    if (!this.isWindowSupported()) {
      return;
    }

    if (!this.isIndexedDBSupported()) {
      throw new Error('IndexedDB is not supported in this browser');
    }

    void keys().then((keys) => {
      this.keys = keys;
    });
  }

  private async setSongs(songs: SongObjectType[]) {
    const uniqueSongs = songs.filter((song) => {
      if (this.keys.includes(song.id)) {
        return false;
      }
      return true;
    });

    await setMany(uniqueSongs.map((song) => [song.id, song]));
  }

  public async getSongs(songIds: string[]) {
    const songs: SongObjectType[] = [];

    for (const songId of songIds) {
      const song = await get<SongObjectType>(songId);

      if (song) {
        songs.push(song);
      }
    }

    return songs;
  }

  // ====================================================

  public hasLikedSongsInDb() {
    return this.keys.includes('likedSongs');
  }

  public async setLikedSongs(songIds: string[]) {
    this.likedSongs = songIds;
    await set('likedSongs', songIds);
  }

  public async isLikedSong(songId: string) {
    const likedSongs = await this.getLikedSongs();

    return likedSongs.includes(songId);
  }

  public async addToLikedSongs(songId: string) {
    const likedSongs = await this.getLikedSongs();

    if (!likedSongs.includes(songId)) {
      likedSongs.push(songId);
    }

    this.likedSongs = likedSongs;
    await set('likedSongs', likedSongs);
  }

  public async getLikedSongs() {
    if (this.likedSongs.length > 0) {
      return this.likedSongs;
    }

    const likedSongs = await get<string[]>('likedSongs');

    if (likedSongs) {
      this.likedSongs = likedSongs;
    }

    return this.likedSongs;
  }

  public async removeLikedSong(songId: string) {
    const likedSongs = await this.getLikedSongs();

    const index = likedSongs.indexOf(songId);

    if (index > -1) {
      likedSongs.splice(index, 1);
    }

    this.likedSongs = likedSongs;
    await set('likedSongs', likedSongs);
  }
}
