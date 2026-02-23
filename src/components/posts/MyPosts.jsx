import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../features/posts/postsThunks";
import { selectAllPosts } from "../../features/posts/postsSelectors";
import { selectorCurrentUser } from "../../features/auth/authSelectors";
import { useNavigate } from "react-router-dom";


export default function MyPosts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const posts = useSelector(selectAllPosts);
    const currentUser = useSelector(selectorCurrentUser);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (!currentUser) {
        return (
            <div className="text-center mt-20 text-gray-500">
                Veuillez vous connecter pour voir vos posts
            </div>
        );
    }

    const userPosts = posts.filter(p => p.authorId === currentUser.id);

    return (
        <div className="flex justify-center min-h-screen">
            <div className="w-full max-w-md py-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Mes Posts</h1>

                {userPosts.length > 0 ? (
                    <div className="space-y-4">
                        {userPosts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition"
                                onClick={() => navigate(`/edit-post/${post.id}`)}
                            >
                                
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {post.content.substring(0, 50)}...
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                
                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt="Post"
                                        className="w-full aspect-square object-cover rounded-lg mb-3"
                                    />
                                )}

                                
                                <div className="flex gap-4 text-sm text-gray-600">
                                    <span>{post.likes} likes</span>
                                    <span>{post.commentsCount || 0} commentaires</span>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-10">
                        Vous n'avez pas encore de posts. <br />
                        <a href="/new-post" className="text-blue-600 hover:underline">
                            Créer votre premier post
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
