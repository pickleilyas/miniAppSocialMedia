import { Home, User, PlusSquare, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";

export default function Sidebar({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const links = [
    { name: "Home", to: "/", icon: Home },
    { name: "Profile", to: "/profile", icon: User },
    { name: "New Post", to: "/post", icon: PlusSquare },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r shadow-md
        transition-all duration-300 z-50
        ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* Logo and toggle */}
      <div className="flex items-center justify-between p-4">
        {isOpen && (
          <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-tight">
            Nexi
          </h1>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* User info */}
      {currentUser && (
        <div className="flex flex-col items-center px-4 py-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className="w-14 h-14 rounded-full object-cover"
          />
          {isOpen && (
            <span className="mt-2 font-semibold text-sm">{currentUser.username}</span>
          )}
        </div>
      )}

      {/* Links */}
      <nav className="flex flex-col gap-1 px-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = location.pathname === link.to;

          return (
            <Link
              key={link.name}
              to={link.to}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
                ${active ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}
                ${!isOpen ? "justify-center" : ""}`}
            >
              <Icon size={22} />
              {isOpen && <span>{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className={`mt-auto mx-4 mb-6 flex items-center gap-4 px-4 py-3
          rounded-xl text-red-600 hover:bg-red-50 transition
          ${!isOpen ? "justify-center" : ""}`}
      >
        <LogOut size={22} />
        {isOpen && <span>Logout</span>}
      </button>
    </aside>
  );
}
