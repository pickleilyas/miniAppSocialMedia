import { fetchPosts, addPost, updatePost, deletePost } from "./postsThunks";
import { createSlice } from "@reduxjs/toolkit";
const postsSlice = createSlice({
    name: "posts",
    initialState: {
        list: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })

            .addCase(addPost.fulfilled, (state, action) => {
                state.list.unshift(action.payload);
            })

            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.list.findIndex(
                    (post) => post.id === action.payload.id
                );
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })


            .addCase(deletePost.fulfilled, (state, action) => {
                state.list = state.list.filter(
                    (post) => post.id !== action.payload
                );
            });
    },
});

export default postsSlice.reducer;