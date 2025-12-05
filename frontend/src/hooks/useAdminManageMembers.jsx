import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import SummaryApi, { getAuthHeaders } from "../common/index";
import { toast } from "react-toastify";

export default function useAdminManageMembers() {
  const [boards, setBoards] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedMember, setSelectedMember] = useState("");

  // load all board
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

  // load all user
  const loadUsers = async () => {
    try {
      const res = await api.get(SummaryApi.getAllUsers.url, {
        headers: getAuthHeaders(),
      });

      setUsers(res.data);
    } catch {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    loadBoards();
    loadUsers();
  }, []);

  // add member to board
  const handleAddMember = async () => {
    if (!selectedMember) return toast.error("Select a user");

    try {
      await api.post(
        SummaryApi.addMember(selectedBoard._id).url,
        { userId: selectedMember },
        { headers: getAuthHeaders() }
      );

      toast.success("Member added");

      setSelectedBoard((prev) => ({
        ...prev,
        members: [...prev.members, users.find((u) => u._id === selectedMember)],
      }));

      setSelectedMember("");

      // Reload from backend
      loadBoards();
    } catch {
      toast.error("Failed to add member");
    }
  };

  // remove member from board
  const handleRemoveMember = async (userId) => {
    try {
      await api.post(
        SummaryApi.removeMember(selectedBoard._id).url,
        { userId },
        { headers: getAuthHeaders() }
      );

      toast.success("Member removed");

      // Instant UI update
      setSelectedBoard((prev) => ({
        ...prev,
        members: prev.members.filter((m) => m._id !== userId),
      }));

      loadBoards();
    } catch {
      toast.error("Failed to remove member");
    }
  };

  return {
    boards,
    users,
    selectedBoard,
    setSelectedBoard,
    selectedMember,
    setSelectedMember,
    handleAddMember,
    handleRemoveMember,
  };
}
