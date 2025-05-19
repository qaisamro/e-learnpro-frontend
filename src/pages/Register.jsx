import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard"); // أو أي صفحة بعد التسجيل
    } catch (err) {
      if (err.response && err.response.data.errors) {
        const errorMessage = Object.values(err.response.data.errors)[0][0];
        setError(errorMessage);
      } else {
        setError("Registration failed.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-cyan-400 to-sky-500 flex items-center justify-center p-6">
      <div className="relative w-full max-w-lg">
        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border"
              required
            />
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold"
            >
              Register
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-emerald-600 underline">
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
