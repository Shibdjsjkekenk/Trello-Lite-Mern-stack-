import React from "react";
import useAdminBoards from "../hooks/useAdminBoards";

export default function AdminBoards() {
  const { boards, loading, deleteBoard } = useAdminBoards();

  return (
    <div>
      <h3 className="mb-4 text-black">Manage Boards</h3>

      {loading ? (
        <div>Loading boards...</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Board Title</th>
              <th>Owner</th>
              <th>Total Members</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {boards.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No boards found
                </td>
              </tr>
            ) : (
              boards.map((b) => (
                <tr key={b._id}>
                  <td>{b.title}</td>
                  <td>{b.owner?.name || "Unknown"}</td>
                  <td>{b.members?.length}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteBoard(b._id)}
                    >
                      Delete Board
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
