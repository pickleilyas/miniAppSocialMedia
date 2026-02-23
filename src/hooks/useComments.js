import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment } from "../features/comments/commentsThunks";
import { selectCommentsByPost } from "../features/comments/commentsSelectors";

export function useComments(postId, currentUser) {
    const dispatch = useDispatch();
    const comments = useSelector(selectCommentsByPost(postId));
    const [commentText, setCommentText] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    const handlePublish = () => {
        if (!commentText.trim()) return;
        dispatch(addComment({ postId, content: commentText, authorId: currentUser.id }));
        setCommentText("");
    };

    const handleDeleteComment = (commentId) => {
        setCommentToDelete(commentId);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        if (commentToDelete) dispatch(deleteComment(commentToDelete));
        setShowConfirm(false);
        setCommentToDelete(null);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setCommentToDelete(null);
    };

    return {
        comments,
        commentText,
        setCommentText,
        showConfirm,
        handlePublish,
        handleDeleteComment,
        confirmDelete,
        cancelDelete,
    };
}
