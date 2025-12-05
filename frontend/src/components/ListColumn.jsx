import React, { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import api from "../api/axiosInstance";
import SummaryApi from "../common/index";

export default function ListColumn({ list, boardId, refresh }) {
  const [cardTitle, setCardTitle] = useState("");
  const creating = false;

  const addCard = async () => {
    if (!cardTitle) return;
    try {
      await api.post(SummaryApi.createCard(boardId, list._id).url.replace(`${SummaryApi.backendDomin || ""}`, ""), {
        title: cardTitle,
        description: "",
      });
      setCardTitle("");
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card p-2" style={{ minWidth: 280, maxHeight: "80vh", overflowY: "auto" }}>
      <h6 className="text-black">{list.title}</h6>

      <Droppable droppableId={list._id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: 40 }}>
            {list.cards.map((card, idx) => (
              <Draggable key={card._id} draggableId={card._id} index={idx}>
                {(prov) => (
                  <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} style={{ marginBottom: 8, ...prov.draggableProps.style }}>
                    <div className="card p-2">
                      <strong>{card.title}</strong>
                      <div className="text-muted small">{card.assignee ? `Assigned: ${card.assignee}` : ""}</div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="mt-2 d-flex gap-2">
        <input className="form-control form-control-sm" placeholder="Card title" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} />
        <button className="btn btn-sm btn-primary" onClick={addCard} disabled={creating}>Add</button>
      </div>
    </div>
  );
}
