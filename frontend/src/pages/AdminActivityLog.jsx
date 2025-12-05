// src/pages/AdminActivityLog.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import SummaryApi, { getAuthHeaders } from "../common";
import { toast } from "react-toastify";

export default function AdminActivityLog() {
  const [logs, setLogs] = useState([]);
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");

  // load all board admin only
  const loadBoards = async () => {
    try {
      const res = await api.get(SummaryApi.getAllBoardsAdmin.url, {
        headers: getAuthHeaders(),
      });
      setBoards(res.data);
    } catch (err) {
      toast.error("Failed to load boards");
    }
  };


  const loadLogs = async (boardId) => {
    try {
      const res = await api.get(SummaryApi.boardActivities(boardId).url, {
        headers: getAuthHeaders(),
      });
      setLogs(res.data);
    } catch (err) {
      toast.error("Failed to load activity logs");
      setLogs([]);
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  return (
    <div>
      <h3 className="mb-4 text-black">Activity Logs</h3>

      {/* Board Selection */}
      <select
        className="form-select mb-3"
        value={selectedBoard}
        onChange={(e) => {
          setSelectedBoard(e.target.value);
          loadLogs(e.target.value);
        }}
      >
        <option value="">Select Board</option>

        {boards.map((b) => (
          <option key={b._id} value={b._id}>
            {b.title}
          </option>
        ))}
      </select>

      {/* Activity Timeline */}
      {logs.length === 0 ? (
        <p className="text-muted mt-4 text-center">No activity logs found</p>
      ) : (
        <div className="timeline-container mt-3">
          {logs.map((log) => (
            <div className="timeline-item" key={log._id}>
              <div className="timeline-dot"></div>

              <div className="timeline-content">
                <h6 className="fw-bold">{log.text}</h6>
                <small className="text-muted">
                  {new Date(log.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .timeline-container {
          padding-left: 20px;
          border-left: 3px solid #3b82f6;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 20px;
        }

        .timeline-dot {
          width: 14px;
          height: 14px;
          background: #3b82f6;
          border-radius: 50%;
          position: absolute;
          left: -25px;
          top: 4px;
        }

        .timeline-content {
          padding: 10px 15px;
          background: #f8fafc;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
