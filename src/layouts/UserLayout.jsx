// src/layouts/UserLayout.jsx
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { 
  ExclamationTriangleIcon,
  HomeIcon,
  UserCircleIcon,
  AcademicCapIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function UserLayout() {
  const [user, setUser] = useState(null);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Inter']">
      {/* Logout Confirmation Modal */}
      <Dialog
        open={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center p-4"
        >
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-amber-100 rounded-full">
                <ExclamationTriangleIcon className="h-12 w-12 text-amber-600" />
              </div>
              <div className="space-y-2">
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  Ready to Leave?
                </Dialog.Title>
                <Dialog.Description className="text-gray-600">
                  Are you sure you want to sign out? We'll miss you! 😊
                </Dialog.Description>
              </div>

              <div className="flex gap-4 w-full">
                <button
                  onClick={() => setIsLogoutOpen(false)}
                  className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
                >
                  Stay Here
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </motion.div>
      </Dialog>

      {/* Modern Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-emerald-800 to-teal-900 text-white p-6 shadow-2xl fixed h-full flex flex-col">
        <div className="pb-6 border-b border-emerald-700/50 mb-6">
          {user ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm"
            >
              <div className="flex items-center justify-center h-12 w-12 bg-emerald-500/20 rounded-xl">
                <span className="text-2xl font-bold text-emerald-300">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{user.name}</span>
                <span className="text-sm text-emerald-200">{user.email}</span>
              </div>
            </motion.div>
          ) : (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-emerald-700/50 rounded w-3/4" />
              <div className="h-4 bg-emerald-700/50 rounded w-1/2" />
            </div>
          )}
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `group py-3 px-4 rounded-xl transition-all flex items-center gap-4 hover:bg-white/10 ${
                isActive ? "bg-white/10 font-semibold" : ""
              }`
            }
          >
            <HomeIcon className="w-6 h-6 text-emerald-300 group-hover:text-white" />
            <span className="text-lg">Dashboard</span>
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `group py-3 px-4 rounded-xl transition-all flex items-center gap-4 hover:bg-white/10 ${
                isActive ? "bg-white/10 font-semibold" : ""
              }`
            }
          >
            <UserCircleIcon className="w-6 h-6 text-emerald-300 group-hover:text-white" />
            <span className="text-lg">Profile</span>
          </NavLink>

          <NavLink
            to="/dashboard/all-courses"
            className={({ isActive }) =>
              `group py-3 px-4 rounded-xl transition-all flex items-center gap-4 hover:bg-white/10 ${
                isActive ? "bg-white/10 font-semibold" : ""
              }`
            }
          >
            <AcademicCapIcon className="w-6 h-6 text-emerald-300 group-hover:text-white" />
            <span className="text-lg">All Courses</span>
          </NavLink>

          <NavLink
            to="/dashboard/my-courses"
            className={({ isActive }) =>
              `group py-3 px-4 rounded-xl transition-all flex items-center gap-4 hover:bg-white/10 ${
                isActive ? "bg-white/10 font-semibold" : ""
              }`
            }
          >
            <BookOpenIcon className="w-6 h-6 text-emerald-300 group-hover:text-white" />
            <span className="text-lg">My Courses</span>
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `group py-3 px-4 rounded-xl transition-all flex items-center gap-4 hover:bg-white/10 ${
                isActive ? "bg-white/10 font-semibold" : ""
              }`
            }
          >
            <Cog6ToothIcon className="w-6 h-6 text-emerald-300 group-hover:text-white" />
            <span className="text-lg">Settings</span>
          </NavLink>
        </nav>

        {/* Enhanced Logout Button */}
        <button
          onClick={() => setIsLogoutOpen(true)}
          className="mt-6 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 flex items-center gap-4 group"
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6 text-emerald-300 group-hover:text-white" />
          <span className="text-lg">Sign Out</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl min-h-[calc(100vh-4rem)] border border-gray-100/70 p-8"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}