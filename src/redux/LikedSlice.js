import { createSlice } from "@reduxjs/toolkit";

let LikedSlice = createSlice({
    name: "playlist",
    initialState: [],
    reducers: {
        AddLiked: (state, action) => {
            let exist = state.find((song) => song.songIndex == action.payload.songIndex)
            if (exist) {
                return
            } else {
                state.push(action.payload)
            }

        },

        RemoveLiked: (state, action) => {
            return state.filter((song) => (song.songIndex !== action.payload))
        }
    }
})

export const { AddLiked, RemoveLiked } = LikedSlice.actions
export default LikedSlice.reducer