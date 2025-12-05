import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiUsers, FiGrid, FiLogOut, FiUserPlus } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { toast } from "react-toastify";

export default function AdminPanel() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
  };

  return (
    <>
      <style>{`
        .admin-container {
          min-height: 100vh;
          background: #f4f6fa;
          display: flex;
        }

        .admin-sidebar {
          width: 300px;
          background: #111827;
          padding: 30px 20px;
          min-height: 100vh;
          box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .admin-link {
          padding: 12px 16px;
          border-radius: 8px;
          color: #cbd5e1;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          display: flex;
          align-items: center;
          transition: 0.25s;
        }

        .admin-link:hover {
          background: #1e293b;
          color: white;
        }

        .active-link {
          background: #3b82f6 !important;
          color: white !important;
          font-weight: 600 !important;
          box-shadow: 0 0 6px rgba(59, 130, 246, 0.6);
        }

        .logout-btn {
          background: #dc2626;
          color: white !important;
          border: none;
          text-align: left;
          padding: 12px 16px;
          border-radius: 8px;
          margin-top: 20px;
        }

        .logout-btn:hover {
          background: #b91c1c;
        }

        .admin-main {
          background: white;
          margin: 25px;
          border-radius: 10px;
          box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
          width: 100%;
          padding: 25px;
        }
      `}</style>

      <div className="admin-container">

        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="text-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              width="80"
              className="rounded-circle shadow-sm"
              alt="profile"
            />
            <h5 className="mt-3 text-white">{user?.name}</h5>
            <small className="text-warning fw-bold">(ADMIN)</small>
          </div>

          <nav className="d-flex flex-column gap-2 mt-4">

            {/* Dashboard */}
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `admin-link ${isActive ? "active-link" : ""}`
              }
            >
              <FiGrid className="me-2" /> Dashboard
            </NavLink>

            {/* All users */}
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `admin-link ${isActive ? "active-link" : ""}`
              }
            >
              <FiUsers className="me-2" /> All Users
            </NavLink>

            {/* Manage Board Members - NEW */}
            <NavLink
              to="/admin/members"
              className={({ isActive }) =>
                `admin-link ${isActive ? "active-link" : ""}`
              }
            >
              <FiUserPlus className="me-2" /> Manage Members
            </NavLink>

            <NavLink
              to="/admin/boards"
              className={({ isActive }) => `admin-link ${isActive ? "active-link" : ""}`}
            >
              📋 Manage Boards
            </NavLink>

            <NavLink
              to="/admin/activity"
              className={({ isActive }) =>
                `admin-link ${isActive ? "active-link" : ""}`
              }
            >
              📜 Activity Logs
            </NavLink>

            {/* Logout */}
            <button className="logout-btn" onClick={handleLogout}>
              <FiLogOut className="me-2" /> Logout
            </button>

          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <Outlet />
        </main>

      </div>
    </>
  );
}
