import React from "react";
import useAdminUsers from "../hooks/useAdminUsers";

const AdminUsers = () => {
  const {
    users,
    loading,
    showForm,
    setShowForm,
    newUser,
    setNewUser,
    updateRole,
    createNewUser,
    deleteUser,
  } = useAdminUsers();

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

      {/* create new user modal */}
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

              <button className="btn btn-danger" onClick={() => setShowForm(false)}>
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
