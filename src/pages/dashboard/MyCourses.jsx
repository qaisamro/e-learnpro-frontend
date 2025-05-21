<<<<<<< HEAD
export default function MyCourses() {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>
      <p className="text-gray-600">List of your courses will appear here.</p>
    </div>
  );
}
=======
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(null);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/my-courses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Error loading courses", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  const handleUnenroll = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8000/api/courses/${courseId}/unenroll`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCourses((prev) => prev.filter((course) => course.id !== courseId));
      setShowConfirmation(null);
    } catch (error) {
      console.error("Unenrollment failed", error);
      alert("Failed to unenroll. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <Spinner className="h-12 w-12 text-blue-500" />
          <p className="text-gray-600 text-lg font-medium">Loading your learning journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 inline-block">
            My Learning Dashboard
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            {courses.length > 0 
              ? `You're enrolled in ${courses.length} course${courses.length > 1 ? 's' : ''}`
              : "Your learning journey starts here"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 rounded-xl border border-red-100 text-red-700 text-center max-w-md mx-auto">
            ⚠️ {error}
          </div>
        )}

        {/* Empty State */}
        {courses.length === 0 && !error && (
          <div className="text-center py-16 space-y-6">
            <div className="inline-block p-6 bg-white rounded-2xl shadow-lg">
              <svg 
                className="w-32 h-32 mx-auto text-gray-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-gray-900">
                No Courses Yet
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Discover new skills and start your learning journey today. Explore our catalog of expert-led courses.
              </p>
              <Link
                to="/courses"
                className="inline-block mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Browse Courses →
              </Link>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        {courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Course Thumbnail */}
                <div className="aspect-video relative overflow-hidden">
                  {course.thumbnail && (
                    <img
                      src={`http://localhost:8000/storage/${course.thumbnail}`}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Course Content */}
                <div className="p-5 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 truncate">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 text-sm">
                    {course.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 rounded-full h-2 transition-all duration-500" 
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      {course.progress || 0}% Complete
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center gap-3">
                    <Link
                      to={`/courses/${course.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Continue
                    </Link>
                    <button
                      onClick={() => setShowConfirmation(course.id)}
                      className="px-3 py-2.5 text-red-600 hover:bg-red-50 text-sm font-medium rounded-lg transition-colors duration-300"
                      aria-label="Unenroll"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Unenroll Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 animate-in zoom-in-95">
              <h3 className="text-xl font-semibold text-gray-900">Confirm Unenrollment</h3>
              <p className="text-gray-600">
                Are you sure you want to unenroll from this course? Your progress will be lost.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirmation(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUnenroll(showConfirmation)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Confirm Unenroll
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
>>>>>>> f34cce3 (تعديلات من جهاز آخر)
