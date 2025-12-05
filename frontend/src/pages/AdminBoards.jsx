import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import SummaryApi, { getAuthHeaders } from "../common/index";
import { toast } from "react-toastify";

export default function AdminBoards() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all boards (Admin Only)
  const loadBoards = async () => {
    try {
      const res = await api.get(SummaryApi.getAllBoardsAdmin.url, {
        headers: getAuthHeaders(),
      });

      setBoards(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load boards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  // Delete board 
  const deleteBoard = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="fw-bold text-black">Are you sure want delete this board?</p>

          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={async () => {
                try {
                  await api.delete(SummaryApi.deleteBoard(id).url, {
                    headers: getAuthHeaders(),
                  });

                  toast.success("Board deleted successfully");
                  loadBoards();
                } catch (err) {
                  toast.error("Failed to delete board");
                }

                closeToast();
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
