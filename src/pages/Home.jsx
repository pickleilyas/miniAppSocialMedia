import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../features/posts/postsThunks";
import { fetchUsers } from "../features/users/UsersThunk";
import { fetchComments } from "../features/comments/commentsThunks";

import { selectAllPosts } from "../features/posts/postsSelectors";
import { selectorUsers } from "../features/users/usersSelectors";
import { selectorCurrentUser } from "../features/auth/authSelectors";

import PostCard from "../components/posts/PostCard";
import { useFilteredPosts } from "../hooks/useFilteredPosts";
import { getAllHashtags } from "../utils/getAllHashtags";
import { usePostActions } from "../hooks/usePostActions";




export default function Home() {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const users = useSelector(selectorUsers);
    const currentUser = useSelector(selectorCurrentUser);

    const [selectedTag, setSelectedTag] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            dispatch(fetchPosts()),
            dispatch(fetchUsers()),
            dispatch(fetchComments())
        ]).finally(() => setLoading(false));
    }, [dispatch]);

    const usersMap = useMemo(() => Object.fromEntries(users.map(u => [u.id, u])), [users]);

    const filteredPosts = useFilteredPosts(posts, usersMap, selectedTag, searchTerm);

    const sortedPosts = useMemo(() => [...filteredPosts].sort((a, b) => b.likes - a.likes), [filteredPosts]);

    const { onLike, onDelete } = usePostActions();

    if (!currentUser) {
        return (
            <div className="text-center mt-20 text-gray-500">
                Veuillez vous connecter
            </div>
        );
    }

    if (loading) {
        return (
            <div className="text-center mt-20 text-gray-500">
                Chargement...
            </div>
        );
    }

    return (
        <div className="flex justify-center min-h-screen">
            <div className="w-full max-w-md space-y-6 py-6">

                <input
                    type="text"
                    placeholder="Rechercher par utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />


                <div className="flex flex-wrap gap-2">
                    {getAllHashtags(posts).map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                            className={`px-3 py-1 text-xs font-semibold rounded-full border ${selectedTag === tag
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-700"
                                } hover:bg-blue-400 hover:text-white transition`}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>

                {sortedPosts.length > 0 ? (
                    sortedPosts.map((post) => {
                        const author = usersMap[post.authorId];
                        return (
                            <PostCard
                                key={post.id}
                                post={post}
                                author={author}
                                currentUser={currentUser}
                                onLike={onLike}
                                onDelete={onDelete}
                            />
                        );
                    })
                ) : (
                    <div className="text-center text-gray-500 mt-10">
                        Aucun post trouvé.
                    </div>
                )}
            </div>
        </div>
    );
}
