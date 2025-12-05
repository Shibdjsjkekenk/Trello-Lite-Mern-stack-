import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import SummaryApi from "../common/index";

export default function ActivityLog({ boardId }) {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const res = await api.get(SummaryApi.boardActivities(boardId).url.replace(`${SummaryApi.backendDomin || ""}`, ""));
      setActivities(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!boardId) return;
    fetchActivities();
  }, [boardId]);

  return (
    <div className="card p-2">
      <h6>Activity Log</h6>
      <div style={{ maxHeight: 200, overflowY: "auto" }}>
        {activities.length === 0 && <div className="text-muted small">No activities yet.</div>}
        {activities.map((a) => (
          <div key={a._id} className="small mb-2">
            <div>{a.text}</div>
            <div className="text-muted small">{new Date(a.createdAt).toLocaleString()}</div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
