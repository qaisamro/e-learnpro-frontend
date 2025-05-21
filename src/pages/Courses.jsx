import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ClockIcon, ChartBarIcon, AcademicCapIcon, StarIcon } from "@heroicons/react/24/outline";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courses")
      .then((res) => {
        setCourses(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Explore Our Courses
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Master new skills with industry-leading experts and cutting-edge curriculum
        </p>
      </div>

      {/* Courses Grid */}
      {isLoading ? (
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="max-w-7xl mx-auto text-center py-20">
          <AcademicCapIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Courses Available</h3>
          <p className="text-gray-500">Check back later for new course offerings</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                {course.thumbnail && (
                  <img
                    src={`http://localhost:8000/storage/${course.thumbnail}`}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <span className="px-3 py-1 bg-emerald-500/90 text-white text-sm rounded-full">
                    {course.category}
                  </span>
                  <span className="px-3 py-1 bg-white/90 text-gray-700 text-sm rounded-full flex items-center">
                    <StarIcon className="w-4 h-4 mr-1 text-amber-400" />
                    {course.rating || "4.8"}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 relative">
                  {course.description}
                  <span className="absolute bottom-0 right-0 w-1/2 h-8 bg-gradient-to-l from-white/90 to-transparent" />
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-1.5" />
                    <span>{course.duration || "6h 20m"}</span>
                  </div>
                  <div className="flex items-center">
                    <ChartBarIcon className="w-5 h-5 mr-1.5" />
                    <span>{course.level || "Intermediate"}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-emerald-600">
                      ${course.price}
                    </span>
                    {course.original_price && (
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        ${course.original_price}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/`}
                    className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <span>Enroll Now</span>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}