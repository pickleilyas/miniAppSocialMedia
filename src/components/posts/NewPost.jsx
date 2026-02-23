import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../features/posts/postsThunks";
import { selectorCurrentUser } from "../../features/auth/authSelectors";
import toast from "react-hot-toast";

const NewPost = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.posts.status);
    const currentUser = useSelector(selectorCurrentUser);

    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [hashtags, setHashtags] = useState("");

    if (!currentUser) {
        return (
            <div className="text-center mt-20 text-gray-500">
                Veuillez vous connecter pour publier
            </div>
        );
    }

    const canSave =
        content.trim() !== "" &&
        image.trim() !== "" &&
        status !== "loading";




    const handleContentChange = (e) => setContent(e.target.value);
    const handleImageChange = (e) => setImage(e.target.value);
    const handleHashtagsChange = (e) => setHashtags(e.target.value);


    const dispatchAddPost = (postData) => {
        return dispatch(addPost(postData))
            .unwrap()
            .then(() => {
                toast.success("Post ajouté avec succès !");
                resetFields();
            })
            .catch(() => {
                toast.error("Impossible d'ajouter le post.");
            });
    };


    const resetFields = () => {
        setContent("");
        setImage("");
        setHashtags("");
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!canSave) return;

        const hashtagsArray = hashtags
            .split(/[\s,]+/)
            .filter((tag) => tag.trim() !== "");

        const postData = {
            authorId: currentUser.id,
            content,
            image,
            hashtags: hashtagsArray,
            likes: 0,
            likedBy: null,
            createdAt: new Date().toISOString(),
        };

        dispatchAddPost(postData);
    };


    return (
        <section className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Nouveau post
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image (URL)
                    </label>
                    <input
                        type="text"
                        value={image}
                        onChange={handleImageChange}
                        placeholder="https://picsum.photos/500"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        onChange={handleContentChange}
                        placeholder="Écris une description..."
                        className="w-full rounded-lg border border-gray-300 px-3 py-2
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hashtags (séparés par espace ou virgule)
                    </label>
                    <input
                        type="text"
                        value={hashtags}
                        onChange={handleHashtagsChange}
                        placeholder="ex: Nature Voyage Aventure"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <button
                    type="submit"
                    disabled={!canSave}
                    className={`w-full py-2 rounded-lg font-medium transition
                        ${canSave
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Publier
                </button>
            </form>
        </section>
    );
};

export default NewPost;
