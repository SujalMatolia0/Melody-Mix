import { createTRPCRouter } from "~/server/api/trpc";
import { playlistTrackSongRoute } from "./add";

export const playlistSongRouter = createTRPCRouter({
    add: playlistTrackSongRoute,

    // remove: ,
});