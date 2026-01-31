import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
    const currentUser = useSelector((state) => state.auth.currentUser);

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
