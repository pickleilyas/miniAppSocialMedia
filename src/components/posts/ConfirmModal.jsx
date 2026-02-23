export default function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative z-10 flex flex-col gap-4">
                <p className="text-center font-semibold text-gray-800">{message}</p>
                <div className="flex justify-around gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        Supprimer
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}
