import { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function useBoards() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [boards, setBoards] = useState([]);
  const [activeBoard, setActiveBoard] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // fetch all board
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

  // create board
  const createBoard = async () => {
    if (!title) return;

    setLoading(true);
    try {
      await api.post(SummaryApi.createBoard.url, { title });
      await loadBoards();
      setTitle("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Create board failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
    navigate("/");
  };

  return {
    user,
    boards,
    activeBoard,
    setActiveBoard,
    title,
    setTitle,
    loading,
    createBoard,
    handleLogout,
  };
}
