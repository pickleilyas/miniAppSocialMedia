import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/comments";




export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
);


export const addComment = createAsyncThunk(
    "comments/addComment",
    async (newComment) => {
        const response = await axios.post(API_URL, newComment);
        return response.data;
    }
);


export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
);