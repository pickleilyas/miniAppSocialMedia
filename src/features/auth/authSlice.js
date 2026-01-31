import { createSlice } from "@reduxjs/toolkit";


const userFromStorage = localStorage.getItem("currentUser");

const initialState = {
    currentUser: userFromStorage
        ? JSON.parse(userFromStorage)
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.currentUser = action.payload;

            localStorage.setItem(
                "currentUser",
                JSON.stringify(action.payload)
            );
        },
        logoutUser: (state) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        }
    },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
