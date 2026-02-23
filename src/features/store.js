import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../features/auth/authSlice'
import userSlice from '../features/users/usersSlice'
import postsSlice from '../features/posts/postsSlice'
import commentsSlice from '../features/comments/commentsSlice'
export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        posts: postsSlice,
        comments: commentsSlice,
    }
})