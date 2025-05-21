import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const allCoursesRes = await axios.get("http://localhost:8000/api/courses");
        setCourses(allCoursesRes.data);

        const enrolledRes = await axios.get("http://localhost:8000/api/my-courses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const ids = enrolledRes.data.map((course) => course.id);
        setEnrolledCourseIds(ids);
      } catch (err) {
        console.error("Error fetching courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourses();
  }, []);

  if (loading) return (
    <div className="p-10 text-center text-gray-600">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-40 bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">All Courses</h2>
        <p className="text-gray-600">Explore our curated collection of learning resources</p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-500 text-lg">No courses available at the moment</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const isEnrolled = enrolledCourseIds.includes(course.id);

            return (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative group"
              >
                {isEnrolled && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Enrolled
                    </span>
                  </div>
                )}

                <div className="aspect-video bg-gray-100 rounded-t-xl overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={`http://localhost:8000/storage/${course.thumbnail}`}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-emerald-50 to-gray-100 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 line-clamp-3 mb-4">{course.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold text-lg">
                        ${course.price}
                      </span>
                      {course.discount_price && (
                        <span className="text-sm text-gray-400 line-through">
                          ${course.discount_price}
                        </span>
                      )}
                    </div>
                    
                    <Link
                      to={`/dashboard/courses/${course.id}`}
                      className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200"
                    >
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}