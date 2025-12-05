import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import SummaryApi, { getAuthHeaders } from "../common/index";
import { toast } from "react-toastify";

export default function useAdminBoards() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all boards admin only
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

  // Delete Board 
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
                  console.error(err);
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

  return {
    boards,
    loading,
    deleteBoard,
  };
}
