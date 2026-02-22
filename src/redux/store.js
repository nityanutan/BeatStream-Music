import { configureStore } from "@reduxjs/toolkit"
import playlistSlice from "./PlaylistSlice"
import likedSlice from "./LikedSlice"
export const store = configureStore({
    reducer: {
        playlist: playlistSlice,
        liked: likedSlice
    }

})