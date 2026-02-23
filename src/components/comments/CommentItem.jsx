export default function commentItem({ comment, user, isOwner, onDelete }) {
    return (
        <div className="flex gap-2 items-start">
            <img src={user?.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
            <div className="bg-gray-100 rounded-xl px-2 py-1 flex-1">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-xs">{user?.username}</span>
                    {isOwner && (
                        <button onClick={() => onDelete(comment.id)} className="text-xs text-red-500">
                            Supprimer
                        </button>
                    )}
                </div>
                <div className="text-xs">{comment.content}</div>
            </div>
        </div>
    );
}
