import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { 
  ChartPieIcon,
  AcademicCapIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  BellIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || userData.role !== "admin") {
      navigate("/login");
    }
    setUser(userData);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Glass Sidebar */}
      <aside className="w-72 bg-white/5 backdrop-blur-xl border-r border-gray-100/20 shadow-2xl p-6 flex flex-col fixed h-full z-50">
        {/* Logo Section */}
        <div className="mb-10 px-4 py-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
            E-LearnPro
          </h2>
          <p className="text-xs text-gray-500 mt-1">Education Management Suite</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5 flex-1">
          <NavLink 
            to="/admin" 
            end
            className={({isActive}) => `
              flex items-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-300 group
              ${isActive ? 
                'bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 text-emerald-600 shadow-sm' : 
                'hover:bg-gray-100/50 text-gray-500 hover:text-gray-700'}
            `}
          >
            <ChartPieIcon className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <NavLink 
            to="/admin/courses" 
            className={({isActive}) => `
              flex items-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-300 group
              ${isActive ? 
                'bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 text-emerald-600 shadow-sm' : 
                'hover:bg-gray-100/50 text-gray-500 hover:text-gray-700'}
            `}
          >
            <AcademicCapIcon className="w-5 h-5" />
            <span className="font-medium">Courses</span>
          </NavLink>

          <NavLink 
            to="/admin/users" 
            className={({isActive}) => `
              flex items-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-300 group
              ${isActive ? 
                'bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 text-emerald-600 shadow-sm' : 
                'hover:bg-gray-100/50 text-gray-500 hover:text-gray-700'}
            `}
          >
            <UserGroupIcon className="w-5 h-5" />
            <span className="font-medium">Users</span>
          </NavLink>

          <NavLink 
          to="/admin/settings" 
          className={({isActive}) => `
            flex items-center gap-3 px-4 py-3 rounded-xl
            transition-all duration-300 group
            ${isActive ? 
              'bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 text-emerald-600 shadow-sm' : 
              'hover:bg-gray-100/50 text-gray-500 hover:text-gray-700'}
          `}
        >
          <Cog6ToothIcon className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </NavLink>

        </nav>

        <div className="border-t border-gray-200/30 pt-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-72 p-8">
        {/* Sticky Header */}
        {/* <div className={`sticky top-0 mb-8 flex justify-between items-center bg-white/80 backdrop-blur-md py-4 z-40 ${isScrolled ? 'border-b border-gray-200/30' : ''}`}>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user?.name || 'Administrator'}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-xl relative transition-all">
              <BellIcon className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition" />
            </div>
          </div>
        </div> */}

        {/* Content Container */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200/30 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}