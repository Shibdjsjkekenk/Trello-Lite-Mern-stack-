import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/" />;
  if (user.role !== "admin") return <Navigate to="/dashboard" />;

  return children;
}
