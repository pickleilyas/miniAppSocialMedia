import { createSlice } from "@reduxjs/toolkit";
import { fetchComments, addComment, deleteComment } from "./commentsThunks";
const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        list: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder


            .addCase(fetchComments.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })

            .addCase(addComment.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })


            .addCase(deleteComment.fulfilled, (state, action) => {
                state.list = state.list.filter(
                    (comment) => comment.id !== action.payload
                );
            });
    },
});

export default commentsSlice.reducer;