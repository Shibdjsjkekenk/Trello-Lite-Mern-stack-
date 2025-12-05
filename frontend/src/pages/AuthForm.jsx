
import React, { useState } from "react";
import api from "../api/axiosInstance";
import SummaryApi from "../common/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const redirectByRole = (user) => {
    if (user.role === "admin") {
      navigate("/admin/users");
    } else {
      navigate("/dashboard");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // sign in
      if (isLogin) {
        const res = await api.post(SummaryApi.login.url, {
          email: form.email,
          password: form.password,
        });

        const user = res.data.user;

        dispatch(setCredentials({ token: res.data.token, user }));
        toast.success("Login successful");

        redirectByRole(user); 
      } 
      
      // sign up
      else {
        if (!form.name) {
          toast.error("Name required");
          setLoading(false);
          return;
        }

        const res = await api.post(SummaryApi.signUP.url, {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        const user = res.data.user;

        dispatch(setCredentials({ token: res.data.token, user }));
        toast.success("Signup successful");

        redirectByRole(user); 
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
