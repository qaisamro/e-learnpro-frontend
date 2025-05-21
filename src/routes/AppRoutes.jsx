import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

import DashboardHome from "../pages/dashboard/DashboardHome";
import MyCourses from "../pages/dashboard/MyCourses";
import CourseViewer from "../pages/dashboard/CourseViewer";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageCourses from "../pages/admin/ManageCourses";
import ManageUsers from "../pages/admin/ManageUsers";

import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import AllCourses from "../pages/dashboard/AllCourses";
import Settings from "../pages/admin/Settings";
import EditUser from "../pages/admin/EditUser";
import Profile from "../pages/dashboard/Profile";
import UserSettings from "../pages/dashboard/UserSettings";








export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Dashboard (role: user) */}
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute allowedRole="user">
      <UserLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<DashboardHome />} />
  <Route path="my-courses" element={<MyCourses />} />
  <Route path="courses/:id" element={<CourseViewer />} />
  <Route path="all-courses" element={<AllCourses />} />
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<UserSettings />} /> {/* ✅ هذا هو السطر الجديد */}
</Route>


      {/* Admin Dashboard */}
     <Route
  path="/admin"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="courses" element={<ManageCourses />} />
  <Route path="users" element={<ManageUsers />} />
  <Route path="settings" element={<Settings />} />
  <Route path="users/:id/edit" element={<EditUser />} />

  

</Route>

    </Routes>
  );
}
