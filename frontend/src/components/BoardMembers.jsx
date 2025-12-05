import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import SummaryApi, { getAuthHeaders } from "../common";
import { toast } from "react-toastify";

export default function BoardMembers({ boardId, onClose }) {
  const [boardMembers, setBoardMembers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  // Load board members
  const loadBoard = async () => {
    try {
      const res = await api.get(SummaryApi.getBoard(boardId).url, {
        headers: getAuthHeaders(),
      });

      setBoardMembers(res.data.members || []);
    } catch (err) {
      toast.error("Failed to load board members");
    }
  };

  // Load all registered users
  const loadUsers = async () => {
    try {
      const res = await api.get(SummaryApi.getAllUsers.url, {
        headers: getAuthHeaders(),
      });
      setAllUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users list");
    }
  };

  useEffect(() => {
    loadBoard();
    loadUsers();
  }, []);

  // Add Member
  const addMember = async () => {
    if (!selectedUser) return toast.error("Select a user first");

    try {
      await api.post(
        SummaryApi.addMember(boardId).url,
        { userId: selectedUser },
        { headers: getAuthHeaders() }
      );

      toast.success("Member added!");
      loadBoard();
      setSelectedUser("");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to add member");
    }
  };

  // Remove Member 
  const removeMember = async (userId) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="fw-bold">Remove this member from board?</p>

          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={async () => {
                try {
                  await api.post(
                    SummaryApi.removeMember(boardId).url,
                    { userId },
                    { headers: getAuthHeaders() }
                  );

                  toast.success("Member removed");
                  loadBoard();
                } catch (err) {
                  toast.error("Failed to remove member");
                }
                closeToast();
              }}
            >
              Yes, Remove
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={closeToast}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
    >
      <div className="card p-4" style={{ width: 450 }}>
        <h4 className="mb-3">Manage Board Members</h4>

        {/* Add member dropdown */}
        <div className="d-flex gap-2 mb-4">
          <select
            className="form-select"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select user</option>

            {allUsers
              .filter((u) => !boardMembers.some((m) => m._id === u._id))
              .map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
          </select>

          <button className="btn btn-primary" onClick={addMember}>
            Add
          </button>
        </div>

        {/* Existing member list */}
        <h6>Current Members</h6>

        <ul className="list-group mb-3">
          {boardMembers.length === 0 && (
            <li className="list-group-item text-muted">No members added yet</li>
          )}

          {boardMembers.map((member) => (
            <li
              key={member._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{member.name}</strong>
                <br />
                <small>{member.email}</small>
              </div>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeMember(member._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <button className="btn btn-secondary w-100" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
