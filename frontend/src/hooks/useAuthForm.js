import { useState } from "react";
import api from "../api/axiosInstance";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function useAuthForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Redirect user based on role
  const redirectByRole = (user) => {
    if (user.role === "admin") {
      navigate("/admin/users");
    } else {
      navigate("/dashboard");
    }
  };

  // Submit login/signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // LOGIN
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

      // SIGNUP
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

  return {
    isLogin,
    setIsLogin,
    form,
    loading,
    handleChange,
    handleSubmit,
  };
}
