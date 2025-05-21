import { useState } from "react";
<<<<<<< HEAD
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
=======
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
>>>>>>> f34cce3 (تعديلات من جهاز آخر)

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      const { token, user } = response.data;

<<<<<<< HEAD
      if (user.role !== "admin") {
        setError("Access denied. Admins only.");
        return;
      }

      // Save token to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to admin dashboard
      window.location.href = "/admin/users";

=======
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "user") {
        navigate("/dashboard");
      } else {
        setError("Unauthorized role.");
      }
>>>>>>> f34cce3 (تعديلات من جهاز آخر)
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded"
=======
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-8">
        <UserCircleIcon className="w-12 h-12 text-emerald-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Login</h2>
        <p className="text-gray-500">Please sign in to continue</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {error && (
          <div className="text-red-500 text-center text-sm">{error}</div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            placeholder="Enter your email"
>>>>>>> f34cce3 (تعديلات من جهاز آخر)
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
<<<<<<< HEAD
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded"
=======

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            placeholder="Enter your password"
>>>>>>> f34cce3 (تعديلات من جهاز آخر)
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
<<<<<<< HEAD
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition"
        >
          Login
=======

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300"
        >
          <LockClosedIcon className="w-5 h-5" />
          Sign In
>>>>>>> f34cce3 (تعديلات من جهاز آخر)
        </button>
      </form>
    </div>
  );
}
