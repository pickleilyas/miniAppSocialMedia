import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../features/auth/authSlice'
import userSlice from '../features/users/usersSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
    }
}, )