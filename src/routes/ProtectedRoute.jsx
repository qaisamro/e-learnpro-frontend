import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" />; // غير مسموح له
  }

  return children;
}
