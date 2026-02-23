import { createSelector } from "@reduxjs/toolkit";

export const selectAllComments = (state) => state.comments.list;

export const selectCommentsByPost = (postId) =>
    createSelector([selectAllComments], (list) =>
        list.filter((comment) => comment.postId === postId)
    );

export const selectCommentCountByPost = (postId) => (state) =>
    state.comments.list.filter(
        (comment) => comment.postId === postId
    ).length;