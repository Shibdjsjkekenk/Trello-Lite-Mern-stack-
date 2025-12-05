import { createBrowserRouter } from "react-router-dom";
import AuthForm from "../pages/AuthForm";
import BoardPage from "../pages/BoardPage";
import AdminPanel from "../pages/AdminPanel";
import ProtectedAdmin from "../components/ProtectedAdmin";
import ProtectedUser from "../components/ProtectedUser";
import AdminUsers from "../pages/AdminUsers";
import AdminManageMembers from "../pages/AdminManageMembers";
import AdminBoards from "../pages/AdminBoards";
import AdminActivityLog from "../pages/AdminActivityLog";

const router = createBrowserRouter([
  { path: "/", element: <AuthForm /> },

  {
    path: "/dashboard",
    element: (
      <ProtectedUser>
        <BoardPage />
      </ProtectedUser>
    ),
  },

  // Admin layout 
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminPanel />
      </ProtectedAdmin>
    ),
    children: [
      { path: "dashboard", element: <h2>Admin Dashboard Coming Soon</h2> },
      { path: "users", element: <AdminUsers /> },
      { path: "members", element: <AdminManageMembers /> },
      { path: "boards", element: <AdminBoards /> },
      { path: "activity", element: <AdminActivityLog /> },

    ],
  },
]);

export default router;
