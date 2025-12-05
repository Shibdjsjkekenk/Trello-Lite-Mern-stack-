import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import SummaryApi, { getAuthHeaders } from "../common/index";
import { toast } from "react-toastify";

export default function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // load user
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

  // update user role
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

  // create new user
  const createNewUser = async () => {
    try {
      if (!newUser.name || !newUser.email || !newUser.password) {
        toast.error("All fields are required");
        return;
      }

      await api.post(SummaryApi.createUser.url, newUser, {
        headers: getAuthHeaders(),
      });

      toast.success("User created successfully!");

      setShowForm(false);
      setNewUser({ name: "", email: "", password: "", role: "user" });
      loadUsers();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to create user");
    }
  };

  // delete user
  const deleteUser = async (userId) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="fw-bold text-black mb-2">
            Are you sure want delete this user?
          </p>

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

  return {
    users,
    loading,
    showForm,
    setShowForm,
    newUser,
    setNewUser,
    loadUsers,
    updateRole,
    createNewUser,
    deleteUser,
  };
}
