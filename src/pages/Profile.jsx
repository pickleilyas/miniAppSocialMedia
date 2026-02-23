import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


import { fetchPosts} from "../features/posts/postsThunks";
import { fetchUsers } from "../features/users/UsersThunk";
import { fetchComments } from "../features/comments/commentsThunks";

import { selectAllPosts } from "../features/posts/postsSelectors";
import { selectorUsers } from "../features/users/usersSelectors";
import { selectorCurrentUser } from "../features/auth/authSelectors";
import PostCard from '../components/posts/PostCard';
import { usePostActions } from "../hooks/usePostActions";

export default function Profile() {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const posts = useSelector(selectAllPosts);
    const users = useSelector(selectorUsers);
    const currentUser = useSelector(selectorCurrentUser);
    const { onLike, onDelete } = usePostActions();


    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchUsers());
        dispatch(fetchComments());
    }, [dispatch]);

    const profileUser = userId 
        ? users.find(u => u.id === userId)
        : currentUser;

    if (!profileUser) {
        return (
            <div className="text-center mt-20 text-gray-500">
                Utilisateur non trouvé
            </div>
        );
    }

    const userPosts = posts.filter(p => p.authorId === profileUser.id);

    return (
        <div className="flex justify-center min-h-screen py-10">
            <div className="w-full max-w-4xl px-4">

                {/* Profil utilisateur */}
                <div className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-sm mb-8">
                    <img
                        src={profileUser.avatar}
                        alt={profileUser.username}
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{profileUser.username}</h1>
                        <p className="text-gray-500 mt-1">
                            {userPosts.length} {userPosts.length > 1 ? "posts" : "post"}
                        </p>
                    </div>
                </div>

                {/* Posts */}
                {userPosts.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                        {userPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                author={profileUser}
                                currentUser={currentUser}
                                onLike={onLike}     
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-10">
                        Aucun post pour le moment
                    </div>
                )}
            </div>
        </div>
    );
}
