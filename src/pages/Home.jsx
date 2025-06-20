import { useState } from "react";
import { AcademicCapIcon, LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true); // للتحكم بين login و register
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", loginData);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = user.role === "admin" ? "/admin" : "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", registerData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/dashboard";
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-400 to-cyan-500 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-emerald-400/20 rounded-full -top-48 -right-48 mix-blend-soft-light" />
      <div className="absolute w-96 h-96 bg-cyan-400/20 rounded-full -bottom-48 -left-48 mix-blend-soft-light" />

      <div className="relative z-10 max-w-4xl w-full">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row gap-10">
          {/* اليسار - المحتوى الدعائي */}
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
              <a
                href="/courses"
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-200"
              >
                <AcademicCapIcon className="w-5 h-5" />
                <span>Explore Courses</span>
              </a>
            </div>
          </div>

          {/* اليمين - نموذج تسجيل دخول أو تسجيل */}
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
              <div className="flex flex-col items-center mb-6">
                <UserCircleIcon className="w-12 h-12 text-emerald-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">{isLogin ? "Login" : "Create Account"}</h2>
                <p className="text-gray-500">{isLogin ? "Please sign in to continue" : "Join us and start learning today"}</p>
              </div>

              {error && <div className="text-red-500 text-center text-sm mb-4">{error}</div>}

              <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-6">
                {!isLogin && (
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-lg border"
                    required
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border"
                  required
                  value={isLogin ? loginData.email : registerData.email}
                  onChange={(e) =>
                    isLogin
                      ? setLoginData({ ...loginData, email: e.target.value })
                      : setRegisterData({ ...registerData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border"
                  required
                  value={isLogin ? loginData.password : registerData.password}
                  onChange={(e) =>
                    isLogin
                      ? setLoginData({ ...loginData, password: e.target.value })
                      : setRegisterData({ ...registerData, password: e.target.value })
                  }
                />

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2"
                >
                  <LockClosedIcon className="w-5 h-5" />
                  {isLogin ? "Sign In" : "Register"}
                </button>

                <p className="text-center text-sm text-gray-600">
                  {isLogin ? (
                    <>
                      Don’t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setIsLogin(false);
                          setError("");
                        }}
                        className="text-emerald-600 underline"
                      >
                        Create one
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setIsLogin(true);
                          setError("");
                        }}
                        className="text-emerald-600 underline"
                      >
                        Sign in here
                      </button>
                    </>
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
