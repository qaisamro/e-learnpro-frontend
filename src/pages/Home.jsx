import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LockClosedIcon, AcademicCapIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    // حفظ التوكن والمستخدم
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // توجيه حسب الدور
    if (user.role === "admin") {
      window.location.href = "/admin";
    } else if (user.role === "user") {
      window.location.href = "/dashboard";
    } else {
      setError("Unauthorized role.");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed.");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-400 to-cyan-500 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute w-96 h-96 bg-emerald-400/20 rounded-full -top-48 -right-48 mix-blend-soft-light" />
      <div className="absolute w-96 h-96 bg-cyan-400/20 rounded-full -bottom-48 -left-48 mix-blend-soft-light" />
      
      <div className="relative z-10 max-w-4xl w-full">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row gap-10">
          {/* Left Section - Hero Content */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                E-LearnPro
              </span>
              <br />
              <span className="text-2xl md:text-3xl font-semibold text-gray-700">
                Elevate Your Learning Journey
              </span>
            </h1>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Master new skills with our interactive courses. Join our community of passionate learners and experts.
            </p>
            
            <div className="flex flex-col gap-4">
              <Link
                to="/courses"
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-200"
              >
                <AcademicCapIcon className="w-5 h-5" />
                <span>Explore Courses</span>
              </Link>
            </div>
          </div>

          {/* Right Section - Auth Card */}
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
              <div className="flex flex-col items-center mb-8">
                <UserCircleIcon className="w-12 h-12 text-emerald-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  <LockClosedIcon className="w-5 h-5" />
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-500">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-emerald-600 hover:text-emerald-700 font-semibold underline hover:no-underline transition"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}