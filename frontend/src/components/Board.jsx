import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import SummaryApi from "../common/index";
import ListColumn from "./ListColumn";
import { DragDropContext } from "@hello-pangea/dnd";

export default function Board({ boardId }) {
  const [board, setBoard] = useState(null);
  const [newListTitle, setNewListTitle] = useState("");

  const fetchBoard = async () => {
    try {
      const res = await api.get(SummaryApi.getBoard(boardId).url.replace(`${SummaryApi.backendDomin || ""}`, ""));
      setBoard(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!boardId) return;
    fetchBoard();
  }, [boardId]);

  const createList = async () => {
    if (!newListTitle) return;
    try {
      await api.post(SummaryApi.createList(boardId).url.replace(`${SummaryApi.backendDomin || ""}`, ""), { title: newListTitle });
      setNewListTitle("");
      fetchBoard();
    } catch (err) {
      console.error(err);
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    try {
      await api.put(SummaryApi.updateCard(boardId, draggableId).url.replace(`${SummaryApi.backendDomin || ""}`, ""), {
        listId: destination.droppableId,
        position: destination.index,
      });
      // refresh
      fetchBoard();
    } catch (err) {
      console.error(err);
    }
  };

  if (!board) return <div>Loading board...</div>;

  return (
    <div>
      <h5>{board.title}</h5>

      <div className="d-flex gap-2 align-items-start mb-3">
        <input className="form-control" placeholder="New list title" value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} />
        <button className="btn btn-secondary text-nowrap" onClick={createList}>Add List</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 12 }}>
          {board.lists.map((list) => (
            <ListColumn key={list._id} list={list} boardId={boardId} refresh={fetchBoard} />
          ))}
        </div>
      </DragDropContext>

     
    </div>
  );
}
