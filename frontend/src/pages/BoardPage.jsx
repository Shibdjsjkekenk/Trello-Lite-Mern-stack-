import React, { useState, useEffect } from "react";
import Board from "../components/Board";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/axiosInstance";
import SummaryApi from "../common/index";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";

export default function BoardPage() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [boards, setBoards] = useState([]);
  const [activeBoard, setActiveBoard] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH ALL BOARDS ----------------
  const loadBoards = async () => {
    try {
      const res = await api.get(SummaryApi.getBoards.url);
      setBoards(res.data);
    } catch (err) {
      console.error("Error loading boards:", err);
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  // crate board
  const createBoard = async () => {
    if (!title) return;

    setLoading(true);
    try {
      const res = await api.post(SummaryApi.createBoard.url, { title });

      await loadBoards();
      setTitle("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Create board failed");
    } finally {
      setLoading(false);
    }
  };

  // logout
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-black">Trello Lite</h4>

        {/* User + Logout */}
        <div className="d-flex align-items-center gap-2">
          <strong>{user?.name}</strong>
          <FiLogOut
            size={22}
            style={{ cursor: "pointer" }}
            title="Logout"
            onClick={handleLogout}
          />
        </div>
      </header>

      {/* Create Board */}
      <div className="mb-3 d-flex gap-2">
        <input
          className="form-control"
          placeholder="New board title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={createBoard}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Board"}
        </button>
      </div>

      {/* All Boards */}
      <div className="mb-3">
        <div className="d-flex gap-2 flex-wrap">
          {boards.length === 0 && <div>No boards found.</div>}

          {boards.map((b) => (
            <div
              key={b._id}
              className="card p-2"
              style={{ minWidth: 180, cursor: "pointer" }}
              onClick={() => setActiveBoard(b._id)}
            >
              <strong>{b.title}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Board */}
      {activeBoard ? (
        <Board boardId={activeBoard} />
      ) : (
        <div className="text-muted">Select a board to open it.</div>
      )}
    </div>
  );
}
