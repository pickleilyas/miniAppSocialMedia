import { useDispatch, useSelector } from "react-redux";
import { updatePost, deletePost } from "../features/posts/postsThunks";
import { selectorCurrentUser } from "../features/auth/authSelectors";
import { toast } from "react-hot-toast";

export function usePostActions() {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectorCurrentUser);

    const onLike = (post) => {
        const isLiked = post.likedBy === currentUser.id;
        dispatch(updatePost({
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
            likedBy: isLiked ? null : currentUser.id,
        }));
    };

    const onDelete = (postId) => {
        dispatch(deletePost(postId))
            .unwrap()
            .then(() => toast.success("Post supprimé avec succès !"))
            .catch(() => toast.error("Impossible de supprimer le post."));
    };

    return { onLike, onDelete };
}
