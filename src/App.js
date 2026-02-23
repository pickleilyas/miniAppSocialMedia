import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Profile from "./pages/Profile";
import NewPost from "./components/posts/NewPost";
import EditPost from "./components/posts/EditPost";
import PostDetail from "./components/posts/PostDetail";
import '../src/styles/style.css'
import ProfileAction from "./components/posts/ProfileAction";
export default function App() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes location={background || location}>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<ProfileAction />} />
            <Route path="/post" element={<NewPost />} />
            <Route path="/posts/:postId/edit" element={<EditPost />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
          </Route>
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/posts/:postId"
            element={<PostDetail modal />}
          />
        </Routes>
      )}
    </>
  );
}
