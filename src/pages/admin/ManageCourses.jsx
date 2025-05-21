import { useEffect, useState } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon, PlusIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    viewer_content: "",
    thumbnail: null,
    id: null,
    existingThumbnail: null,
  });
  const [selectedCourseUsers, setSelectedCourseUsers] = useState([]);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [currentCourseTitle, setCurrentCourseTitle] = useState("");
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/courses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCourses(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching courses", err);
      setError("Failed to load courses. Please try again.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course", err);
      setError("Failed to delete course. Please try again.");
    }
  };

  const handleShowUsers = async (course) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/courses/${course.id}/users`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSelectedCourseUsers(res.data);
      setCurrentCourseTitle(course.title);
      setShowUsersModal(true);
    } catch (err) {
      console.error("Error fetching course users", err);
      setError("Failed to load enrolled users.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("viewer_content", formData.viewer_content);

    if (formData.thumbnail instanceof File) {
      data.append("thumbnail", formData.thumbnail);
    }

    try {
      if (formData.id) {
        data.append("_method", "PUT");
        await axios.post(
          `http://localhost:8000/api/courses/${formData.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:8000/api/courses", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setModalOpen(false);
      fetchCourses();
    } catch (err) {
      console.error("Error saving course", err);
      setError("Failed to save course. Please check your inputs.");
    }
  };

  const openModal = (course = null) => {
    setFormData(
      course
        ? {
            ...course,
            thumbnail: null,
            existingThumbnail: course.thumbnail_url,
            id: course.id,
          }
        : {
            title: "",
            description: "",
            price: "",
            viewer_content: "",
            thumbnail: null,
            existingThumbnail: null,
            id: null,
          }
    );
    setModalOpen(true);
    setError(null);
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Courses</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Add Course
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Preview Content</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4">{course.title}</td>
                <td className="px-6 py-4 max-w-xs truncate">
                  {course.description}
                </td>
                <td className="px-6 py-4">${course.price}</td>
                <td className="px-6 py-4 max-w-xs truncate">
                  {course.viewer_content}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => openModal(course)}
                    className="p-2 rounded bg-blue-100 hover:bg-blue-200 transition-colors"
                    title="Edit"
                  >
                    <PencilIcon className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-2 rounded bg-red-100 hover:bg-red-200 transition-colors"
                    title="Delete"
                  >
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                  <button
                    onClick={() => handleShowUsers(course)}
                    className="p-2 rounded bg-indigo-100 hover:bg-indigo-200 transition-colors flex items-center gap-1"
                    title="View Enrolled Users"
                  >
                    <UserGroupIcon className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm">{course.users_count || 0}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Course Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                {formData.id ? "Edit Course" : "Create New Course"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Preview Content
                  </label>
                  <textarea
                    value={formData.viewer_content}
                    onChange={(e) =>
                      setFormData({ ...formData, viewer_content: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      setFormData({ ...formData, thumbnail: e.target.files[0] })
                    }
                    className="w-full p-2 border rounded"
                    accept="image/*"
                  />
                  {formData.existingThumbnail && (
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">
                        Current thumbnail:{" "}
                      </span>
                      <a
                        href={formData.existingThumbnail}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        View Image
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
                  >
                    {formData.id ? "Save Changes" : "Create Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Enrolled Users Modal */}
      {showUsersModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Users Enrolled in: {currentCourseTitle}
              </h3>
              
              <div className="max-h-96 overflow-y-auto">
                {selectedCourseUsers.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {selectedCourseUsers.map((user) => (
                      <li key={user.id} className="py-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                          <span className="text-sm text-gray-500">
                            Joined: {new Date(user.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No users enrolled in this course yet.
                  </p>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowUsersModal(false)}
                  className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
