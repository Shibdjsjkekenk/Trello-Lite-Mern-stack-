import React from "react";
import useAdminManageMembers from "../hooks/useAdminManageMembers";

export default function AdminManageMembers() {
  const {
    boards,
    users,
    selectedBoard,
    setSelectedBoard,
    selectedMember,
    setSelectedMember,
    handleAddMember,
    handleRemoveMember,
  } = useAdminManageMembers();

  return (
    <div>
      <h3 className="mb-4 text-black">Manage Board Members</h3>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Board Title</th>
            <th>Total Members</th>
            <th>Manage</th>
          </tr>
        </thead>

        <tbody>
          {boards.map((b) => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.members?.length}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setSelectedBoard(b)}
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Member Modal */}
      {selectedBoard && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="card p-4" style={{ width: 450 }}>
            <h4 className="mb-3">{selectedBoard.title} Members</h4>

            <h6>Current Members:</h6>

            <ul className="list-group mb-3">
              {selectedBoard.members.length === 0 && (
                <li className="list-group-item text-muted">No members added</li>
              )}

              {selectedBoard.members.map((m) => (
                <li
                  key={m._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{m.name}</span>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveMember(m._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <h6>Add Member:</h6>
            <select
              className="form-select mb-3"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <option value="">Select user</option>

              {users
                .filter((u) => !selectedBoard.members.some((m) => m._id === u._id))
                .map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.email})
                  </option>
                ))}
            </select>

            <div className="d-flex justify-content-between">
              <button className="btn btn-success" onClick={handleAddMember}>
                Add Member
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setSelectedBoard(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
