import { useEffect, useState } from "react";
import axios from "axios";
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  ShieldCheckIcon,
  CalendarIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/solid";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
        setError("Failed to load profile information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Loading Skeleton */}
          <div className="animate-pulse space-y-12">
            {/* Profile Header Skeleton */}
            <div className="flex flex-col items-center space-y-6">
              <div className="w-24 h-24 bg-gray-200 rounded-2xl"></div>
              <div className="h-8 bg-gray-200 rounded-full w-48"></div>
              <div className="h-6 bg-gray-200 rounded-full w-32"></div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-8">
              <div className="h-24 bg-gray-200 rounded-xl"></div>
              <div className="h-24 bg-gray-200 rounded-xl"></div>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-32 bg-gray-200 rounded-xl"></div>
                <div className="h-32 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-red-100 text-center">
            <ExclamationTriangleIcon className="w-16 h-16 text-red-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-2xl font-bold text-red-600 mb-4">Loading Error</h2>
            <p className="text-red-500 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Profile Header */}
        <div className="text-center space-y-8 animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-30 animate-pulse"></div>
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl relative">
              <UserCircleIcon className="w-20 h-20 text-white/90 transition-transform hover:scale-105" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 bg-clip-text animate-slide-up">
              {user.name}
            </h1>
            <span className="inline-block px-5 py-2.5 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-shadow">
              {user.role}
            </span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden animate-scale-in">
          {/* Main Info Section */}
          <div className="p-8 space-y-8">
            <div className="group flex items-center gap-6 p-6 bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 border border-gray-200/60 hover:border-purple-100 hover:shadow-lg">
              <div className="p-4 bg-purple-50 rounded-xl transition-transform group-hover:scale-110">
                <EnvelopeIcon className="w-8 h-8 text-purple-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Email Address</h3>
                <p className="text-lg font-medium text-gray-900 break-all">{user.email}</p>
              </div>
            </div>

            <div className="group flex items-center gap-6 p-6 bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 border border-gray-200/60 hover:border-emerald-100 hover:shadow-lg">
              <div className="p-4 bg-emerald-50 rounded-xl transition-transform group-hover:scale-110">
                <ShieldCheckIcon className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Account Type</h3>
                <p className="text-lg font-medium text-gray-900 capitalize">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200/60"></div>

          {/* Additional Info */}
          <div className="p-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-8">
              Account Activity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-xl border border-gray-200/60 hover:border-blue-200 transition-colors">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <CalendarIcon className="w-7 h-7 text-blue-500" />
                </div>
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Member Since</dt>
                  <dd className="text-gray-900 font-medium text-lg">January 2023</dd>
                </div>
              </div>
              
              <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-xl border border-gray-200/60 hover:border-green-200 transition-colors">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <ClockIcon className="w-7 h-7 text-green-500" />
                </div>
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Last Active</dt>
                  <dd className="text-gray-900 font-medium text-lg">2 hours ago</dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}