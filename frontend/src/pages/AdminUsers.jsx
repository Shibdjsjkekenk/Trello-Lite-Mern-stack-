import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import SummaryApi, { getAuthHeaders } from "../common/index";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const loadUsers = async () => {
    try {
      const res = await api.get(SummaryApi.getAllUsers.url, {
        headers: getAuthHeaders(),
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateRole = async (userId, role) => {
    try {
      await api.put(
        SummaryApi.updateUserRole(userId).url,
        { role },
        { headers: getAuthHeaders() }
      );

      toast.success("Role updated");
      loadUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update role");
    }
  };

  const createNewUser = async () => {
    try {
      if (!newUser.name || !newUser.email || !newUser.password) {
        toast.error("All fields are required");
        return;
      }

      await api.post(
        SummaryApi.createUser.url,
        newUser,
        { headers: getAuthHeaders() }
      );

      toast.success("User created successfully!");

      setShowForm(false);
      setNewUser({ name: "", email: "", password: "", role: "user" });
      loadUsers();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to create user");
    }
  };

  // delet user
  const deleteUser = async (userId) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="fw-bold text-black mb-2">Are you sure want delete this user?</p>

          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={async () => {
                try {
                  await api.delete(SummaryApi.deleteUser(userId).url, {
                    headers: getAuthHeaders(),
                  });

                  toast.success("User deleted successfully!");
                  loadUsers();
                  closeToast();
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to delete user");
                  closeToast();
                }
              }}
            >
              Yes, Delete
            </button>

            <button className="btn btn-secondary btn-sm" onClick={closeToast}>
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <div>
      <h3 className="mb-4 text-black d-flex justify-content-between align-items-center">
        All Users
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add New User
        </button>
      </h3>

      {loading ? (
        <div>Loading users...</div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No users found
                </td>
              </tr>
            )}

            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                  <span
                    className={`badge ${
                      user.role === "admin" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {user.role.toUpperCase()}
                  </span>
                </td>

                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-primary"
                      disabled={user.role === "admin"}
                      onClick={() => updateRole(user._id, "admin")}
                    >
                      Make Admin
                    </button>

                    <button
                      className="btn btn-sm btn-warning"
                      disabled={user.role === "user"}
                      onClick={() => updateRole(user._id, "user")}
                    >
                      Make User
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* create user modal */}
      {showForm && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
          <div className="card p-4" style={{ width: 400 }}>
            <h5 className="mb-3 text-black">Create New User</h5>

            <input
              className="form-control mb-2"
              placeholder="Full Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Email Address"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />

            <select
              className="form-select mb-3"
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="d-flex justify-content-between">
              <button className="btn btn-success" onClick={createNewUser}>
                Create
              </button>

              <button
                className="btn btn-danger"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
