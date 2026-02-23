import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectAllPosts } from "../../features/posts/postsSelectors";
import { selectorUsers } from "../../features/users/usersSelectors";
import { selectorCurrentUser } from "../../features/auth/authSelectors";

import { useComments } from "../../hooks/useComments";
import CommentItem from "../comments/CommentItem";
import ConfirmModal from "../comments/ConfirmModal";

export default function PostDetail({ modal }) {
    const { postId } = useParams();
    const navigate = useNavigate();

    const posts = useSelector(selectAllPosts);
    const post = posts.find((p) => p.id === postId);

    const users = useSelector(selectorUsers);
    const currentUser = useSelector(selectorCurrentUser);

    const {
        comments,
        commentText,
        setCommentText,
        showConfirm,
        handlePublish,
        handleDeleteComment,
        confirmDelete,
        cancelDelete,
    } = useComments(postId, currentUser);

    if (!post) return null;

    const content = (
        <div className="flex flex-col md:flex-row max-w-3xl w-full bg-white rounded-lg shadow overflow-hidden text-sm">

            <div className="md:flex-1">
                <img src={post.image} alt="post" className="w-full h-full object-cover" />
            </div>


            <div className="md:flex-1 p-3 flex flex-col h-64 md:h-80 border-l">
                <h3 className="font-semibold mb-2">Commentaires</h3>

                <div className="flex-1 overflow-y-auto space-y-1">
                    {comments.map((c) => {
                        const user = users.find((u) => u.id === c.authorId);
                        const isOwner = currentUser?.id === c.authorId;
                        return (
                            <CommentItem
                                key={c.id}
                                comment={c}
                                user={user}
                                isOwner={isOwner}
                                onDelete={handleDeleteComment}
                            />
                        );
                    })}
                </div>


                <div className="border-t pt-3 flex gap-2">
                    <img src={currentUser?.avatar} alt="avatar" className="w-7 h-7 rounded-full" />
                    <input
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Ajouter un commentaire..."
                        className="flex-1 border rounded-full px-3 py-2 text-sm"
                    />
                    <button onClick={handlePublish} className="text-blue-500 font-semibold text-sm">
                        Publier
                    </button>
                </div>
            </div>
        </div>
    );

    if (modal) {
        return (
            <>
                {showConfirm && (
                    <ConfirmModal
                        message="Supprimer ce commentaire ?"
                        onConfirm={confirmDelete}
                        onCancel={cancelDelete}
                    />
                )}
                <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center">
                    <div className="relative z-50">
                        <button
                            onClick={() => navigate(-1)}
                            className="absolute -top-8 right-0 text-white text-xl"
                        >
                            ✕
                        </button>
                        {content}
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="mt-6 flex justify-center">
            {content}
            {showConfirm && (
                <ConfirmModal
                    message="Supprimer ce commentaire ?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
}
