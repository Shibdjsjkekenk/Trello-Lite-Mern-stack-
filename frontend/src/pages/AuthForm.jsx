import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthForm from "../hooks/useAuthForm";

export default function AuthForm() {
  const {
    isLogin,
    setIsLogin,
    form,
    loading,
    handleChange,
    handleSubmit,
  } = useAuthForm();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="card p-4" style={{ width: 380 }}>
        <h4 className="text-center mb-3">{isLogin ? "Login" : "Signup"}</h4>

        {!isLogin && (
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Your name"
            />
          </div>
        )}

        <div className="mb-2">
          <label className="form-label">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Password"
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Signup"}
        </button>

        <div className="text-center mt-3">
          <small>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="btn btn-link p-0"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Signup" : "Login"}
            </button>
          </small>
        </div>
      </div>
    </div>
  );
}
