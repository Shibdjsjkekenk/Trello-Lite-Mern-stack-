import React from "react";
import Board from "../components/Board";
import { FiLogOut } from "react-icons/fi";
import useBoards from "../hooks/useBoards";

export default function BoardPage() {
  const {
    user,
    boards,
    activeBoard,
    setActiveBoard,
    title,
    setTitle,
    loading,
    createBoard,
    handleLogout,
  } = useBoards();

  return (
    <div className="container mt-4">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-black">Trello Lite</h4>

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
          className="btn btn-primary text-nowrap"
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
