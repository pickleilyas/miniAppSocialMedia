import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { fetchUsers } from "../features/users/UsersThunk";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { users, loading } = useSelector((state) => state.user);

    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleLogin = () => {
        if (loading) return;

        const foundUser = users.find(
            (u) => u.username.toLowerCase() === username.toLowerCase()
        );

        if (!foundUser) {
            setError("Utilisateur incorrect !");
        } else {
            dispatch(loginUser(foundUser));
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    Connexion
                </h2>

                <div className="flex flex-col gap-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError("");
                            }}
                            placeholder="Nom d'utilisateur"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3
                            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600
                        text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700
                        transition duration-300 disabled:opacity-50"
                    >
                        {loading ? "Chargement..." : "Se connecter"}
                    </button>
                </div>
            </div>
        </div>
    );
}
