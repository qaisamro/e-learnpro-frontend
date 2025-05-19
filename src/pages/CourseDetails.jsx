import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center p-10">Loading course...</p>;

  if (!course) return <p className="text-center p-10 text-red-500">Course not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-emerald-700 mb-4">{course.title}</h1>

      {course.thumbnail && (
        <img
          src={`http://localhost:8000/storage/${course.thumbnail}`}
          alt={course.title}
          className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
        />
      )}

      <p className="text-gray-700 text-lg mb-4">{course.description}</p>

      <p className="text-2xl font-bold text-emerald-600">${course.price}</p>
    </div>
  );
}
