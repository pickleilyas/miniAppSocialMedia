import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";

export default function PostMenu({ postId, onDelete }) {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="relative ml-2">
            <button
                onClick={() => setOpenMenu(!openMenu)}
                className="p-1 rounded-full hover:bg-gray-100"
            >
                <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {openMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-md z-20">
                    <button
                        onClick={() => navigate(`/posts/${postId}/edit`)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        Modifier
                    </button>
                    <button
                        onClick={() => {
                            setOpenMenu(false);
                            onDelete();
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                    >
                        Supprimer
                    </button>
                </div>
            )}
        </div>
    );
}
