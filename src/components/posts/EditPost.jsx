import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updatePost, fetchPosts } from "../../features/posts/postsThunks";
import { selectAllPosts } from "../../features/posts/postsSelectors";
import { selectorCurrentUser } from "../../features/auth/authSelectors";

export default function EditPost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();

    const posts = useSelector(selectAllPosts);
    const currentUser = useSelector(selectorCurrentUser);

    const post = useMemo(
        () => posts.find((p) => p.id === postId),
        [posts, postId]
    );

    const [content, setContent] = useState(post?.content || "");
    const [image, setImage] = useState(post?.image || "");
    const [hashtagsInput, setHashtagsInput] = useState(
        post?.hashtags?.join(" ") || ""
    );
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);


    if (!currentUser) {
        return (
            <div className="text-center mt-20 text-gray-500">
                Veuillez vous connecter
            </div>
        );
    }


    if (!post) {
        return (
            <div className="text-center mt-20 text-gray-500">
                Post non trouvé
            </div>
        );
    }


    if (post.authorId !== currentUser.id) {
        return (
            <div className="text-center mt-20 text-red-500">
                Accès refusé
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);

        const hashtagsArray = hashtagsInput
            .split(/[\s,]+/)
            .filter((tag) => tag.trim() !== "");

        dispatch(
            updatePost({
                ...post,
                content,
                image,
                hashtags: hashtagsArray,
            })
        )
            .unwrap()
            .then(() => {
                setLoading(false);
                toast.success("Post modifié avec succès !");
                navigate("/profile");
            })
            .catch(() => {
                setLoading(false);
                toast.error("Impossible de modifier le post.");
            });
    };

    return (
        <section className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Éditer le post
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image (URL)
                    </label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://picsum.photos/500"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {image && (
                    <img
                        src={image}
                        alt="preview"
                        className="w-full aspect-square object-cover rounded-lg"
                    />
                )}


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        rows="3"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Écris une description..."
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hashtags (séparés par espace ou virgule)
                    </label>
                    <input
                        type="text"
                        value={hashtagsInput}
                        onChange={(e) => setHashtagsInput(e.target.value)}
                        placeholder="ex: Nature Voyage Aventure"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="flex-1 py-2 rounded-lg font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
                    >
                        Annuler
                    </button>

                    <button
                        type="submit"
                        disabled={loading || !content.trim()}
                        className="flex-1 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 transition"
                    >
                        {loading ? "Sauvegarde..." : "Sauvegarder"}
                    </button>
                </div>
            </form>
        </section>
    );
}
