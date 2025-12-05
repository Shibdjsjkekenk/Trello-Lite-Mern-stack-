import React from "react";
import { useSelector } from "react-redux";
import "./App.css";

export default function App() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <h2 className="text-center mt-5 text-danger">
        You are not logged in!
      </h2>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Welcome, {user.name}</h2>
      <p>Your dashboard is ready.</p>
    </div>
  );
}
