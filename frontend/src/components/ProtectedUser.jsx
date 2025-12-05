import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedUser({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/" />;
  return children;
}
