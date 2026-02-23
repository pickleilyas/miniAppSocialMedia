import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { selectCommentsByPost } from "../../features/comments/commentsSelectors";
import { Heart, MessageCircle } from "lucide-react";
import { timeAgo } from "../../utils/time";

import PostMenu from "./PostMenu";
import ConfirmModal from "../comments/ConfirmModal";

export default function PostCard({ post, author, currentUser, onLike, onDelete }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showFullContent, setShowFullContent] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const comments = useSelector(selectCommentsByPost(post.id));
    const commentCount = comments.length;

    const isLiked = post.likedBy === currentUser.id;
    const isOwner = currentUser?.id === post.authorId;

    const goToProfile = () => {
        if (!author?.id) return;
        navigate(`/profile/${author.id}`);
    };

    return (
        <>
            <div className="bg-white border rounded-xl shadow-sm relative">
                <div className="flex items-center gap-3 px-4 py-3">
                    <img
                        src={author?.avatar}
                        alt={author?.username}
                        onClick={goToProfile}
                        className="w-9 h-9 rounded-full cursor-pointer"
                    />
                    <span
                        onClick={goToProfile}
                        className="font-semibold text-sm cursor-pointer"
                    >
                        {author?.username}
                    </span>
                    <span className="ml-auto text-xs text-gray-400">
                        {timeAgo(post.createdAt)}
                    </span>

                    {isOwner && (
                        <PostMenu
                            postId={post.id}
                            onDelete={() => setShowConfirm(true)}
                        />
                    )}
                </div>


                {post.image && (
                    <img
                        src={post.image}
                        alt="Post"
                        className="w-full aspect-square object-cover"
                    />
                )}

                <div className="flex items-center gap-4 px-4 py-2">
                    <button onClick={() => onLike(post)}>
                        <Heart
                            className={`w-6 h-6 ${
                                isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
                            }`}
                        />
                    </button>
                    <button
                        onClick={() =>
                            navigate(`/posts/${post.id}`, {
                                state: { background: location },
                            })
                        }
                        className="flex items-center gap-1"
                    >
                        <MessageCircle className="w-6 h-6 text-gray-700" />
                        {commentCount > 0 && (
                            <span className="text-sm text-gray-500">{commentCount}</span>
                        )}
                    </button>
                </div>


                <div className="px-4 text-sm font-semibold">{post.likes} likes</div>


                <div className="px-4 py-1 text-sm">
                    <span
                        onClick={goToProfile}
                        className="font-semibold mr-2 cursor-pointer hover:underline"
                    >
                        {author?.username}
                    </span>
                    <p className={`text-sm ${!showFullContent ? "line-clamp-3" : ""}`}>
                        {post.content}
                    </p>
                    {post.content.split(" ").length > 20 && (
                        <button
                            onClick={() => setShowFullContent(!showFullContent)}
                            className="mt-1 text-blue-500 font-semibold text-xs hover:underline"
                        >
                            {showFullContent ? "Voir moins" : "Voir plus"}
                        </button>
                    )}
                </div>


                {post.hashtags?.length > 0 && (
                    <div className={`px-4 py-1 flex flex-wrap gap-2 ${!showFullContent ? "line-clamp-2" : ""}`}>
                        {post.hashtags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-blue-500 text-xs font-semibold cursor-pointer hover:underline"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {showConfirm && (
                <ConfirmModal
                    message="Voulez-vous vraiment supprimer ce post ?"
                    onConfirm={() => {
                        onDelete(post.id);
                        setShowConfirm(false);
                    }}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </>
    );
}
