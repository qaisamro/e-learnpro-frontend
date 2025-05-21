// AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../../components/ui/card";
import { BarChart, Users, BookOpen, Rocket, Loader } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    enrollments: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch admin stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Platform Overview & Analytics</p>
          </div>
          <Rocket className="text-blue-600 w-12 h-12" />
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="h-32 bg-gray-200 rounded-xl" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Users Card */}
            <Card className="hover:transform hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-semibold">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.users}</p>
                  </div>
                  <div className="p-3 bg-blue-600/10 rounded-xl">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-1 bg-blue-100 rounded-full">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                      style={{ width: `${(stats.users / 1000) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Courses Card */}
            <Card className="hover:transform hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-semibold">Total Courses</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.courses}</p>
                  </div>
                  <div className="p-3 bg-green-600/10 rounded-xl">
                    <BookOpen className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-1 bg-green-100 rounded-full">
                    <div 
                      className="h-full bg-green-600 rounded-full transition-all duration-500" 
                      style={{ width: `${(stats.courses / 100) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enrollments Card */}
            <Card className="hover:transform hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-semibold">Enrollments</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.enrollments}</p>
                  </div>
                  <div className="p-3 bg-purple-600/10 rounded-xl">
                    <BarChart className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-1 bg-purple-100 rounded-full">
                    <div 
                      className="h-full bg-purple-600 rounded-full transition-all duration-500" 
                      style={{ width: `${(stats.enrollments / 5000) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}