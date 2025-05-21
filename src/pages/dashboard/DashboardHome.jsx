import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardHome() {
  const [user, setUser] = useState(null);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    // Fetch logged-in user
    axios.get("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setUser(res.data);
    });

    // Fetch user's courses
    axios.get("http://localhost:8000/api/my-courses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setMyCourses(res.data);
    });
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6 text-emerald-700">
        👋 Welcome back, {user?.name || "Student"}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h4 className="text-gray-500 text-sm">Total Enrolled Courses</h4>
          <p className="text-2xl font-bold text-emerald-600">{myCourses.length}</p>
        </div>
        {/* يمكنك إضافة كروت إضافية هنا مستقبلًا مثل: عدد الشهادات، رسائل، آخر نشاط */}
      </div>

      <h3 className="text-xl font-semibold mb-4 text-gray-700">📚 Latest Courses</h3>
      {myCourses.length === 0 ? (
        <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myCourses.slice(0, 3).map((course) => (
            <div key={course.id} className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:shadow-lg transition">
              <h4 className="text-lg font-bold text-gray-800">{course.title}</h4>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">{course.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
