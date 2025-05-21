import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function CourseViewer() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course details
        const courseRes = await axios.get(`http://localhost:8000/api/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCourse(courseRes.data);

        // Check enrollment status
        const enrolledRes = await axios.get("http://localhost:8000/api/my-courses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        const isEnrolled = enrolledRes.data.some(c => c.id === courseRes.data.id);
        setEnrolled(isEnrolled);

      } catch (error) {
        console.error("Error loading data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleEnrollment = async () => {
    if (enrolled) {
      setWarning("You're already enrolled in this course!");
      setTimeout(() => setWarning(""), 3000);
      return;
    }

    setIsEnrolling(true);
    try {
      await axios.post(
        "http://localhost:8000/api/enroll",
        { course_id: course.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEnrolled(true);
    } catch (error) {
      console.error("Enrollment failed", error);
    } finally {
      setIsEnrolling(false);
    }
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="animate-pulse space-y-8">
        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
        <div className="aspect-video bg-gray-200 rounded-xl"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="h-24 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );

  if (!course) return (
    <div className="max-w-7xl mx-auto p-8 text-center">
      <div className="bg-red-50 text-red-700 p-6 rounded-xl inline-block">
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p>The requested course could not be loaded</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Warning Alert */}
        {warning && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
            <div className="flex items-center gap-2 text-amber-700">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
              <span>{warning}</span>
            </div>
          </div>
        )}

        {/* Course Header */}
        <div className="bg-gradient-to-r from-emerald-50 to-gray-50 p-8 border-b border-gray-200">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
            {enrolled && (
              <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-md inline-flex items-center gap-2 mb-4">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                You're enrolled in this course
              </div>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration || 'Self-paced'}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {course.difficulty || 'All Levels'}
              </span>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid lg:grid-cols-3 gap-8 p-8">
          <div className="lg:col-span-2">
            {/* Course Media */}
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-8">
              {course.thumbnail ? (
                <img
                  src={`http://localhost:8000/storage/${course.thumbnail}`}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-emerald-50 to-gray-100 flex items-center justify-center">
                  <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Course Description */}
            <div className="prose max-w-none mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">About This Course</h3>
              <p className="text-gray-600 leading-relaxed">{course.description}</p>
            </div>

            {/* Course Content */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Course Content</h3>
              <pre className="whitespace-pre-wrap font-sans text-gray-600">
                {course.viewer_content || "Course content will be available soon."}
              </pre>
            </div>
          </div>

          {/* Enrollment Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Course Price</h3>
                  <div className="text-4xl font-bold text-emerald-600">
                    ${course.price}
                    {course.discount_price && (
                      <span className="text-lg text-gray-400 line-through ml-2">
                        ${course.discount_price}
                      </span>
                    )}
                  </div>
                </div>

                {enrolled ? (
                  <div className="bg-emerald-50 text-emerald-700 p-4 rounded-lg text-center">
                    <div className="font-semibold">🎉 Access Granted!</div>
                    <p className="text-sm mt-1">Start learning now</p>
                    <Link 
                      to={`/dashboard/courses/${course.id}`}
                      className="mt-3 inline-block w-full py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                    >
                      Go to Course Content
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleEnrollment}
                    disabled={isEnrolling}
                    className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all 
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isEnrolling ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Enroll Now
                      </>
                    )}
                  </button>
                )}

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}