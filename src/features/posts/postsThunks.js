import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/posts"
export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async () => {
        const response = await axios.get(API_URL)
        return response.data
    }
)
export const addPost = createAsyncThunk(
    "posts/addPost",
    async (newPost) => {
        const response = await axios.post(API_URL, newPost);
        return response.data;
    }
);


export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (post) => {
        const response = await axios.put(`${API_URL}/${post.id}`, post);
        return response.data;
    }
);


export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
);