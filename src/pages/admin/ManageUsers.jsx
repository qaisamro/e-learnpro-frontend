import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("token");

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:8000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error("Error fetching users:", err);
        showToast("Failed to load users. Please try again.", "error");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      showToast("User deleted successfully!", "success");
      setDeleteConfirmOpen(false);
    } catch (err) {
      console.error("Error deleting user:", err);
      showToast("Failed to delete user. Please try again.", "error");
    }
  };

  const handleView = async (user) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedUser({
        ...res.data.user,
        courses: res.data.courses || [],
      });
    } catch (err) {
      console.error("Error fetching user details:", err);
      showToast("Failed to load user details.", "error");
    }
  };

  const showToast = (message, type = "info") => {
    const toast = {
      id: Date.now(),
      message,
      type,
    };

    setError(toast);
    setTimeout(() => setError(null), 5000);
  };

  const Toast = ({ message, type }) => {
    const icons = {
      error: <XCircleIcon className="w-5 h-5 text-red-500" />,
      success: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
      info: <InformationCircleIcon className="w-5 h-5 text-blue-500" />,
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`p-4 rounded-xl shadow-lg border ${
          type === "error"
            ? "bg-red-50 border-red-200"
            : type === "success"
            ? "bg-green-50 border-green-200"
            : "bg-blue-50 border-blue-200"
        }`}
      >
        <div className="flex items-center gap-3">
          {icons[type]}
          <span className="text-sm font-medium">{message}</span>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage registered users and their permissions</p>
        </div>

        {/* Toast Notifications */}
        <AnimatePresence>
          {error && (
            <div className="fixed top-4 right-4 z-50">
              <Toast {...error} />
            </div>
          )}
        </AnimatePresence>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-6 flex items-center justify-center h-64">
              <ArrowPathIcon className="w-12 h-12 text-emerald-600 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <button
                          onClick={() => handleView(user)}
                          className="p-2 text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all"
                          title="View Details"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => (window.location.href = `/admin/users/${user.id}/edit`)}
                          className="p-2 text-gray-600 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-all"
                          title="Edit User"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setUserToDelete(user);
                            setDeleteConfirmOpen(true);
                          }}
                          className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
                          title="Delete User"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirmOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-md"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Confirm Deletion</h3>
                  <button
                    onClick={() => setDeleteConfirmOpen(false)}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <p className="text-gray-600">
                    Are you sure you want to delete user{" "}
                    <span className="font-semibold">{userToDelete?.name}</span>? This action cannot
                    be undone.
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setDeleteConfirmOpen(false)}
                      className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(userToDelete?.id)}
                      className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <TrashIcon className="w-5 h-5" />
                      Delete User
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Details Modal */}
        <AnimatePresence>
          {selectedUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">User Details</h3>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">
                            {selectedUser.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{selectedUser.name}</h4>
                        <p className="text-sm text-gray-600">{selectedUser.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Role</p>
                        <p className="font-medium capitalize">{selectedUser.role}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Member Since</p>
                        <p className="font-medium">
                          {new Date(selectedUser.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-4">Enrolled Courses</h4>
                    <div className="space-y-3">
                      {selectedUser.courses.length > 0 ? (
                        selectedUser.courses.map((course) => (
                          <div
                            key={course.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-1">
                              <span className="text-gray-900">{course.title}</span>
                              {course.progress && (
                                <span className="text-sm text-gray-500 ml-2">
                                  ({course.progress}% Complete)
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {course.status === "completed" && (
                                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                  Completed
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                          No enrolled courses
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}